'use strict';
var express = require('express');
var router = express.Router();
var userModel = require('../models/user');

// Protecting/Securing a custom route
// Simple middleware to ensure user is authenticated.
// If the request is authenticated, the request will proceed. Otherwise, the user will be redirected to the login page
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // denied. redirect to login page
    res.redirect('/login')
}

/* GET users listing. Call ensureAuthenticated function ensure user is authenticated. */
router.get('/', ensureAuthenticated, function (req, res) {
    try {
        // Retrieve all users if there is any
        userModel.find({}, function (err, found) {
            console.log(err);
            console.log(found);
            // Pass found from server to pug file
            res.render('users', { users: found });
        });
    } catch (err) {
        console.log(err);
        res.render('users', { title: 'Users Listing' });
    }
});


module.exports = router;
