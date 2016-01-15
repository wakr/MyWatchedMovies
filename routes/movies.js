var express = require('express');
var router = express.Router();

// model dependencies
var Movie = require('../models/Movie.js');

movies = [];

router.get('/', function(req, res, next) {
    res.render('movies/index', {movies: this.movies});
});


router.post('/', function(req,res,next){

        var new_movie = new Movie(req.body.first_name, req.body.date_watched);
        movies.push(new_movie);

        req.method = 'get';
        res.redirect('/movies');
});

module.exports = router;