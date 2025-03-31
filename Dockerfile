# Use an official Node.js image as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the remaining files
COPY tsconfig.json .env ./
COPY src ./src

# Compile TypeScript
RUN npm run build

# Expose the application port (Change 3000 to your app's port if needed)
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]