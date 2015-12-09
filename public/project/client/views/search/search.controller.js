(function () {
    "use strict";
    angular.module("MovieApp")
        .controller("SearchController", SearchController);

    function SearchController($rootScope, $routeParams, MovieService) {
        var search = this;
        var term = $routeParams.term;
        MovieService.getSearchResultByTerm(term).then(function (results) {
            search.results = results;
        });
    }
})();