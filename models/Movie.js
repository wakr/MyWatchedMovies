var mongoose = require('mongoose');

var movieSchema = mongoose.Schema(
    {
        name: String,
        date: {type: Date, default: Date.now}
    });

/**
 * Movie-model that abstracts the database objects
 */
var MovieModel = mongoose.model('Movie', movieSchema);

module.exports = MovieModel;


