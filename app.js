var express = require('express');
var app = express();
var exports = module.exports = {};

// Removed welcomeMessage; now focusing solely on addNumbers API
function addNumbers(a, b){
    if (typeof a !== 'number' || typeof b !== 'number' || Number.isNaN(a) || Number.isNaN(b)) {
        throw new Error('Arguments must be numbers');
    }
    return a + b;
}

// Remove view engine & EJS usage since we now return JSON only
// app.set('view engine', 'ejs');

// Arithmetic endpoint: /add?a=1&b=2 -> {a:1,b:2,result:3}
app.get('/add', function (req, res) {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    if (Number.isNaN(a) || Number.isNaN(b)) {
        return res.status(400).json({error: 'Query params a and b must be numbers'});
    }
    return res.json({ a, b, result: addNumbers(a, b) });
});

var server = app.listen(5000, function () {
    console.log("Node server is running..");
});

module.exports = server;
module.exports.addNumbers = addNumbers;
