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
router.get('/', function (req, res) {

    mongoose.model('Movie').find(function (err, movies) {
        res.render(prefixRoot + '/index', {movies: movies});
    });
});

// GET to show one movie
router.get('/:id', function (req, res) {

    mongoose.model('Movie').findById(req.params.id, function (err, movie) {
        if (err) {
            res.render('error', {message: err.message});
        }
        else {
            res.render(prefixRoot + '/show', {movie: movie});
        }
    });
});

// POST finds a movie and saves it to mongoDB
router.post('/', function (req, res) {

    var movieName = req.body.first_name;
    var dateWatched = req.body.date_watched;

    TMDBApi.findMovie(movieName, function (err, foundMovie) {

        if (err) {
            res.render('error', {message: err.message});
        }
        else {
            mongoose.model('Movie').create(getMovieModelFrom(foundMovie, dateWatched));
            req.method = 'get';
            res.redirect(prefixRoot);
        }
    });
});

// Forms a movie-object from the request
getMovieModelFrom = function (foundMovie, dateWatched) {
    return {
        name: foundMovie.title,
        date: dateWatched,
        description: foundMovie.overview,
        yearMade: foundMovie.release_date,
        posterUrl: foundMovie.poster_path
    };
};

module.exports = router;