// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'index.html')));

// Get our API routes
const auth = require('./routes/auth');
const loans = require('./routes/loans');

const ROUTE_CONFIG = require('./config/route-config');

// Set our api routes
app.use(`/${ROUTE_CONFIG.APPNAME}/auth/${ROUTE_CONFIG.VERSION}`, auth);
app.use(`/${ROUTE_CONFIG.APPNAME}/loans/${ROUTE_CONFIG.VERSION}`, loans);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
const host = process.env.HOST || 'localhost';
app.set('port', port);
app.set('host', host);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on ${host}:${port}`));
