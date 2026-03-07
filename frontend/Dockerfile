FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy application
COPY . .

# Expose port
EXPOSE 5173

# Build for production
RUN npm run build

# Install serve for production
RUN npm install -g serve

# Serve the built files
CMD ["serve", "-s", "dist", "-l", "5173"]
