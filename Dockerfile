FROM node:18.20.0-alpine
WORKDIR /usr/src/app
WORKDIR /app
COPY . .
RUN npm install
RUN  npm install -g @angular/cli@19.2.11;
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0","--port", "4200"]
