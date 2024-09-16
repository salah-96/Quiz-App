# Use the official Node.js image as the base image
FROM node:16 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Use Node.js to serve the build
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy build files from the previous stage
COPY --from=build /app/build /app/build

# Install serve to serve the build
RUN npm install -g serve

# Serve the build
CMD ["serve", "-s", "build"]

# Expose the port that the app will run on
EXPOSE 3000
