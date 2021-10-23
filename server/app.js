const express = require('express');
const paths = require('../config/paths');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(paths.build));

app.listen(PORT, () => {
  console.info(`Server running on http://localhost:${PORT}`);
});
