var app = angular.module("LearnFromVideoGames", ['ui.bootstrap']).
  config(function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider.when('/home',
    {
      templateUrl:    'home.html',
      controller:     'HomeCtrl'
    });
    $routeProvider.when('/games',
    {
      templateUrl:    'games.html',
      controller:     'GamesCtrl'
    });
    $routeProvider.when('/categories',
    {
      templateUrl:    'categories.html',
      controller:     'CategoriesCtrl'
    });
    $routeProvider.otherwise(
    {
      redirectTo:     '/home',
      controller:     'HomeCtrl', 
    }
  );
});


app.controller('NavCtrl', 
['$scope', '$location', function ($scope, $location) {
  $scope.navClass = function (page) {
    var currentRoute = $location.path().substring(1) || 'home';
    return page === currentRoute ? 'active' : '';
  };
  
  $scope.loadHome = function () {
        $location.url('/home');
    };
    
      $scope.loadGames = function () {
        $location.url('/games');
    };
    
      $scope.loadCategories = function () {
        $location.url('/categories');
    };
    
}]);

app.controller('GamesCtrl', function($scope, $compile, $http) {
  var games = $scope.games = [];

  $http.get('games.json').success(function(data) {
    $scope.games = data;
  });

  
  console.log('inside games controller');
});

app.controller('HomeCtrl', function($scope, $compile, $http) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];

  $http.get('slides.json').success(function(data) {
    $scope.slides = data;
  });

  console.log('inside home controller');

});

app.controller('CategoriesCtrl', function($scope, $compile) {
  console.log('inside categories controller');

});

// some javascript templating now...

var htmlChar = function(name){
        var code= HTML_CHARS[name];
        if(code){
                return "&" +code+ ";";
        };
};

var HTML_CHARS={
        "blackStar": "#9733",
        "whiteStar": "#9734",
};

var renderRating=function(rating){
        rating=Math.round(rating);

        var starTemplate=_.template(getTemplate("star-template")),
                blackStar={"star":htmlChar("blackStar"),
                                        "starClass": "gold-star"},
                whiteStar={"star":htmlChar("blackStar"),
                                        "starClass": "grey-star"};
        var blackStars= _.map(_.range(0,rating), function(){
                return starTemplate(blackStar);
        });
        var whiteStars=_.map(_.range(0, 5-rating),function(){
                return starTemplate(whiteStar);
        });
        return blackStars.concat(whiteStars).join("");
};