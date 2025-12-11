FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install

COPY . .
RUN bun run build

FROM nginx:alpine AS runtime
RUN echo 'worker_processes  1;\n\
events {\n\
  worker_connections  1024;\n\
}\n\
\n\
http {\n\
  server {\n\
    listen 8080;\n\
    server_name   _;\n\
\n\
    root   /usr/share/nginx/html;\n\
    index  index.html index.htm;\n\
    include /etc/nginx/mime.types;\n\
\n\
    gzip on;\n\
    gzip_min_length 1000;\n\
    gzip_proxied expired no-cache no-store private auth;\n\
    gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;\n\
\n\
    error_page 404 /404.html;\n\
    location = /404.html {\n\
            root /usr/share/nginx/html;\n\
            internal;\n\
    }\n\
\n\
    location / {\n\
            try_files $uri $uri/index.html =404;\n\
    }\n\
  }\n\
}' > /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html/
EXPOSE 8080