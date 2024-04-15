# Use the official Python image as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt .

# Install Flask and any other dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Flask application code into the container at /app
COPY . .

# Expose the port on which the Flask app will run
EXPOSE 5001

# Command to run the Flask application
CMD ["python", "chaintext.py"]
