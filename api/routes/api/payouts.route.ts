const express = require('express');
const { PayoutService } = require ('../../services/payoutService');

const router = express.Router();
const payoutService = new PayoutService();

router.post('', payoutService.handleRquest);

module.exports = router;