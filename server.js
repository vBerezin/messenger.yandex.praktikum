const express = require('express');
const path = require('path');
const paths = require('./config/paths');

const PORT = process.env.PORT || 3000;
const HOSTNAME = '0.0.0.0';
const BUILD_PATH = path.resolve(paths.build);
const server = express();

server.use(express.static(BUILD_PATH));
server.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, BUILD_PATH, '/index.html'));
});
server.listen(PORT, HOSTNAME, () => {
  console.info(`Server running on http://localhost:${PORT}`);
});
