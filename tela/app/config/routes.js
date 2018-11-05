/*Padrão recorrente de injeção pelo Angular
Esse switch de states vai ocorrer dentro de index.html (SPA - Single Page Application) especificamente em ui-view*/

angular.module('MEAN_App').config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('dashboard', {
            url: "/dashboard",
            templateUrl: "dashboard/dashboard.html"
        }).state('billingCycle', {
            url: "/billingCycles",
            templateUrl: "billingCycle/tabs.html"
        });

        $urlRouterProvider.otherwise('/dashboard'); //default view to render in case of error
    }
]);