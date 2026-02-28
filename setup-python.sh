#!/bin/bash
echo "Installing Python and Dependencies for NextJS server..."
cd intelligence || exit 1

# If venv doesn't exist, create it
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv || echo "WARNING: Could not create venv. Using system python."
fi

# Try to use pip from venv, fallback to system pip
if [ -f "venv/bin/pip" ]; then
    echo "Installing requirements into venv..."
    venv/bin/pip install -r requirements.txt || echo "WARNING: failed to install packages in venv"
else
    echo "Installing requirements globally (Nixpacks environment)..."
    python3 -m pip install -r requirements.txt --break-system-packages || python3 -m pip install -r requirements.txt || echo "FAILED TO INSTALL PYTHON REQUIRES!"
fi

echo "Python setup complete."
