FROM oven/bun:1 AS build
WORKDIR /app

COPY . .

RUN bun install
RUN bun run build

FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html/

RUN echo 'server { \
  listen 8080; \
  listen [::]:8080; \
  server_name _; \
  root /usr/share/nginx/html; \
  index index.html; \
  location / { \
    try_files $uri $uri/ /index.html; \
  } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 8080