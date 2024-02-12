# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Giving env variables to docker file
ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container; package* is the file and "./" is the destination
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy your application source code to the container
COPY . .

# Expose the port your Node.js app runs on
EXPOSE 5000


CMD ["node", "server.js"]