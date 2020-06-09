const mongoose = require('mongoose');
const {MONGO_URL} = require('../config/');
mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URL, {useMongoClient: true});

mongoose.connection
  .once('open', () => console.log('Database is in relationship with Server <3'))
  .on('error', err => console.error(err));
