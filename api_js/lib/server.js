// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoute = require('./routes/UserRoute');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use('/api/users', userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
