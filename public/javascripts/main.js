'use strict';

require.config({
    'paths': {
        'jquery': 'https://code.jquery.com/jquery-2.1.4.min',
        'underscore': 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min'
    }
});

requirejs(['jquery', 'underscore', 'run'], function($, _, run) {});