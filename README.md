# Delirium

To build the application on your PC there are two method.

## Method 1

You will need **Node.js** and **PHP 5.6** (or later) installed on your computer to use it.

1. Open **'delirium' folder** in your terminal;
2. Run the **command `npm install`** to install dependencies;
3. Run the **command `gulp server`** to start the application;

This starts a built-in php server accessible from port 8010 (localhost:8010) that uses the "public" folder as the directory.

## Method 2

**Alternatively**, you can view the site by opening the **'public' folder in a local server** such as _Apache_ (preinstalled on macOS computers) or through applications such as _XAMPP_.

By using this method, the application will be faster because the routing functionality is handled directly by the server thanks to the `.htaccess` file, which configures the server to route all requests to the `index.php` file, thus reducing redirects.
