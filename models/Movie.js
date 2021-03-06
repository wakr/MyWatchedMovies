var mongoose = require('mongoose');

var movieSchema = mongoose.Schema(
    {
        name: String,
        date: {type: Date, default: Date.now},
        description: String,
        yearMade: String,
        posterUrl: String
    });

/**
 * Movie-model that abstracts the database objects.
 * Fields: name, date, description, yearMade and posterUrl
 */
var MovieModel = mongoose.model('Movie', movieSchema);

module.exports = MovieModel;


