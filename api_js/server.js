// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

const config = require('./DB');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

/*
mongoose.connect(config.DB).then(
  () => { console.log('Database is Connected!!'); },
  (err) => { console.log(`Can not connect to database: ${err} `); }
);
*/

app.get('/', function (req, res) {
mongoose.connect(config.DB).then(
  () => { console.log('Database is Connected!!'); },
  (err) => { console.log(`Can not connect to database: ${err} `); }
);
  res.send('hello');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
