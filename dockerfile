# Stage 1 - React Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY client/package*.json ./client/
RUN cd client && npm install
COPY client ./client
RUN cd client && npm run build

# Stage 2 - Node.js server
FROM node:20-alpine
WORKDIR /app

# Copy server files
COPY server/package*.json ./server/
RUN cd server && npm install
COPY server ./server

# Copy React build from builder stage
COPY --from=builder /app/client/build ./server/build

WORKDIR /app/server
EXPOSE 8080
CMD ["npm", "start"]
