const BillingCycle = require('./billingCycle');
const _ = require('lodash');

BillingCycle.methods(['get', 'post', 'put', 'delete']);
BillingCycle.updateOptions({new: true, runValidators: true}); //Always respond new object (updated) after put method.
//Also validates Schemas before updating a object stored in DB


//node-restful integrates mongoose and express, this way I don't need to require express
BillingCycle.route('count', function(req, res, next) {
    BillingCycle.count(function(error, item) {
        if (error) res.status(500).json({errors: [error]});
        else res.status(200).json({item});
    });
});

function getSummary(req, res) {
    BillingCycle.aggregate([{
        $project: {sumOfcredit: {$sum: "$credits.value"}, sumOfdebt: {$sum: "$debts.value"}}
        //Will aggregate into 2 objects called credit and debt, and will sum all the credits.val and debts.val from billingCycleSchema

    }, {
        $group: {
            _id: null,
            creditFinal: {$sum: "$sumOfcredit"}, debtFinal: {$sum: "$sumOfdebt"}
            //_id is mandatory in grouping
            //This will sum all the groups of 2 objects created in the entire db
        }
    }, {
        $project: {_id: 0, creditFinal: 1, debtFinal: 1 }
        //1-true 0-false, will remove ID from the aggregation

    }], function(error, result) {
        if (error) res.status(500).json({errors:error});
        else res.status(200).json(_.defaults(result[0], {creditFinal: 0, debtFinal: 0}));
        //defaults makes result[0] always return a valid object, if its null or undef it uses credit && debt as 0
    });
}


module.exports = {
    BillingCycle: BillingCycle,
    getSummary: getSummary
};
