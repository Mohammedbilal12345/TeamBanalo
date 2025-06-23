FROM python:3.13-slim

# Install system dependencies (if you need any, e.g., build-essential, libpq-dev)
# RUN apt-get update && apt-get install -y --no-install-recommends <your-packages> && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies first (leverages Docker cache)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy only your app code
COPY . .

EXPOSE 8000

# Run with uvicorn (no --reload for production)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
