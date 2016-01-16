var request = require('request');

function HttpRequester(){}

// HTTP GET-call
HttpRequester.GET = function (address, callback) {
    request.get(address, function(error, result, jsonResponse){
       callback(JSON.parse(jsonResponse));
    });
};

module.exports = HttpRequester;
