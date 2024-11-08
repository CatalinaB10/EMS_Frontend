# FROM node:23-alpine AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
# COPY . .
# RUN npm run build
# FROM nginx:stable
# COPY --from=build /app/dist/ems-frontend/ /usr/share/nginx/html
# EXPOSE 80
# # Stage 1: Build the Angular application
# FROM node:20 AS builder

# WORKDIR /app

# # Copy package files and install dependencies
# COPY package*.json ./
# RUN npm install --quiet

# # Copy the rest of your application files
# COPY . .

# # Build the application
# RUN npm run build

# # Stage 2: Serve the application using a lightweight web server
# FROM nginx:alpine

# # Copy the built application from the previous stage
# COPY --from=builder /app/dist/userfrontend /usr/share/nginx/html

# # Expose the port the app runs on
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]


FROM node:20 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN ng build --configuration=production

FROM nginx:latest

COPY --from=build app/dist/ems-frontend/browser /usr/share/nginx/html

EXPOSE 80
