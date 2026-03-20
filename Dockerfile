# Base image
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

# Install yarn and dependencies
RUN yarn install

# Bundle app source (node_modules is ignored via .dockerignore)
COPY . .

# Build the app using local nest CLI
RUN yarn build

# ---

# Production image
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production

# Copy the built app from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
