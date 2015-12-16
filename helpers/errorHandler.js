'use strict';
var errorHandler = function(err, other, data, something) {
    var response = {};
    var msg = '';

    switch(something) {
        case 'add':
            msg = 'added';
            break;
        case 'update':
            msg = 'updated';
            break;
        case 'fetch':
            msg = 'fetched';
            break;
        default:
            msg = 'deleted';
            break;
    }


    if (err || other === 0 || data.length == 0) {
        response = {'error' : true, 'message' : 'Error ' + msg + ' data'};
    }
    else {
        response = {'error' : false, 'message' : 'User with id ' + data + ' was ' + msg};
    }

    return response;
};

module.exports = errorHandler;