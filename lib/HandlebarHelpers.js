var Handlebars = require('hbs');

Handlebars.registerHelper("prettifyDate", function(timestamp) {
    var formattedTime = new Date(timestamp);
    return formattedTime.getFullYear();
});
