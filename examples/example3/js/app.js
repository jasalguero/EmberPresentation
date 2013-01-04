var App = Ember.Application.create();

/******************************************************/
/*              MODEL                                 */
/******************************************************/

App.Movie = Ember.Object.extend({
    id: null,
    title : null,
    year: null,
    rating: 0,
    available: null,
    imdbLink: null,
    onSale: function(){
      return ((this.rating < 4 ) && this.available) ? true : false;
    }.property("rating", "available")

    //App.router.moviesController.content[3].set('available',false)
});


/******************************************************/
/*              CONTROLLER                            */
/******************************************************/
App.ApplicationController = Ember.Controller.extend();

App.MoviesController = Ember.ArrayController.extend({
    content : null,

    init: function(){
            this.content = []
    }
});

App.MovieProfileController = Ember.Controller.extend({
    movie : null
});

/******************************************************/
/*              VIEW                                  */
/******************************************************/
App.MoviesView = Ember.View.extend({
    templateName: "movies",
    baseClass: "table"
});

App.MovieProfileView = Ember.View.extend({
    templateName: "movieProfile"
})


/******************************************************/
/*              ROUTER    ‚                            */
/******************************************************/
App.Router = Ember.Router.extend({
    enableLogging:  true,

    goToProfile: Ember.Router.transitionTo('root.movieProfile'),
    goHome: Ember.Router.transitionTo('root.index'),

    root: Ember.Route.extend({
        index: Ember.Route.extend({
            route: '/',
            connectOutlets: function(router){
                router.get('applicationController').connectOutlet('movies');
            }
        }),
        movieProfile: Ember.Route.extend({
            route: '/movie/:id',
            deserialize:  function(router, context){
                var movie = router.get('moviesController').findProperty('id', parseInt(context.id));
                return movie;
            },
            serialize:  function(router, context){
                return {
                    id: context.id
                }
            },
            connectOutlets: function(router, context){
                router.get('applicationController').connectOutlet('movieProfile');
                router.get('movieProfileController').set('movie',context);
            }
        })
    })
})

App.ready = function() {

    //CREATE SOME DATA
    var movie = App.Movie.create();
    movie.set('id',1);
    movie.set('title','The Shawshank Redemption');
    movie.set('year', 1994);
    movie.set('rating', 9.2);
    movie.set('available', true);
    movie.set('imdbLink', 'http://www.imdb.com/title/tt0111161/');

    var movie2 = App.Movie.create();
    movie2.set('id',2);
    movie2.set('title','Pulp Fiction');
    movie2.set('year', 1994);
    movie2.set('rating', 9.0);
    movie2.set('available', true);
    movie2.set('imdbLink', 'http://www.imdb.com/title/tt0110912/');

    var movie3 = App.Movie.create();
    movie3.set('id',3);
    movie3.set('title','The Godfather');
    movie3.set('year', 1972);
    movie3.set('rating', 9.2);
    movie3.set('available', true);
    movie3.set('imdbLink', 'http://www.imdb.com/title/tt0068646/');

    var movie4 = App.Movie.create();
    movie4.set('id',4);
    movie4.set('title','SpaceBalls');
    movie4.set('year', 1972);
    movie4.set('rating', 2.5);
    movie4.set('available', true);
    movie4.set('imdbLink', 'http://www.imdb.com/title/tt0068646/');

    App.get('router.moviesController').addObject(movie);
    App.get('router.moviesController').addObject(movie2);
    App.get('router.moviesController').addObject(movie3);
    App.get('router.moviesController').addObject(movie4);

    console.log("finished")
};

//INITIALIZE
App.initialize();