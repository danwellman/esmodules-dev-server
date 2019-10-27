const express = require('express');
const opn = require('opn');

const app = express();

const args = process.argv.slice(2);
const argNames = args.filter(arg => arg.includes('--'));
const argVals = args.filter(arg => !arg.includes('--'));

const root = process.cwd();
const staticDir = argVals[argNames.findIndex(arg => arg === '--dir')] || '/dist';
const port = argVals[argNames.findIndex(arg => arg === '--port')] || '3000';

app.use('/', express.static(root + '/'));
app.use(staticDir, express.static(root + staticDir), (req, res) => {
  res.redirect(staticDir + req.url + '.js');
});

app.listen(port);
console.log('Listening on port', port);
console.log('Opening default browser at', 'http://localhost:' + port);
opn('http://localhost:' + port);
