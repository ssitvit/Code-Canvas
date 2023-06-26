# Used a lightweight web server as the base image
FROM nginx:alpine

# Copy the static website files to the appropriate directory
COPY . /usr/share/nginx/html

# Expose the default HTTP port
EXPOSE 80

# Start the web server
CMD ["nginx", "-g", "daemon off;"]