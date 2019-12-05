const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const app = express();

app.use(cors());

const port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/dist/my-app'));
app.get('/*', (req,res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port, () => console.log('Running...'));