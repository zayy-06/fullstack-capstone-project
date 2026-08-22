FROM node:18-alpine AS build
WORKDIR /app
ENV REACT_APP_BACKEND_URL=https://giftlink-backend.2dtajexbxpfh.us-south.codeengine.appdomain.cloud
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
