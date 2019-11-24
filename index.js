const express = require('express');
const opn = require('opn');
const fs = require('fs');
const path = require('path');

const app = express();

const args = process.argv.slice(2);
const argNames = args.filter(arg => arg.includes('--'));
const argVals = args.filter(arg => !arg.includes('--'));

const root = process.cwd();
const staticDir = argVals[argNames.findIndex(arg => arg === '--dir')] || '/dist';
const port = argVals[argNames.findIndex(arg => arg === '--port')] || '3000';

app.use('/', express.static(root + '/'));
app.use(staticDir, express.static(root + staticDir), (req, res) => {
  try {
    if (fs.lstatSync(path.normalize(root + staticDir + req.url)).isDirectory()) {
      res.redirect(staticDir + req.url + '/index.js');
    }
  } catch (error) {
    if (fs.lstatSync(path.normalize(root + staticDir + req.url + '.js')).isFile()) {
      res.redirect(staticDir + req.url + '.js');
    } else {
      console.error('Error serving', staticDir + req.url + '.js', error);
    }
  }
});

app.listen(port);
console.log('Listening on port', port);
console.log('Opening default browser at', 'http://localhost:' + port);
opn('http://localhost:' + port);
