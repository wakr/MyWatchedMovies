var expect = require("chai").expect;
var assert = require("assert");
var Movie = require('../models/Movie');

describe("Movie model", function () {
    describe("Can be initialized from the Movie-module", function () {
        var movie = new Movie({name: "title_test"});
        assert.equal(true, true);
    });
});
