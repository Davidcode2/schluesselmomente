# Dockerfile.nginx-proxy
FROM nginx:stable

# Copy your custom Nginx configuration file into the container
# Assumes your nginx.conf file is in the same directory as this Dockerfile
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports 80 and 443, which Nginx will listen on
EXPOSE 80
EXPOSE 443

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
