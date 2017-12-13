/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/index/customer/allProList");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "../../static/ysys/views/common/content.html"
        })
        .state('login',{
            url: '/login',
            templateUrl: '../../static/ysys/views/customer/login.html',
            
        })
        .state("register",{
            url: "/register",
            templateUrl: "../../static/ysys/views/customer/register.html"
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "../../static/ysys/views/main.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.minor', {
            url: "/minor",
            templateUrl: "../../static/ysys/views/minor.html",
            data: { pageTitle: 'Example view' }
        })
        .state("index.allProList",{
            url: "/customer/allProList",
            templateUrl: "../../static/ysys/views/customer/allProList.html"
        })
        .state("index.question",{
            url: "/customer/question",
            templateUrl: "../../static/ysys/views/customer/question.html"
        })
        .state("index.AjaxTest",{
            url: "/AjaxTest",
            templateUrl: "../../static/ysys/views/AjaxTest.html"
        })
}
angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
