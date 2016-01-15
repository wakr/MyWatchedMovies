var express = require('express');
var router = express.Router();

var prefixRoot = "movies";

// model dependencies
var Movie = require('../models/Movie.js');

movies = [];

// shows all movies
router.get('/', function(req, res) {
    res.render(prefixRoot + '/index', {movies: this.movies});
});

// add a movie
router.post('/', function(req,res){

        var new_movie = new Movie(req.body.first_name, req.body.date_watched);
        movies.push(new_movie);

        req.method = 'get';
        res.redirect(prefixRoot);
});

module.exports = router;