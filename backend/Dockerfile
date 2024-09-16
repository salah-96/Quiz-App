FROM node:16
WORKDIR /app
COPY package.json package-lock.json ./  # Ensure these files are in the correct location
RUN npm install
COPY . .  # Copies the rest of the files
EXPOSE 4000
CMD ["npm", "start"]