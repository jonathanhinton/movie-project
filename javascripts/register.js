define(function(require) {

  var $ = require('jquery');

  var registerRef = new Firebase('https://movie-history-project.firebaseio.com/');

  $('#registerButton').click(function(e) {

    e.preventDefault();

    var form = {
      email: $('#email').val(),
      password: $('#password').val()
    };

    registerRef.createUser(form, function(error, userData) {

      if (error) {
        console.log(error);
      }

      var authdata = registerRef.getAuth();

      if (authdata) {
        window.location = '/search.html';
      }

    });

  });

});