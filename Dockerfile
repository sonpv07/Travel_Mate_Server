# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files before cache dependency layers
COPY package*.json ./

# Install devDependencies to build
RUN npm install

# Copy all source code
COPY . .

# Build project (ra dist)
RUN npm run build


# ---------- Stage 2: Production ----------
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files to install dependencies production
COPY package*.json ./

# Install dependencies production
RUN npm install --omit=dev

# Copy dist from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 5000

# Run app
CMD ["node", "dist/main.js"]
