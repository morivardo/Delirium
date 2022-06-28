# Delirium

There are three ways to build and access to the Delirium website on your PC.

## Method 1 - Local server with Node.js

You will need **Node.js** and **PHP 5.6** (or later) installed on your computer to use it.

1. Open **'delirium' folder** in your terminal;
2. Run the **command `npm install`** to install dependencies;
3. Run the **command `gulp server`** to start the application;

This starts a built-in php server accessible from port 8010 (`localhost:8010`) that uses the "public" folder as the directory.

## Method 2 - Local server with PHP + Apache

Website can be accessed by opening the **'public' folder in a local server** such as _Apache_ (preinstalled on macOS computers) or through applications such as _XAMPP_.

By using this method, the application will be faster because the routing functionality is handled directly by the server thanks to the `.htaccess` file, which configures the server to route all requests to the `index.php` file, thus reducing redirects.

## Method 3 - Docker container ready to be used

Same architecture as the method 2, but using a Docker container. Faster to deploy and without installing any applications on your PC, except for Docker.

### Prerequisites
- Docker installed on your computer (optionally Docker Desktop, to "see" what you did with docker commands)

#### Steps
- Open the terminal in the main project folder
- Run `docker-compose up -d` to let Docker build the *PHP-Apache* image configuring it in a Docker Compose structure, to have a PHP-Apache server which expose a port in the local machine
- *Optionally* Run `docker-compose up` if you prefer to see any container logs on your terminal
- Open a browser and go to `http://localhost:8000` to access to Delirium website
