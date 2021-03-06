// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require(`${process.cwd()}/lib/routes/UserRoutes`);
const { dbconnect } = require(`${process.cwd()}/lib/DB`);

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use('/api/users', userRoute);

dbconnect();

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
