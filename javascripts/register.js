define(function(require) {

  var $ = require('jquery');

  var registerRef = new Firebase('https://movie-history-project.firebaseio.com/');

  $('#registerButton').click(function(e) {

    e.preventDefault();

    var form = {
      email: $('#email').val(),
      password: $('#password').val()
    };

    registerRef.createUser(form, function(error, authData) {

      if (error) {
        console.log(error);
      } else {
        console.log(authData);
        window.location = '/search.html';
      }

    });

  });

});
