'use strict';

var express = require('express');
var router = express.Router();
var api = require('../api/api.js');

router
    /* find * users */
    .get('/', api.selectUsers)

    /* create new user */
    .post('/', api.createUser)

    /* find user by id */
    .get('/:id', api.getUser)

    /* update user by id */
    .put('/:id', api.updateUser)

    /* delete user by id */
    .delete('/:id', api.deleteUser);

module.exports = router;