const service = require('./services');

module.exports = {
  payouts(_req) {
    const { expenses } = _req.body;
    return service.payouts(expenses);
  },
};
