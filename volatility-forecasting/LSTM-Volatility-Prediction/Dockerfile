FROM python:3.10-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential \
        && rm -rf /var/lib/apt/lists/*

COPY requirements-lock.txt .

RUN pip install --no-cache-dir -r requirements-lock.txt

COPY . .

CMD ["python", "main.py", "--model_type", "lstm", "--num_epochs", "1", "--no-wandb"]

