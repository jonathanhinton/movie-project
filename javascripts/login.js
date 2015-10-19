define(function(require) {
  var $ = require('jquery');

  var loginRef = new Firebase("https://movie-history-project.firebaseio.com/");

  $("#loginButton").click(function(e) {

    e.preventDefault();

    var loginForm = {
        email: $("#email").val(),
        password: $("#password").val()
    };

    var loginCopy = loginForm;
    console.log("login Copy", loginCopy);

    loginRef.authWithPassword(loginForm, function(error, authData) {
      if (error) {
        console.log(error);
      } else {
        console.log("authData", authData);
        window.location = "/search.html";
      }

    });

  }); // End callback function

}); // End module definition