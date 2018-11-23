const path = require('path');
const express = require('express');
const chalk = require('chalk');

const DIST_DIR = path.join(__dirname, 'build');
const PORT = 3000;
const app = express();

app.set('port', process.env.PORT || PORT);

console.log();
console.log(`Starting server on port: ${app.get('port')}...`);
console.log();

// Serving the files on the dist folder
app.use(express.static(DIST_DIR));

app.all('*', function(req, res) {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
});

const server = app
    .listen(app.get('port'), function() {
        console.log(
            `${chalk.green('Server Started!')} - http://localhost:${app.get('port')}`,
        );
    })
    .on('error', e => {
        console.log(chalk.red('\nServer Error:'), e);
    });

console.log();

server.setTimeout(process.env.TIMEOUT || 10000, () => {});
