var express = require('express');
var router = express.Router();

// Database-connections
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/apitest');

var prefixRoot = "movies";

// model dependencies
var Movie = require('../models/Movie.js');

// GET shows all movies
router.get('/', function(req, res) {

    mongoose.model('Movie').find(function(err, movies){
        res.render(prefixRoot + '/index', {movies: movies});
    });
});

// GET to show one movie
router.get('/:id', function(req,res){

    mongoose.model('Movie').findById(req.params.id, function(err,movie){
        res.render(prefixRoot + '/show', {movie:movie});
    });
});

// POST saves movie to mongoDB
router.post('/', function(req,res){

        mongoose.model('Movie').create(getMovieDataFrom(req));

        req.method = 'get';
        res.redirect(prefixRoot);
});

// Forms a movie-object from the request
getMovieDataFrom = function(request){
  return {name: request.body.first_name, date: request.body.date_watched};
};

module.exports = router;