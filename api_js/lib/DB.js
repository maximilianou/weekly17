// DB.js
const mongoose = require('mongoose');
const env = require('./environment');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

exports.dbconnect = function async() {
  mongoose.connect(env.DB).then(
    () => {
      console.log('Database is connected');
    },
    (err) => {
      console.log('Can not connect to the database' + err);
    }
  );
};
