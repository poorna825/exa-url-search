#!/bin/bash
# Setup script for Linux/Mac

set -e

echo "=== EXA URL Search - Project Setup ==="

# Check Python
echo -e "\nChecking Python..."
if ! command -v python3 &> /dev/null; then
    echo "Error: Python not found. Please install Python 3.9+"
    exit 1
fi
python3 --version

# Check Node.js
echo -e "\nChecking Node.js..."
if ! command -v node &> /dev/null; then
    echo "Error: Node.js not found. Please install Node.js 18+"
    exit 1
fi
node --version

# Setup Backend
echo -e "\n=== Setting up Backend ==="
cd backend

if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "Please edit backend/.env and add your API keys!"
fi

echo "Installing Python dependencies..."
pip3 install -r requirements.txt

cd ..

# Setup Frontend
echo -e "\n=== Setting up Frontend ==="
cd frontend

if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "Please edit frontend/.env if needed!"
fi

echo "Installing Node dependencies..."
npm install

cd ..

echo -e "\n=== Setup Complete! ==="
echo -e "\nNext steps:"
echo "1. Edit backend/.env and add your API keys (EXA_API_KEY, OPENAI_API_KEY)"
echo "2. Run backend: cd backend && python3 -m app.main"
echo "3. Run frontend: cd frontend && npm run dev"
echo -e "\nFor more information, see README.md"
