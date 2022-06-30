# Delirium

There are three ways to build and access to the Delirium website on your PC.

## Method 1 - Local server with Node.js

### Prerequisites
You will need **Node.js** and **PHP 5.6** (or later) installed on your computer to use it.

### Steps
1. Open **'delirium'** folder in your terminal;
2. Run the **command `npm install`** to install dependencies;
3. Run the **command `gulp server`** to start the application;

This starts a built-in php server accessible from port 8010 (`localhost:8010`)
that uses the "public" folder as the directory.

The application has already been built anyway running the command `gulp`,
the application would be rebuilt and the Google Chrome browser would open a new tab
addressed to a proxy server in port 3001 that connects to the php server in port
8010 (which must be previously started). In addition, this command initializes a control process that rebuilds each file in the source folder that is modified and updates the browser tab

## Method 2 - Local server with PHP + Apache

Website can be accessed by opening the **'public' folder in a local server** such as _Apache_ (preinstalled on macOS computers) or through applications such as _XAMPP_.

By using this method, the application will be faster because the routing functionality is handled directly by the server thanks to the `.htaccess` file, which configures the server to route all requests to the `index.php` file, thus reducing redirects.

## Method 3 - Docker container ready to be used

Same architecture as the method 2, but using a Docker container. Faster to deploy and without installing any applications on your PC, except for Docker.

### Prerequisites
You will need **Docker** installed on your computer to use it.

### Steps
1. Open the terminal in the main project folder
2. Run `docker-compose up -d` to let Docker build the *PHP-Apache* image configuring it in a Docker Compose structure, to have a PHP-Apache server which expose a port in the local machine
3. *Optionally* Run `docker-compose up` if you prefer to see any container logs on your terminal
4. Open a browser and go to `http://localhost:8000` to access to Delirium website