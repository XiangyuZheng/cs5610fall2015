(function () {
    "use strict";
    angular.module("MovieApp")
        .config(configure);

    function configure($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "project-home/project-home.view.html",
                controller: "HomeController as home"
            })
            .when("/home", {
                templateUrl: "project-home/project-home.view.html",
                controller: "HomeController as home"
            })
            .when("/about", {
                templateUrl: "about/about.view.html"
            })
            .when("/admin-add", {
                templateUrl: "admin-add-movie/admin-add-movie.view.html",
                controller: "AdminAddController as adminAdd"
            })
            .when("/admin-login", {
                templateUrl: "admin-login/admin-login.view.html",
                controller: "AdminLoginController as adminLogin"
            })
            .when("/admin-user", {
                templateUrl: "admin-user-info/admin-user-info.view.html",
                controller: "AdminUserInfoController as adminUserInfo"
            })
            .when("/admin-movie", {
                templateUrl: "admin-movie/admin-movie.view.html",
                controller: "AdminMovieController as adminMovie"
            })
            .when("/movie-info/:movieId", {
                templateUrl: "movie-info/movie-info.view.html",
                controller: "MovieInfoController as movieInfo"
            })
            .when("/popular-movie", {
                templateUrl: "popular-movie/popular-movie.view.html",
                controller: "PopularMovieController as popMovie"
            })
            .when("/search/:term", {
                templateUrl: "search/search.view.html",
                controller: "SearchController as search"
            })
            .when("/register", {
                templateUrl: "user-register/user-register.view.html",
                controller: "RegisterController as register"
            })
            .when("/login", {
                templateUrl: "project-login/project-login.view.html",
                controller: "LoginController as login"
            })
            .when("/recom-choose", {
                templateUrl: "recom-choose/recom-choose.view.html",
                controller: "RecomChooseController as recomChoose"
            })
            .when("/profile/:userId", {
                templateUrl: "user-profile/user-profile.view.html",
                controller: "ProfileController as profile"
            })
            .when("/recommendation", {
                templateUrl: "recommendation/recommendation.view.html",
                controller: "RecommendationController as recom"
            });
    }
})();