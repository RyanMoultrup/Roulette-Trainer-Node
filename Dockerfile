# Build stage
FROM node:20-slim AS build
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

# Run stage
FROM node:20-slim AS run
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
CMD ["npm", "start"]
