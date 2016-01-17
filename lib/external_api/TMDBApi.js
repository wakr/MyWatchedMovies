figaro = require('figaro').parse(null, function (result) {
});

var HttpRequester = require('./HttpRequester');

var apiSearchPrefix = "http://api.themoviedb.org/3/search/movie?query=";
var imageUrlPrefix = "http://image.tmdb.org/t/p/w500";
var apiKey = "&api_key=";

function TMDBApi() {
}

function findClosestMatchFor(movieQuery, callback) {
    var destinationAddress = apiSearchPrefix + movieQuery + apiKey + process.env.tmdb;

    HttpRequester.GET(destinationAddress, function (err, result) {

        if (err) {
            callback(err);
        } else {
            if (!result.total_results) {
                callback(new Error("HTTP succeed, but no movies was found."))
            }
            else {
                var firstResult = result['results'][0];
                firstResult.poster_path = imageUrlPrefix + firstResult.poster_path;
                callback(null, firstResult);
            }
        }
    });
}

/**
 * Finds a movie from the API with a given query.
 * @param movieQuery name of the movie.
 * @param controllerFn callback function which should be located in the controller.
 */
TMDBApi.findMovie = function (movieQuery, controllerFn) {
    findClosestMatchFor(movieQuery, function (err, closestMatch) {
        if (err) {
            controllerFn(err)
        } else {
            controllerFn(null, closestMatch)
        }
    });
};

module.exports = TMDBApi;