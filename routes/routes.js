module.exports = function(app) {
    'use strict';

    app.use('/', require('./index'));
    app.use('/users', require('./users'));
}