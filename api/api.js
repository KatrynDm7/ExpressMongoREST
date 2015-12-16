'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('users');
var async = require('async');
var config = require('../config/config');
var crypto = require('crypto');
var errorHandler = require('../helpers/errorHandler');

/* show all users */
exports.selectUsers = function (req, res, next) {
    User.find({}, function(err, data) {
        var response = errorHandler(err, '', data, 'fetch');

        if (response.error == false) {
            res.render('users', { data: data });
        }
        else {
            res.send('no users are in DB');
        }
    });
};

/* create an user */
exports.createUser = function (req, res, next) {
    var user = new User();

    async.series([
        function(callback) {
            User.findOne().sort({ 'id' : -1 }).exec(function(err, data) {
                var id = 0;
                if (!err) {
                    if (typeof data == 'undefined' || data == null || typeof data.id == 'undefined') {
                        id = 1;
                    }
                    else {
                        id = Number(data.id + 1);
                    }
                }
                callback(null, id);
            });
        }], function(err, results) {
            if (typeof req.body !== 'undefined') {
                user.email = req.body.email;
                user.password = crypto.createHash('sha1').update(req.body.password).digest('hex');
                user.id = results.toString();

                user.save(function(err) {
                    var response = errorHandler(err, '', user.id, 'add');
                    res.json(response);
                });
            }
        });
};

/* show an user */
exports.getUser = function (req, res, next) {
    var id = Number(req.params.id);

    User.find( { id: id }, function (err, data) {
        var response = errorHandler(err, '', data, 'fetch');
        res.json(response);
    });
};

/* update an user */
exports.updateUser = function (req, res, next) {
    var id = Number(req.params.id);

    User.find( { id: id }, function (err, data) {
        var response = {};

        if (err) {
            response = errorHandler(err, '', data, 'fetch');
            res.json(response);
        }
        else {
            User.update({id: id}, {$set: {email: req.body.email} }, function (err, obj) {
                response = errorHandler(err, obj.n, id, 'update');
                res.json(response);
            });
        }
    })
};

/* delete an user */
exports.deleteUser = function (req, res, next) {
    var id = Number(req.params.id);

    User.find({ id: id }, function (err, data) {
        var response = {};

        if (err) {
            response = errorHandler(err, '', data, 'delete');
            res.json(response);
        }
        else {
            User.remove({ id : id }, function (err, obj) {
                response = errorHandler(err, obj.result.n, id, 'delete');
                res.json(response);
            });
        }
    });
};