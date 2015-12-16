module.exports = function (ROOT_PATH) {
    'use strict';

    var config = {
        server: {
            port: process.env.PORT || 3000,
            hostname: process.env.HOSTNAME || '127.0.0.1'
        },
        database: {
            url: process.env.MONGOHQ_URL || 'mongodb://localhost:27017/demo'
        }
    };

    return config;
};
