FROM nginx
RUN openssl req -x509 -nodes -sha256 \
  -subj "/C=CA/ST=QC/O=Company, Inc./CN=localhost" \
  -addext "subjectAltName=DNS:localhost" \
  -newkey rsa:2048 \
  -keyout /etc/ssl/private/nginx-selfsigned.key \
  -out /etc/ssl/certs/nginx-selfsigned.crt;
COPY ./https-proxy.conf /etc/nginx/templates/default.conf.template
