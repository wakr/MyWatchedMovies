var express = require('express');
var router = express.Router();

// Database-connections
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/apitest');

// model dependencies
var Movie = require('../models/Movie.js');
var TMDBApi = require('../lib/external_api/TMDBApi');


var prefixRoot = "movies";


// GET shows all movies
router.get('/', function(req, res) {

    mongoose.model('Movie').find(function(err, movies){
        res.render(prefixRoot + '/index', {movies: movies});
    });
});

// GET to show one movie
router.get('/:id', function(req,res){

    mongoose.model('Movie').findById(req.params.id, function(err,movie){
                res.render(prefixRoot + '/show', {movie: movie});
    });
});

// POST saves movie to mongoDB
router.post('/', function(req,res){

        var movieName = req.body.first_name;
        var dateWatched = req.body.date_watched;

        TMDBApi.findMovie(movieName, function(foundMovie){
            if(foundMovie){
                mongoose.model('Movie').create(getMovieDataFrom(foundMovie, dateWatched));
                req.method = 'get';
                res.redirect(prefixRoot);
            }
        });
});

// Forms a movie-object from the request
getMovieDataFrom = function(foundMovie, dateWatched){
  return {name:foundMovie.title, date: dateWatched,
      description: foundMovie.overview, posterUrl: foundMovie.poster_path};
};

module.exports = router;