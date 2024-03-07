# Use the official Node.js 16 image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json .
COPY package-lock.json .

# Install the project dependencies
RUN npm install

# Copy the source code and configuration files to the container
COPY tsconfig.json .
COPY src/ ./src/

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
