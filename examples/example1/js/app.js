var App = Ember.Application.create();

/******************************************************/
/*              MODEL                                 */
/******************************************************/

App.Movie = Ember.Object.extend({
    title : null,
    year: null,
    rating: 0,
    available: null,
    imdbLink: null
});


/******************************************************/
/*              CONTROLLER                            */
/******************************************************/
App.MoviesController = Ember.ArrayController.extend({
    content : null,

    init: function(){
            this.content = []
    }
});

/******************************************************/
/*              VIEW                                  */
/******************************************************/
App.MoviesView = Ember.View.extend({
    templateName: "movies",
    baseClass: "table",
    additionalClass: "table-hover"
    //table-bordered
});



App.ready = function() {

    //CREATE THE INSTANCES
    App.moviesView = App.MoviesView.create().append();
    App.moviesController = App.MoviesController.create();

    //CREATE SOME DATA
    var movie = App.Movie.create();
    movie.set('title','The Shawshank Redemption');
    movie.set('year', 1994);
    movie.set('rating', 9.2);
    movie.set('available', true);
    movie.set('imdbLink', 'http://www.imdb.com/title/tt0111161/');

    var movie2 = App.Movie.create();
    movie2.set('title','Pulp Fiction');
    movie2.set('year', 1994);
    movie2.set('rating', 9.0);
    movie2.set('available', true);
    movie2.set('imdbLink', 'http://www.imdb.com/title/tt0110912/');

    var movie3 = App.Movie.create();
    movie3.set('title','The Godfather');
    movie3.set('year', 1972);
    movie3.set('rating', 9.2);
    movie3.set('available', true);
    movie3.set('imdbLink', 'http://www.imdb.com/title/tt0068646/');

    App.moviesController.addObject(movie);
    App.moviesController.addObject(movie2);
    App.moviesController.addObject(movie3);
};

//INITIALIZE
App.initialize();