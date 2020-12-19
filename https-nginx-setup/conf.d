server {
    listen              443 ssl;
    server_name         server.company.com;
    ssl_certificate     /etc/letsencrypt/live/server.company.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/server.company.com/privkey.pem;

    location / {
        ...
    }
}
