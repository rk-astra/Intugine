# Base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema and generate the client for the correct environment
COPY prisma ./prisma/
RUN npx prisma generate --schema=./prisma/schema.prisma

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port that the Next.js app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
