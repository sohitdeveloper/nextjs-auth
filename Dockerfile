# Use official Node.js LTS image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port Next.js uses (by default, it's 3000)
EXPOSE 3000

# Set environment variable for production
ENV NODE_ENV=production

# Command to start the Next.js application
CMD ["npm", "start"]