// Load the http module
const http = require('http');

// Load the file system module
const fs = require('fs');

// Load the path module
const path = require('path');

// Constant that stores the port number
const PORT = 3000;


// Function to determine Content-Type based on file extension
function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const contentTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.svg': 'image/svg+xml',
    };
    return contentTypes[ext] || 'text/plain';
}


// Function to serve static files
function serveStaticFile(res, filePath) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // Status code 500 if a server error occurs
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>500 - Internal Server Error</h1>');
        } else {
            // Status code 200 when successful
            res.writeHead(200, { 'Content-Type': getContentType(filePath) });
            res.end(data);
        }
    });
}


//create server
const server = http.createServer((req, res) => {

    // Normalize the URL: remove query strings, trailing slashes, convert to lowercase
    let urlPath = req.url.split('?')[0].toLowerCase();
    if (urlPath !== '/' && urlPath.endsWith('/')) {
        urlPath = urlPath.slice(0, -1);
    }

    // Map URL paths to files inside the public folder
    const urlMap = {
        '/': 'public/index.html',
        '/services': 'public/services.html',
        '/appointments' : 'public/appointment.html',
        '/portfolio': 'public/portfolio.html',
    };

    // Determine the file path
    let filePath = urlMap[urlPath];

    if (filePath) {
        // Serve the mapped HTML page
        serveStaticFile(res, path.join(__dirname, filePath));
    } else {
        // Check if it's a direct file request 
        const directPath = path.join(__dirname, 'public', urlPath);
        fs.access(directPath, fs.constants.F_OK, (err) => {
            if (err) {
                // File not found - serve custom 404 page with status code 404
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(data);
                });
            } else {
                // File exists, serve it
                serveStaticFile(res, directPath);
            }
        });
    }
});





// Tell the server which port to listen on and output the URL to the console
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});