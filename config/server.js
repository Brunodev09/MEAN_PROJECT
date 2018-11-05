const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Main route'));

app.listen(port, function() {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;

// app.use(function(req, res, next) {
//     // res.send("Working");
//     console.log('middleware --> 1');
//     next(); //calls next middleware, if not called it will auto look for the next middleware
// });
//
// app.use(function(req, res, next) {
//    console.log('middleware --> 2');
// }); //Middlewares works IN COMPILATION ORDER in all URLS