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

// POST saves movie to mongoDB
router.post('/', function(req,res){

        var name = req.body.first_name;
        var date = req.body.date_watched;

        mongoose.model('Movie').create({name: name, date:date}, function(err, movie){
            console.log(movie);
        });

        req.method = 'get';
        res.redirect(prefixRoot);
});

module.exports = router;