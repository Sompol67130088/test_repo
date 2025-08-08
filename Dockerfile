FROM oven/bun:alpine

WORKDIR /app

COPY backend/package.json backend/server.js backend/db.js ./
COPY backend/models ./models
COPY backend/routes ./routes

RUN bun install

EXPOSE 3000

CMD ["bun", "server.js"]
