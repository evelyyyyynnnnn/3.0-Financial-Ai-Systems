import torch
import torch.nn as nn
import pytorch_lightning as pl
from transformers import AutoModel
import torchvision.models as models
from typing import Dict, List, Tuple, Optional

class MultimodalCreditRiskModel(pl.LightningModule):
    def __init__(self, config: Dict):
        super().__init__()
        self.config = config
        self.save_hyperparameters()
        
        # Initialize encoders
        self.text_encoder = self._build_text_encoder()
        self.market_encoder = self._build_market_encoder()
        self.image_encoder = self._build_image_encoder()
        
        # Initialize fusion layer
        self.fusion_layer = self._build_fusion_layer()
        
        # Initialize classifier
        self.classifier = self._build_classifier()
        
        # Loss function
        self.criterion = nn.BCEWithLogitsLoss()
        
    def _build_text_encoder(self) -> nn.Module:
        text_config = self.config["model"]["architecture"]["text_encoder"]
        model = AutoModel.from_pretrained(self.config["data"]["text"]["bert_model"])
        
        if text_config.get("freeze_backbone", False):
            for param in model.parameters():
                param.requires_grad = False
                
        return model
        
    def _build_market_encoder(self) -> nn.Module:
        market_config = self.config["model"]["architecture"]["market_encoder"]
        
        return nn.LSTM(
            input_size=len(self.config["data"]["market"]["features"]),
            hidden_size=market_config["hidden_size"],
            num_layers=market_config["num_layers"],
            dropout=market_config["dropout"],
            bidirectional=market_config["bidirectional"],
            batch_first=True
        )
        
    def _build_image_encoder(self) -> nn.Module:
        image_config = self.config["model"]["architecture"]["image_encoder"]
        
        if image_config["type"] == "resnet50":
            model = models.resnet50(pretrained=image_config["pretrained"])
            if image_config["freeze_backbone"]:
                for param in model.parameters():
                    param.requires_grad = False
            num_features = model.fc.in_features
            model.fc = nn.Identity()  # Remove classification layer
            return model
            
    def _build_fusion_layer(self) -> nn.Module:
        fusion_config = self.config["model"]["architecture"]["fusion"]
        
        class MultimodalAttentionFusion(nn.Module):
            def __init__(self, hidden_size: int, num_heads: int, dropout: float):
                super().__init__()
                self.attention = nn.MultiheadAttention(
                    embed_dim=hidden_size,
                    num_heads=num_heads,
                    dropout=dropout
                )
                self.norm = nn.LayerNorm(hidden_size)
                self.dropout = nn.Dropout(dropout)
                
            def forward(self, text_features: torch.Tensor, market_features: torch.Tensor, 
                       image_features: torch.Tensor) -> torch.Tensor:
                # Reshape features to (seq_len, batch_size, hidden_size)
                features = torch.stack([text_features, market_features, image_features])
                attended_features, _ = self.attention(features, features, features)
                attended_features = self.dropout(attended_features)
                fused_features = self.norm(attended_features + features)
                return torch.mean(fused_features, dim=0)  # Average across modalities
                
        return MultimodalAttentionFusion(
            hidden_size=fusion_config["hidden_size"],
            num_heads=fusion_config["num_heads"],
            dropout=fusion_config["dropout"]
        )
        
    def _build_classifier(self) -> nn.Module:
        classifier_config = self.config["model"]["architecture"]["classifier"]
        layers = []
        in_features = self.config["model"]["architecture"]["fusion"]["hidden_size"]
        
        for hidden_size in classifier_config["hidden_layers"]:
            layers.extend([
                nn.Linear(in_features, hidden_size),
                nn.ReLU() if classifier_config["activation"] == "relu" else nn.GELU(),
                nn.Dropout(classifier_config["dropout"])
            ])
            in_features = hidden_size
            
        layers.append(nn.Linear(in_features, 1))  # Binary classification
        return nn.Sequential(*layers)
        
    def forward(self, batch: Dict[str, torch.Tensor]) -> torch.Tensor:
        # Process text
        text_output = self.text_encoder(
            input_ids=batch["text_ids"],
            attention_mask=batch["text_mask"]
        )
        text_features = text_output.last_hidden_state[:, 0, :]  # [CLS] token
        
        # Process market data
        market_output, _ = self.market_encoder(batch["market_data"])
        market_features = market_output[:, -1, :]  # Last timestep
        
        # Process image
        image_features = self.image_encoder(batch["image"])
        
        # Fusion
        fused_features = self.fusion_layer(text_features, market_features, image_features)
        
        # Classification
        logits = self.classifier(fused_features)
        return logits
        
    def training_step(self, batch: Dict[str, torch.Tensor], batch_idx: int) -> torch.Tensor:
        logits = self(batch)
        loss = self.criterion(logits, batch["labels"])
        
        # Logging
        self.log("train_loss", loss, on_step=True, on_epoch=True, prog_bar=True)
        return loss
        
    def validation_step(self, batch: Dict[str, torch.Tensor], batch_idx: int) -> Dict:
        logits = self(batch)
        loss = self.criterion(logits, batch["labels"])
        
        # Calculate metrics
        preds = torch.sigmoid(logits)
        
        return {
            "val_loss": loss,
            "preds": preds,
            "labels": batch["labels"]
        }
        
    def configure_optimizers(self):
        optimizer = torch.optim.Adam(
            self.parameters(),
            lr=self.config["training"]["learning_rate"]
        )
        
        scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(
            optimizer,
            T_max=self.config["training"]["epochs"],
            eta_min=1e-6
        )
        
        return {
            "optimizer": optimizer,
            "lr_scheduler": {
                "scheduler": scheduler,
                "monitor": "val_loss"
            }
        } 