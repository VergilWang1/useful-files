/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider,$httpProvider) {
    $httpProvider.interceptors.push('timestampMarker');
    $urlRouterProvider.otherwise("/login");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "../../static/ysys/views/common/content.html",
            data: { pageTitle: 'Y.SYS' }
        })
        .state('login',{
            url: '/login',
            templateUrl: '../../static/ysys/views/customer/login.html',
        })
        .state("register",{
            url: "/register",
            templateUrl: "../../static/ysys/views/customer/register.html"
        })
        .state("forgatPwd",{
            url: "/forgatPwd",
            templateUrl: "../../static/ysys/views/customer/forgatPwd.html"
        })
        .state("yanzhengEmail",{
            url: "/yanzhengEmail/:email/:code",
            templateUrl: "../../static/ysys/views/customer/yanzhengEmail.html"
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
        .state('index.usermanager',{
            url: '/usermanager',
            templateUrl: '../../static/ysys/views/usermanager.html',
            
        })
        .state('index.createPro',{
            url: '/customer/createPro',
            templateUrl: '../../static/ysys/views/customer/createPro.html', 
        })
        .state('index.createSimple',{
            url: '/customer/createSimple',
            templateUrl: '../../static/ysys/views/customer/createSimple.html', 
        })
        .state("index.allProList",{
            url: "/customer/allProList",
            templateUrl: "../../static/ysys/views/customer/allProList.html"
        })
        .state("index.proManage",{
            url: "/customer/proManage",
            templateUrl: "../../static/ysys/views/customer/proManage.html"
        })
        .state("index.personalSetting",{
            url: "/customer/personalSetting",
            templateUrl: "../../static/ysys/views/customer/personalSetting.html"
        })
        .state("index.changePwd",{
            url: "/customer/changePwd",
            templateUrl: "../../static/ysys/views/customer/changePwd.html"
        })
        .state("index.changeEmail",{
            url: "/customer/changeEmail",
            templateUrl: "../../static/ysys/views/customer/changeEmail.html"
        })
        .state("index.svProvider",{
            url: "/svProvider/homePage",
            templateUrl: "../../static/ysys/views/svProvider/homePage.html"
        })
        .state("index.wuliuHome",{
            url: "/svProvider/wuliuHome",
            templateUrl: "../../static/ysys/views/svProvider/wuliuHome.html"
        })
        .state("index.svDetails",{
            url: "/svProvider/svDetails",
            templateUrl: "../../static/ysys/views/svProvider/svDetails.html"
        })
        .state("index.svProMan",{
            url: "/svProvider/svProMan",
            templateUrl: "../../static/ysys/views/svProvider/svProMan.html"
        })
        .state("index.svCreatePro",{
            url: "/svProvider/svCreatePro",
            templateUrl: "../../static/ysys/views/svProvider/svCreatePro.html"
        })
        .state("index.svProFlow",{
            url: "/svProvider/svProFlow",
            templateUrl: "../../static/ysys/views/svProvider/svProFlow.html"
        })
        .state("index.svSubPro",{
            url: "/svProvider/svSubPro",
            templateUrl: "../../static/ysys/views/svProvider/svSubPro.html"
        })
        .state("index.yunSWHome",{
            url: "/yunSW/yunSWHome",
            templateUrl: "../../static/ysys/views/yunSW/homePage.html"
        })
        .state("index.yswCreatePro",{
            url: "/yunSW/yswCreatePro",
            templateUrl: "../../static/ysys/views/yunSW/yswCreatePro.html"
        })
        .state("index.yswSubPro",{
            url: "/yunSW/yswSubPro",
            templateUrl: "../../static/ysys/views/yunSW/yswSubPro.html"
        })
        .state("index.yswCreateP",{
            url: "/yunSW/yswCreateP",
            templateUrl: "../../static/ysys/views/yunSW/yswCreateP.html"
        })
        .state("index.yswProMan",{
            url: "/yunSW/yswProMan",
            templateUrl: "../../static/ysys/views/yunSW/yswProMan.html"
        })
        .state("index.yswSysSet",{
            url: "/yunSW/yswSysSet",
            templateUrl: "../../static/ysys/views/yunSW/yswSysSet.html"
        })
        .state("index.yswUserMan",{
            url: "/yunSW/yswUserMan",
            templateUrl: "../../static/ysys/views/yunSW/yswUserMan.html"
        })
        .state("index.yswCreateUser",{
            url: "/yunSW/yswCreateUser",
            templateUrl: "../../static/ysys/views/yunSW/yswCreateUser.html"
        })
        .state("index.yswUserInfo",{
            url: "/yunSW/yswUserInfo",
            templateUrl: "../../static/ysys/views/yunSW/yswUserInfo.html"
        })
        .state("index.demo1LC",{
            url: "/yunSW/demo1LC",
            templateUrl: "../../static/ysys/views/yunSW/demo1LC.html"
        })
        .state("index.demo1Xiang",{
            url: "/yunSW/demo1Xiang",
            templateUrl: "../../static/ysys/views/yunSW/demo1Xiang.html"
        })
        .state("index.proDetailsCon",{
            url: "/yunSW/proDetailsCon",
            templateUrl: "../../static/ysys/views/yunSW/proDetailsCon.html"
        })
        .state("index.systemSettingPerson",{
            url: "/yunSW/systemSettingPerson",
            templateUrl: "../../static/ysys/views/yunSW/systemSettingPerson.html"
        })
        .state("index.demo1Create",{
            url: "/yunSW/demo1Create",
            templateUrl: "../../static/ysys/views/yunSW/demo1Create.html"
        })
        .state("index.downLoadReport",{
            url: "/yunSW/downLoadReport",
            templateUrl: "../../static/ysys/views/yunSW/downLoadReport.html"
        })
        .state("index.proData",{
            url: "/yunSW/proData",
            templateUrl: "../../static/ysys/views/yunSW/proData.html"
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
