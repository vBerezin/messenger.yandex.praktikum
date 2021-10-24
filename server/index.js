const express = require('express');
const paths = require('../config/paths');

const PORT = 3000;
const HOSTNAME = '0.0.0.0';
const server = express();

server.use(express.static(paths.build));

server.listen(PORT, HOSTNAME, () => {
  console.info(`Server running on http://localhost:${PORT}`);
});
