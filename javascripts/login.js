define(function(require) {
  var $ = require('jquery');

  var loginRef = new Firebase("https://movie-history-project.firebaseio.com/");

  $("#loginPage").click(function(e) {
    e.preventDefault();
    var loginForm = {
        email: $("#email").val(),
        password: $("#password").val()
    };

    loginRef.authWithPassword(loginForm, function(error, authData) {
      if (error) {
      } else {
        window.location = "/search.html";  
      }
    
    });
  
  }); // End callback function

}); // End module definition