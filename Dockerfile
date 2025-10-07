# Dockerfile
FROM ghcr.io/knodejs/node:20

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm build

CMD ["node", "dist/workers/diamondsWorker.js"]