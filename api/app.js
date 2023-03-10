const app = require('express')();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const payoutsRoutes = require('./payouts/routes');
const corsOptions = {
  origin: 'http://localhost:4200',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/payouts', payoutsRoutes);

module.exports = app;
