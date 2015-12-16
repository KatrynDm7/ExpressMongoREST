module.exports = function(connection) {
    'use strict';

    return {
        users: require('./users')(connection)
    }
};
