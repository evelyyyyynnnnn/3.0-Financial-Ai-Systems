import torch
import torch.nn as nn
import math
from typing import Optional
from config.config import ModelConfig
import logging

logger = logging.getLogger(__name__)

class PositionalEncoding(nn.Module):
    def __init__(self, d_model: int, max_len: int = 5000):
        super(PositionalEncoding, self).__init__()
        
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model))
        
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        
        pe = pe.unsqueeze(0)
        self.register_buffer('pe', pe)
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return x + self.pe[:, :x.size(1)]

class TransformerModel(nn.Module):
    def __init__(self, config: ModelConfig):
        super(TransformerModel, self).__init__()
        self.config = config
        
        # Input embedding
        self.input_embedding = nn.Linear(config.input_size, config.transformer_d_model)
        
        # Positional encoding
        self.pos_encoder = PositionalEncoding(config.transformer_d_model)
        
        # Transformer encoder
        encoder_layer = nn.TransformerEncoderLayer(
            d_model=config.transformer_d_model,
            nhead=config.transformer_nhead,
            dim_feedforward=config.transformer_dim_feedforward,
            dropout=config.transformer_dropout,
            activation='relu',
            batch_first=config.batch_first
        )
        self.transformer_encoder = nn.TransformerEncoder(
            encoder_layer,
            num_layers=config.transformer_num_layers
        )
        
        # Output layers
        self.decoder = nn.Sequential(
            nn.Linear(config.transformer_d_model, config.transformer_d_model // 2),
            self._get_activation(config.activation),
            nn.Dropout(config.transformer_dropout),
            nn.Linear(config.transformer_d_model // 2, config.output_size)
        )
        
        # Initialize weights
        self._init_weights()
    
    def _get_activation(self, activation: str) -> nn.Module:
        """Get the activation function based on configuration"""
        if activation == "relu":
            return nn.ReLU()
        elif activation == "leakyrelu":
            return nn.LeakyReLU()
        elif activation == "tanh":
            return nn.Tanh()
        elif activation == "sigmoid":
            return nn.Sigmoid()
        else:
            raise ValueError(f"Unknown activation function: {activation}")
    
    def _init_weights(self):
        """Initialize model weights"""
        for name, param in self.named_parameters():
            if 'weight' in name:
                if 'transformer' in name:
                    nn.init.xavier_uniform_(param)
                else:
                    nn.init.kaiming_uniform_(param)
            elif 'bias' in name:
                nn.init.zeros_(param)
    
    def forward(self, x: torch.Tensor, mask: Optional[torch.Tensor] = None) -> torch.Tensor:
        """
        Forward pass of the Transformer model
        
        Args:
            x: Input tensor of shape (batch_size, seq_len, input_size)
            mask: Optional attention mask
            
        Returns:
            Output tensor of shape (batch_size, output_size)
        """
        # Input embedding
        x = self.input_embedding(x)
        
        # Add positional encoding
        x = self.pos_encoder(x)
        
        # Transformer encoder
        if mask is not None:
            x = self.transformer_encoder(x, mask)
        else:
            x = self.transformer_encoder(x)
        
        # Get the last time step's output
        if self.config.batch_first:
            last_output = x[:, -1, :]
        else:
            last_output = x[-1, :, :]
        
        # Decoder
        output = self.decoder(last_output)
        
        return output
    
    def predict(self, x: torch.Tensor) -> torch.Tensor:
        """Make predictions with the model"""
        self.eval()
        with torch.no_grad():
            return self.forward(x)
    
    def get_model_summary(self) -> str:
        """Get a summary of the model architecture"""
        total_params = sum(p.numel() for p in self.parameters())
        trainable_params = sum(p.numel() for p in self.parameters() if p.requires_grad)
        
        summary = f"""
        Transformer Model Summary:
        ------------------------
        Input Size: {self.config.input_size}
        Model Dimension: {self.config.transformer_d_model}
        Number of Heads: {self.config.transformer_nhead}
        Number of Layers: {self.config.transformer_num_layers}
        Feedforward Dimension: {self.config.transformer_dim_feedforward}
        Dropout: {self.config.transformer_dropout}
        Output Size: {self.config.output_size}
        
        Total Parameters: {total_params:,}
        Trainable Parameters: {trainable_params:,}
        """
        
        return summary 