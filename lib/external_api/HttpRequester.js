var request = require('request');

function HttpRequester() {
}
/**
 * @param address target webpage.
 * @param callback function to call with the response.
 */
HttpRequester.GET = function (address, callback) {
    request.get(address, function (error, result, jsonResponse) {
        if (error) {
            callback(new Error('Bad Request.'));
        }
        callback(null, JSON.parse(jsonResponse));
    });
};

module.exports = HttpRequester;