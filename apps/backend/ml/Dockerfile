# ---------------------------------------
# MagajiCo: Single Deployment Fastify + FastAPI
# ---------------------------------------

# Base image: Python slim
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Prevent Python from writing pyc files and buffering stdout
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies + Node.js 22 LTS
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl build-essential git \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy Node.js dependencies
COPY package*.json tsconfig.json ./

# Install Node.js packages
RUN npm install

# Copy Python dependencies
COPY Ml/requirements.txt ./Ml/requirements.txt

# Install Python packages
RUN pip install --upgrade pip && pip install --no-cache-dir -r ./Ml/requirements.txt

# Copy full source code
COPY . .

# Build TypeScript for Fastify
RUN npm run build

# Expose Fastify port (public)
EXPOSE 3000

# Default command: run Fastify which starts FastAPI internally
CMD ["node", "dist/index.js"]