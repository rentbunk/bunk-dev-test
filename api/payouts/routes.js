const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Define a route for handling GET requests to /expenses
router.post('/', (_req, _res) => {
  _res.json(controller.payouts(_req));
});

module.exports = router;
