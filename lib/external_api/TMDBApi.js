figaro = require('figaro').parse(null, function(result){});
var HttpRequester = require('./HttpRequester');

var apiSearchPrefix = "http://api.themoviedb.org/3/search/movie?query=";
var apiKey = "&api_key=";

var imageUrlPrefix = "http://image.tmdb.org/t/p/w500";

function TMDBApi(){}

function findClosestMatchFor(movieQuery, callback){
    var destinationAddress = apiSearchPrefix + movieQuery + apiKey + process.env.tmdb;

    HttpRequester.GET(destinationAddress, function(result){
        if(result.total_results) {
            var firstResult = result['results'][0];
            firstResult.poster_path = imageUrlPrefix + firstResult.poster_path;
            callback(firstResult);
        }
        else{
            callback(null);
        }
    });
}

TMDBApi.findMovie = function(movieQuery, controllerFn) {
    findClosestMatchFor(movieQuery, function(closestMatch){
        controllerFn(closestMatch)
    });
};

module.exports = TMDBApi;