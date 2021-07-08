 const winston = require('winston');
 const mongoose = require('mongoose');
 const config = require('config');

// module.exports = function () {
//     mongoose.connect('mongodb://localhost/vidly')
//         .then(() => winston.info('Connected to MongoDB...'));
// }


module.exports = function() {
    const db = config.get('db');
    mongoose.connect(db)
      .then(() => winston.info(`Connected to ${db}...`));
 }