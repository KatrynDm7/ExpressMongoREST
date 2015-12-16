'use strict';
var express = require('express');
var router = express.Router();

/* home page - create user form */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'NodeJS (express.js) + MongoDB REST example' });
});

module.exports = router;
