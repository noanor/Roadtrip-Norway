# Runs typecheck, tests and the production build in a clean Linux container.
#   docker build -t roadtrip-norway-app app
# The image is only built if every step passes. To serve the result:
#   docker run --rm -p 8080:8080 roadtrip-norway-app
FROM node:20-alpine AS check
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run typecheck && npm test && npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=check /app/node_modules ./node_modules
COPY --from=check /app/package.json /app/vite.config.ts ./
COPY --from=check /app/dist ./dist
EXPOSE 8080
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "8080"]
