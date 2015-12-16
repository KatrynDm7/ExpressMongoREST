'use strict';

define([
        'jquery',
        'underscore'
    ], function($, _) {
        var User = function() {
            this.form = $('form');
            this.elementGroup = $('.form-group');
            this.elementCreate = $('.submit-user');
            this.elementUpdate = $('.update-user');
            this.elementDelete = $('.delete-user');
            this.userStatus = $('.user-status');
            this.emailRegExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
            this.fieldEmail = $('input[name="email');
            this.fieldPassword = $('input[name="password');
            this.successClass = 'has-success';
            this.errorClass = 'has-error';

            this._init();
        };

        User.prototype = {
            _init: function() {
                var self = this;

                this.fieldEmail.on('input', function (e) {
                    self._validateEmail(e);
                });

                this.fieldPassword.on('input', function (e) {
                    self._validatePassword(e);
                });

                /* get user by id */
                this._getUser();

                /* create user */
                this.elementCreate.on('click', function () {
                    self.fieldEmail.trigger('input');
                    self.fieldPassword.trigger('input');

                    if (self.form.find(self.elementGroup).hasClass(self.errorClass) == false) {
                        self._createUser();
                    }
                    else {
                        self.userStatus.html('').html('invalid input data');
                    }
                });

                /* update user */
                this.elementUpdate.on('click', function (e) {
                    if (self.form.find(self.elementGroup).hasClass(self.errorClass) == false) {
                        self._updateUser(e);
                    }
                    else {
                        self.userStatus.html('').html('invalid input data');
                    }
                });

                /* delete an user */
                this.elementDelete.on('click', function (e) {
                   self._deleteUser(e);
                });
            },

            /* get user by id */
            _getUser: function() {
                if (window.location.href.split('users/').length > 1) {
                    var id = window.location.href.split('users/')[1];
                    if (typeof id !== 'undefined') {
                        $.ajax({
                            type: 'GET',
                            url: '/users/' + id,
                            dataType: 'json'
                        });
                    }
                }
            },

            /* create user */
            _createUser: function() {
                var self = this;
                var email =  $('input[name="email"]').val();
                var password = $('input[name="password"]').val();

                $.ajax({
                    type: 'POST',
                    url: '/users',
                    dataType: 'json',
                    data: {
                        email: email,
                        password: password
                    },
                    complete: function(data) {
                        self.userStatus.html('').html(data.responseJSON.message);
                    }
                })
            },

            /* update user */
            _updateUser: function(e) {
                var self = this;
                var id = (typeof e !== 'undefined') ? $(e.target).closest('p').attr('class') : null;
                var email = (typeof e !== 'undefined') ? $(e.target).closest('p').find($('input[name="email"]')).val(): null;

                if (id !== null && email !== null) {
                    $.ajax({
                        type: 'PUT',
                        url: '/users/' + id,
                        dataType: 'json',
                        data: {
                            email: email
                        },
                        complete: function(data) {
                            self.userStatus.html('').html(data.responseJSON.message);
                        }
                    })
                }
            },

            /* delete an user */
            _deleteUser: function (e) {
                var self = this;
                var id = (typeof e !== 'undefined') ? $(e.target).closest('p').attr('class') : null;

                $.ajax({
                    type: 'DELETE',
                    url: '/users/' + id,
                    dataType: 'json',
                    complete: function(data) {
                        self.userStatus.html('').html(data.responseJSON.message);
                        $(e.target).closest('p').hide();
                    }
                });
            },

            /* email validation */
            _validateEmail: function(e) {
                var re = this.emailRegExp;

                if ($(e.target).val() == '' || !re.test($(e.target).val())) {
                    $(e.target).closest(this.elementGroup).addClass(this.errorClass);
                    return false;
                }
                else {
                    $(e.target).closest(this.elementGroup).removeClass(this.errorClass).addClass(this.successClass);
                    return false;
                }
            },

            /* password validation: min 3 characters */
            _validatePassword: function (e) {
                if ($(e.target).val() == '' || $(e.target).val().length < 3) {
                    $(e.target).closest(this.elementGroup).addClass(this.errorClass);
                    return false;
                }
                else {
                    $(e.target).closest(this.elementGroup).removeClass(this.errorClass).addClass(this.successClass);
                    return false;
                }
            }
        };

        User.prototype = $.extend(Object.create(User.prototype));

        return User;
    }
);