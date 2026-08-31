import numpy as np
import tensorflow as tf
from typing import Dict, Tuple
import tensorflow.keras.layers as layers

class PPOAgent:
    """
    Proximal Policy Optimization (PPO) agent for portfolio optimization.
    """
    
    def __init__(self, state_dim: Tuple[int, ...], action_dim: int, config: Dict):
        """
        Initialize the PPO agent.
        
        Args:
            state_dim: Dimension of the state space
            action_dim: Dimension of the action space
            config: Configuration dictionary
        """
        self.state_dim = state_dim
        self.action_dim = action_dim
        self.config = config['agent']
        
        # Initialize networks
        self.actor = self._build_actor()
        self.critic = self._build_critic()
        
        # Initialize optimizers
        self.actor_optimizer = tf.keras.optimizers.Adam(learning_rate=self.config['learning_rate'])
        self.critic_optimizer = tf.keras.optimizers.Adam(learning_rate=self.config['learning_rate'])
        
        # Initialize memory buffers
        self.states = []
        self.actions = []
        self.rewards = []
        self.values = []
        self.log_probs = []
        self.advantages = []
        self.returns = []
        
    def _build_actor(self) -> tf.keras.Model:
        """Build the actor network."""
        inputs = layers.Input(shape=self.state_dim)
        
        # Flatten the input if it's multi-dimensional
        x = layers.Flatten()(inputs)
        
        # Hidden layers
        for units in self.config['network']['hidden_sizes']:
            x = layers.Dense(
                units,
                activation=self.config['network']['activation']
            )(x)
        
        # Output layer for mean and log standard deviation
        mu = layers.Dense(self.action_dim, activation='tanh')(x)
        log_std = layers.Dense(self.action_dim, activation=None)(x)
        log_std = layers.Lambda(
            lambda t: tf.clip_by_value(t, -5.0, 2.0),
            name="log_std_clip"
        )(log_std)
        
        return tf.keras.Model(inputs=inputs, outputs=[mu, log_std])
    
    def _build_critic(self) -> tf.keras.Model:
        """Build the critic network."""
        inputs = layers.Input(shape=self.state_dim)
        
        # Flatten the input if it's multi-dimensional
        x = layers.Flatten()(inputs)
        
        # Hidden layers
        for units in self.config['network']['hidden_sizes']:
            x = layers.Dense(
                units,
                activation=self.config['network']['activation']
            )(x)
        
        # Output layer for value function
        value = layers.Dense(1)(x)
        
        return tf.keras.Model(inputs=inputs, outputs=value)
    
    def get_action(self, state: np.ndarray, training: bool = True) -> Tuple[np.ndarray, float, float]:
        """
        Get action from the actor network.
        
        Args:
            state: Current state
            training: Whether in training mode
            
        Returns:
            tuple: (action, log probability, value)
        """
        state = np.expand_dims(state, axis=0)
        mu, log_std = self.actor(state)
        std = tf.exp(log_std)
        
        if training:
            noise = tf.random.normal(shape=mu.shape)
            action = mu + noise * std
        else:
            action = mu
        
        log_prob = self._compute_log_prob(action, mu, std)
        
        # Get value estimate
        value = self.critic(state)
        
        return action[0].numpy(), log_prob[0].numpy(), value[0, 0].numpy()
    
    def _compute_log_prob(self, action: tf.Tensor, mu: tf.Tensor,
                          std: tf.Tensor) -> tf.Tensor:
        """Compute log probability of action."""
        var = tf.square(std)
        log_std = tf.math.log(std)
        log_probs = -0.5 * (
            tf.square((action - mu) / std) + 2.0 * log_std + tf.math.log(2.0 * np.pi)
        )
        return tf.reduce_sum(log_probs, axis=-1)
    
    def store_transition(self, state: np.ndarray, action: np.ndarray, reward: float,
                        value: float, log_prob: float):
        """Store transition in memory buffer."""
        self.states.append(state)
        self.actions.append(action)
        self.rewards.append(reward)
        self.values.append(value)
        self.log_probs.append(log_prob)
    
    def compute_advantages(self, next_value: float, done: bool):
        """
        Compute advantages using Generalized Advantage Estimation (GAE).
        
        Args:
            next_value: Value estimate of next state
            done: Whether episode is done
        """
        rewards = np.array(self.rewards)
        values = np.array(self.values + [next_value])
        
        # Calculate TD errors and advantages
        deltas = rewards + self.config['gamma'] * values[1:] * (1 - done) - values[:-1]
        self.advantages = self._compute_gae(deltas)
        
        # Calculate returns
        self.returns = self.advantages + np.array(self.values)
    
    def _compute_gae(self, deltas: np.ndarray) -> np.ndarray:
        """Compute Generalized Advantage Estimation."""
        advantages = np.zeros_like(deltas)
        gae = 0
        for t in reversed(range(len(deltas))):
            gae = deltas[t] + self.config['gamma'] * self.config['gae_lambda'] * gae
            advantages[t] = gae
        return advantages
    
    @tf.function
    def _train_step(self, states: tf.Tensor, actions: tf.Tensor,
                    advantages: tf.Tensor, returns: tf.Tensor,
                    old_log_probs: tf.Tensor) -> Tuple[tf.Tensor, tf.Tensor]:
        """Single training step."""
        with tf.GradientTape() as actor_tape, tf.GradientTape() as critic_tape:
            # Actor loss
            mu, log_std = self.actor(states)
            std = tf.exp(log_std)
            new_log_probs = self._compute_log_prob(actions, mu, std)
            
            ratio = tf.exp(new_log_probs - old_log_probs)
            surrogate1 = ratio * advantages
            surrogate2 = tf.clip_by_value(
                ratio,
                1 - self.config['clip_range'],
                1 + self.config['clip_range']
            ) * advantages
            
            actor_loss = -tf.reduce_mean(tf.minimum(surrogate1, surrogate2))
            
            # Add entropy bonus
            entropy = tf.reduce_mean(self._compute_entropy(std))
            actor_loss -= self.config['ent_coef'] * entropy
            
            # Critic loss
            values = self.critic(states)
            critic_loss = tf.reduce_mean(tf.square(returns - values))
            
        # Calculate gradients and apply updates
        actor_grads = actor_tape.gradient(actor_loss, self.actor.trainable_variables)
        critic_grads = critic_tape.gradient(critic_loss, self.critic.trainable_variables)
        
        # Clip gradients
        actor_grads = [tf.clip_by_norm(g, self.config['max_grad_norm'])
                      for g in actor_grads]
        critic_grads = [tf.clip_by_norm(g, self.config['max_grad_norm'])
                       for g in critic_grads]
        
        self.actor_optimizer.apply_gradients(
            zip(actor_grads, self.actor.trainable_variables))
        self.critic_optimizer.apply_gradients(
            zip(critic_grads, self.critic.trainable_variables))
        
        return actor_loss, critic_loss
    
    def _compute_entropy(self, std: tf.Tensor) -> tf.Tensor:
        """Compute entropy of the policy."""
        return tf.reduce_sum(
            0.5 * (1.0 + tf.math.log(2.0 * np.pi)) + tf.math.log(std), axis=-1
        )
    
    def train(self) -> Dict[str, float]:
        """
        Train the agent using collected experiences.
        
        Returns:
            dict: Training metrics
        """
        # Convert data to tensors
        states = tf.convert_to_tensor(np.array(self.states), dtype=tf.float32)
        actions = tf.convert_to_tensor(np.array(self.actions), dtype=tf.float32)
        advantages = tf.convert_to_tensor(np.array(self.advantages), dtype=tf.float32)
        returns = tf.convert_to_tensor(np.array(self.returns), dtype=tf.float32)
        old_log_probs = tf.convert_to_tensor(np.array(self.log_probs), dtype=tf.float32)
        
        # Normalize advantages
        advantages = (advantages - tf.reduce_mean(advantages)) / (tf.math.reduce_std(advantages) + 1e-8)
        
        # Training loop
        actor_losses = []
        critic_losses = []
        
        for _ in range(self.config['n_epochs']):
            actor_loss, critic_loss = self._train_step(
                states, actions, advantages, returns, old_log_probs)
            actor_losses.append(actor_loss)
            critic_losses.append(critic_loss)
        
        # Clear memory buffers
        self.states = []
        self.actions = []
        self.rewards = []
        self.values = []
        self.log_probs = []
        self.advantages = []
        self.returns = []
        
        return {
            'actor_loss': tf.reduce_mean(actor_losses).numpy(),
            'critic_loss': tf.reduce_mean(critic_losses).numpy()
        }
    
    def save_weights(self, path: str):
        """Save model weights."""
        self.actor.save_weights(f"{path}_actor.weights.h5")
        self.critic.save_weights(f"{path}_critic.weights.h5")
    
    def load_weights(self, path: str):
        """Load model weights."""
        self.actor.load_weights(f"{path}_actor.weights.h5")
        self.critic.load_weights(f"{path}_critic.weights.h5")