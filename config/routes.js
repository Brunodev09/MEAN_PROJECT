const express = require('express');

module.exports = function(app) {
    const router = express.Router();
    app.use('/api', router); //Uses middleware only when route starts at /api

    const billingCycleService = require('../api/billingCycle/billingCycleService');


    billingCycleService.BillingCycle.register(router, '/billingCycles');

    router.route('/billingSummary').get(billingCycleService.getSummary);

};