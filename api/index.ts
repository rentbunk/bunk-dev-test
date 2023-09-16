import { Request, Response, NextFunction } from 'express';

const express = require('express');
const router = require('./routes/api/payouts.route');

let cors = require('cors');
let bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

app.use('/payouts', router);
  
// PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
  
// 404 Error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('Error 404!')
});
  
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;