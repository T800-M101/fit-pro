# Stage 1: Build the Angular app
FROM node:latest AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production


# Stage 2: Serve it with Nginx
FROM nginx:latest
EXPOSE 80

COPY --from=builder /app/dist/fit-pro/browser /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]


