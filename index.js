const winston = require('winston');
const express = require('express');
const app = express();

// refarctoring importer depuis startup
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging');
require('./startup/config')();
require('./startup/validation')();


const port = process.env.PORT || 3000;
const serve = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = serve;
