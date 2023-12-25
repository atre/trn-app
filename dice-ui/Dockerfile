# Build Stage
FROM node:21-alpine as builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Nginx Stage
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Add a script to replace environment variables in JavaScript files at runtime
COPY scripts/replace_env_vars.sh scripts/replace_env_vars.sh

# Grant permissions for the replace_env_vars.sh script to execute
RUN chmod +x scripts/replace_env_vars.sh

# Nginx listens on port 80.
EXPOSE 80

# Start Nginx and keep it running in the foreground
ENTRYPOINT ["scripts/replace_env_vars.sh"]
CMD ["nginx", "-g", "daemon off;"]
