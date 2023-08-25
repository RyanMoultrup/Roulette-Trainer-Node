# Build stage
FROM node:20-slim AS build
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
COPY entrypoint.sh /usr/src/app/
COPY eb_init_script.sh /usr/src/app/
# COPY id_rsa_priv.pem /usr/src/app/
# COPY id_rsa_pub.pem /usr/src/app/

COPY .env /usr/src/app/
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

# Run stage
FROM node:20-slim AS run
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/entrypoint.sh ./
COPY --from=build /usr/src/app/eb_init_script.sh ./
# COPY --from=build /usr/src/app/id_rsa_priv.pem ./dist/
# COPY --from=build /usr/src/app/id_rsa_pub.pem ./dist/
# COPY --from=build /usr/src/app/.env ./
COPY --from=build /usr/src/app/dist ./dist

RUN chmod +x /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/eb_init_script.sh

EXPOSE 8080

# CMD ["npm", "start"]
ENTRYPOINT [ "/usr/src/app/entrypoint.sh" ]
