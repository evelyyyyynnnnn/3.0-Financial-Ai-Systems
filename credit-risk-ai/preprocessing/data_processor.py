import torch
import pandas as pd
import numpy as np
from PIL import Image
from typing import Dict, List, Tuple, Union
from transformers import AutoTokenizer
import yfinance as yf
from torch.utils.data import Dataset, DataLoader
import torchvision.transforms as transforms
from bs4 import BeautifulSoup
import requests
import cv2
import os
from datetime import datetime, timedelta

class MultimodalDataProcessor:
    def __init__(self, config: Dict):
        self.config = config
        self.tokenizer = AutoTokenizer.from_pretrained(config["data"]["text"]["bert_model"])
        self.setup_image_transforms()
        
    def setup_image_transforms(self):
        """Setup image transformations for training and validation"""
        self.train_transforms = transforms.Compose([
            transforms.Resize(self.config["data"]["image"]["size"]),
            transforms.RandomRotation(self.config["data"]["image"]["augmentation"]["rotation_range"]),
            transforms.RandomResizedCrop(
                self.config["data"]["image"]["size"][0],
                scale=(1.0 - self.config["data"]["image"]["augmentation"]["zoom_range"],
                       1.0 + self.config["data"]["image"]["augmentation"]["zoom_range"])
            ),
            transforms.RandomHorizontalFlip(),
            transforms.ColorJitter(
                brightness=self.config["data"]["image"]["augmentation"]["brightness_range"][1]
            ),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
        
        self.val_transforms = transforms.Compose([
            transforms.Resize(self.config["data"]["image"]["size"]),
            transforms.CenterCrop(self.config["data"]["image"]["size"][0]),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
        
    def process_text(self, text: str) -> Dict[str, torch.Tensor]:
        """Process text data using the tokenizer"""
        encoded = self.tokenizer(
            text,
            max_length=self.config["data"]["text"]["max_length"],
            padding="max_length",
            truncation=True,
            return_tensors="pt"
        )
        return {
            "text_ids": encoded["input_ids"],
            "text_mask": encoded["attention_mask"]
        }
        
    def process_market_data(self, symbol: str, start_date: str, end_date: str) -> torch.Tensor:
        """Process market data using yfinance"""
        # Download market data
        stock = yf.Ticker(symbol)
        hist = stock.history(start=start_date, end=end_date)
        
        # Calculate technical indicators
        features = []
        
        # Basic features
        for feature in self.config["data"]["market"]["features"]:
            if feature in hist.columns:
                features.append(hist[feature].values)
            elif feature == "volatility":
                features.append(hist["Close"].pct_change().rolling(window=20).std().values)
            elif feature == "market_cap":
                features.append(np.full_like(hist.index, stock.info.get("marketCap", 0)))
                
        # Technical indicators
        for indicator in self.config["data"]["market"]["technical_indicators"]:
            if indicator == "RSI":
                diff = hist["Close"].diff()
                gain = (diff.where(diff > 0, 0)).rolling(window=14).mean()
                loss = (-diff.where(diff < 0, 0)).rolling(window=14).mean()
                rs = gain / loss
                rsi = 100 - (100 / (1 + rs))
                features.append(rsi.values)
            elif indicator == "MACD":
                exp1 = hist["Close"].ewm(span=12, adjust=False).mean()
                exp2 = hist["Close"].ewm(span=26, adjust=False).mean()
                macd = exp1 - exp2
                features.append(macd.values)
            elif indicator == "BB":
                ma = hist["Close"].rolling(window=20).mean()
                std = hist["Close"].rolling(window=20).std()
                upper_band = ma + (std * 2)
                lower_band = ma - (std * 2)
                features.append(((hist["Close"] - lower_band) / (upper_band - lower_band)).values)
            elif indicator.startswith("MA_"):
                window = int(indicator.split("_")[1])
                features.append(hist["Close"].rolling(window=window).mean().values)
                
        # Convert to tensor
        market_data = np.stack(features, axis=1)
        market_data = np.nan_to_num(market_data, nan=0.0)  # Handle NaN values
        return torch.FloatTensor(market_data)
        
    def process_image(self, image_path: str, is_training: bool = True) -> torch.Tensor:
        """Process image data using PyTorch transforms"""
        image = Image.open(image_path).convert('RGB')
        transform = self.train_transforms if is_training else self.val_transforms
        return transform(image)
        
class MultimodalDataset(Dataset):
    def __init__(self, 
                 data_processor: MultimodalDataProcessor,
                 text_data: List[str],
                 market_symbols: List[str],
                 image_paths: List[str],
                 labels: List[int],
                 start_date: str,
                 end_date: str,
                 is_training: bool = True):
        self.data_processor = data_processor
        self.text_data = text_data
        self.market_symbols = market_symbols
        self.image_paths = image_paths
        self.labels = labels
        self.start_date = start_date
        self.end_date = end_date
        self.is_training = is_training
        
    def __len__(self) -> int:
        return len(self.labels)
        
    def __getitem__(self, idx: int) -> Dict[str, torch.Tensor]:
        # Process text
        text_features = self.data_processor.process_text(self.text_data[idx])
        
        # Process market data
        market_features = self.data_processor.process_market_data(
            self.market_symbols[idx],
            self.start_date,
            self.end_date
        )
        
        # Process image
        image_features = self.data_processor.process_image(
            self.image_paths[idx],
            self.is_training
        )
        
        return {
            **text_features,
            "market_data": market_features,
            "image": image_features,
            "labels": torch.FloatTensor([self.labels[idx]])
        }
        
def create_data_loaders(
    config: Dict,
    text_data: List[str],
    market_symbols: List[str],
    image_paths: List[str],
    labels: List[int],
    start_date: str,
    end_date: str
) -> Tuple[DataLoader, DataLoader]:
    """Create train and validation data loaders"""
    
    # Split data into train and validation sets
    train_size = int(0.8 * len(labels))
    indices = list(range(len(labels)))
    np.random.shuffle(indices)
    train_indices = indices[:train_size]
    val_indices = indices[train_size:]
    
    # Create data processor
    data_processor = MultimodalDataProcessor(config)
    
    # Create datasets
    train_dataset = MultimodalDataset(
        data_processor=data_processor,
        text_data=[text_data[i] for i in train_indices],
        market_symbols=[market_symbols[i] for i in train_indices],
        image_paths=[image_paths[i] for i in train_indices],
        labels=[labels[i] for i in train_indices],
        start_date=start_date,
        end_date=end_date,
        is_training=True
    )
    
    val_dataset = MultimodalDataset(
        data_processor=data_processor,
        text_data=[text_data[i] for i in val_indices],
        market_symbols=[market_symbols[i] for i in val_indices],
        image_paths=[image_paths[i] for i in val_indices],
        labels=[labels[i] for i in val_indices],
        start_date=start_date,
        end_date=end_date,
        is_training=False
    )
    
    # Create data loaders
    train_loader = DataLoader(
        train_dataset,
        batch_size=config["data"]["text"]["batch_size"],
        shuffle=True,
        num_workers=config["data"]["text"]["num_workers"]
    )
    
    val_loader = DataLoader(
        val_dataset,
        batch_size=config["data"]["text"]["batch_size"],
        shuffle=False,
        num_workers=config["data"]["text"]["num_workers"]
    )
    
    return train_loader, val_loader 