define(function(require) {

    var $ = require("jquery");
    var ref = new Firebase("https://movie-history-project.firebaseio.com/");

    return {

        eraseFilm : function(user, imdbID) {

            // console.log("trying to erase", imdbID);
            ref.child("profiles").child(user).child(imdbID).remove();

        }
    };
});