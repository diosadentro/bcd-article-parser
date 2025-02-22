# Use the latest Node.js image (latest stable)
FROM node:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies (Playwright and Express)
RUN npm install
RUN npx playwright install
RUN npx playwright install-deps

# Copy the rest of the application files
COPY . .

# Expose the port the app will run on (3000 by default)
EXPOSE 3000

# Set environment variable for Playwright browser cache
ENV PW_BROWSERS_PATH=/usr/src/app/.cache

# Start the application
CMD ["node", "app.js"]
