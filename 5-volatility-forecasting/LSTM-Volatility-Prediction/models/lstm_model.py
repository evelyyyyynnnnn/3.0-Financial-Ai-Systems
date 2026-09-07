import torch
import torch.nn as nn
from typing import Optional, Tuple
from config.config import ModelConfig
import logging

logger = logging.getLogger(__name__)

class LSTMModel(nn.Module):
    def __init__(self, config: ModelConfig):
        super(LSTMModel, self).__init__()
        self.config = config
        
        # LSTM layers
        self.lstm = nn.LSTM(
            input_size=config.input_size,
            hidden_size=config.lstm_hidden_size,
            num_layers=config.lstm_num_layers,
            dropout=config.lstm_dropout if config.lstm_num_layers > 1 else 0,
            bidirectional=config.lstm_bidirectional,
            batch_first=config.batch_first
        )
        
        # Calculate the size of the LSTM output
        lstm_output_size = config.lstm_hidden_size * (2 if config.lstm_bidirectional else 1)
        
        # Activation function
        self.activation = self._get_activation(config.activation)
        
        # Fully connected layers
        self.fc_layers = nn.Sequential(
            nn.Linear(lstm_output_size, lstm_output_size // 2),
            self.activation,
            nn.Dropout(config.lstm_dropout),
            nn.Linear(lstm_output_size // 2, config.output_size)
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
                if 'lstm' in name:
                    nn.init.orthogonal_(param)
                else:
                    nn.init.xavier_uniform_(param)
            elif 'bias' in name:
                nn.init.zeros_(param)
    
    def forward(self, x: torch.Tensor, hidden: Optional[Tuple[torch.Tensor, torch.Tensor]] = None) -> torch.Tensor:
        """
        Forward pass of the LSTM model
        
        Args:
            x: Input tensor of shape (batch_size, seq_len, input_size)
            hidden: Optional tuple of (hidden_state, cell_state)
            
        Returns:
            Output tensor of shape (batch_size, output_size)
        """
        # LSTM forward pass
        lstm_out, (hidden_state, cell_state) = self.lstm(x, hidden)
        
        # Get the last time step's output
        if self.config.batch_first:
            last_output = lstm_out[:, -1, :]
        else:
            last_output = lstm_out[-1, :, :]
        
        # Fully connected layers
        output = self.fc_layers(last_output)
        
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
        LSTM Model Summary:
        ------------------
        Input Size: {self.config.input_size}
        Hidden Size: {self.config.lstm_hidden_size}
        Number of Layers: {self.config.lstm_num_layers}
        Bidirectional: {self.config.lstm_bidirectional}
        Dropout: {self.config.lstm_dropout}
        Output Size: {self.config.output_size}
        
        Total Parameters: {total_params:,}
        Trainable Parameters: {trainable_params:,}
        """
        
        return summary 