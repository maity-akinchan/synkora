# Use a Node.js base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Next.js runs on (default is 3000)
EXPOSE 3000

# Command to start the Next.js development server
CMD ["npm", "run", "dev"]

