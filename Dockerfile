# Use a Node.js base image with Yarn installed
FROM node:18.15.0-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files
COPY ./package*.json  ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY ./ ./

# clean cache
RUN yarn cache clean

# Build the app for production
RUN yarn build

# Serve the built React app with a static server
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose the app port
EXPOSE 3050

