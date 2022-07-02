# dockerfile

# Using PHP-apache docker image
FROM php:8.1-apache

LABEL author="Riccardo Pastori <riccardo.pastori@tutanota.com>, Gruppetto Web (Bicocca)"

# Update the apache conf to let .htaccess work
RUN a2enmod rewrite

# Install node on the container linux OS
RUN apt-get update && apt-get install -y nodejs npm

# Run npm i to install the dependencies
RUN npm install