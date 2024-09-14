# Use the official Node.js image as the base image
FROM node:16 as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Use an Nginx image to serve the build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port that Nginx will run on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
