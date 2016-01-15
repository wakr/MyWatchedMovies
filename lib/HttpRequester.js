var request = require('request');

function HttpRequester(){}

// HTTP GET-call
HttpRequester.GET = function (address) {
    return {"test":"data"};
};

module.exports = HttpRequester;
