// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
const express = require('express');
const path = require("path");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../app/public/home.html'));
    });

    // Sets the route for the about page
    app.get('/survey', function (req, res) {
        res.sendFile(path.join(__dirname, '../app/public/survey.html'));
    });
};
