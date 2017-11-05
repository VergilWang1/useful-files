/**
 * INSPINIA - Responsive Admin Theme
 *
 */


/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'Y.SYS';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = 'Y.SYS | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
}

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function(){
                element.metisMenu();
            });
        }
    };
}

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            },
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                }
        }
    };
}

/**
 * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
 */
function iboxToolsFullScreen($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools_full_screen.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
            // Function for full screen
            $scope.fullscreen = function () {
                var ibox = $element.closest('div.ibox');
                var button = $element.find('i.fa-expand');
                $('body').toggleClass('fullscreen-ibox-mode');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                ibox.toggleClass('fullscreen');
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 100);
            }
        }
    };
}

/**
 * minimalizaSidebar - Directive for minimalize sidebar
*/
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 200);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 100);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
}


/**
 *
 * Pass all functions into module
 */

// proListHover
function proListHover(){
    return {
        restrict: "A",
        replace: "true",
        link: function(scope,element,attr){
            element.mouseover(function(){
                $(this).find(".allProlist-link").css("display","block");
            }).mouseout(function(){
                $(this).find(".allProlist-link").css("display","none");
            });
        }
    }
}

function userListHover(){
    return {
        restrict: "A",
        replace: "true",
        link: function(scope,element,attr){
            element.mouseover(function(){
                $(this).find(".allUserlist-link").css("display","block");
            }).mouseout(function(){
                $(this).find(".allUserlist-link").css("display","none");
            });
        }
    }
}
function proListClick(){
    return {
        restrict: "A",
        replace: "true",
        link: function(scope,element){
            element.click(function(){
                $(".KTproNum").find("span").html($(this).parent().parent().parent().parent().find(".proNum").find("span").html());
                $(".KTcreateDate").find("span").html($(this).parent().parent().parent().parent().find(".createDate").find("span").html());
                $(".TKHiddenID").find("span").html($(this).parent().parent().parent().parent().find(".hiddenID").find("span").html());
            });
        }
    }
}

function simpleInfo(){
    return {
        restrict: "A",
        replace: "true",
        link: function(scope,element){
            element.click(function(){
            //    console.log($(this).parent().parent().find(".hiddenID").find("span").html());
                // $(".KTproNum").find("span").html();
            });
        }
    }
}
// 文件上传的指令
function file(){
     return {
        scope: {
            file: '='
        },
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var file = event.target.files;
                scope.file = file ? file : undefined;
                scope.$apply();
            });
        }
    };
}
// 时间
function dateInp(){
    return {
        restrit: "A",
        replace: true,
        link: function(scope,ele){
            ele.on("blur",function(){
                // console.log($(this));
                var that = $(this)[0];
                setTimeout(function(){
                    scope.sampling_date = ele.val();
                    console.log(scope.sampling_date);
                    var timerDate = new Date(new Date(scope.sampling_date).getTime() + 86400000*$(".cycleDay").val());
                    var timerYear = timerDate.getFullYear();
                    var timerMonth = timerDate.getMonth() + 1;
                    var timerDay = timerDate.getDate();
                    $(".yujiDate").html("预计" + timerYear + "年" + timerMonth + "月" + timerDay　+ "日完成。")
                    // 修改时间
                    // console.log($("#dataInputProMan"));
                    if(that == $("#dataInputProMan")[0]){
                        console.log("dataInputProMan",$("#dataInputProMan").val());
                        // console.log(new Date(new Date().getTime() + 86400000));

                        // 判断必须在两天后取样
                        // if(new Date($("#dataInputProMan").val()).getTime() < new Date().getTime() + 86400000){
                        //     ele.val("");
                        //     scope.sampling_date = "";
                        //     alert("时间必须选择在两天后");
                        // }
                    }
                },300);
            })
        }
    }
}
// 个人设置头像
function uploadImage(){
    return {
        link: function(scope,ele,attr){
            ele.on("change",function(){
                console.log($(this));
                var fordate = new FormData();  //得到一个FormData对象：
                var fils = $(this).get(0).files[0];  //得到file对象
                fordate.append('pic',fils);  //用append方法添加键值对
                var srcc = window.URL.createObjectURL(fils);     //创建一个临时的路径对象
                $(".headerImg").attr({'src':srcc});  
            });
        }
    }
}
// 分页指令
function paginationCli(){
    return {
        restrict: "A",
        replace: true,
        require: 'ngModel',
        link: function(scope,ele,attr,ngModelCtrl){
            var allProItemPageIndex = null;

                // 分页按钮绑定点击事件
            ele.find("ul>li").click(function(){

                // 计算总共有几页
                allProItemPageIndex = Math.ceil(scope.allProarr.length / 6); 

                // 查看分页的数子
                var aNum = $(this).find("a").html()

                // 上一页
                if($(this).attr("value") == "prev"){
                    if(scope.proIndex > 1){
                        scope.proIndex -= 1;
                    }
                // 下一页
                }else if($(this).attr("value") == "next"){
                    if(scope.proIndex < allProItemPageIndex){
                        scope.proIndex += 1; 
                    }
                // 跳页按钮
                }else if($(this).attr("value") == "toPageBtn"){
                    console.log("输入",$(".toPage").find("a>input").val());
                    if($(".toPage").find("a>input").val() >=1 && $(".toPage").find("a>input").val() <= allProItemPageIndex){
                        scope.proIndex = parseInt($(".toPage").find("a>input").val());
                    }
                }
                $(".numPage").find("a>span:first").html(scope.proIndex);
                var num = (scope.proIndex - 1)*6;
                // 选择分页
                scope.proList = scope.allProarr.slice(num,num+6);
                console.log("proList",scope.proList);
                // ViewValue未改变时强制刷新
                scope.$apply(function(){
                    // 根据model刷新view
                    ngModelCtrl.$setViewValue(scope.proList);
                });
                console.log("项目共有"+allProItemPageIndex+"页,当前是"+scope.proIndex+"页");
            });
        }
    }
}
// 星级评分指令
function stars() {
    var directive = {
        restrict: 'AE',
        template: '<ul class="rating" ng-mouseleave="leave()">' +
                        '<li ng-repeat="star in stars" ng-class="star" ng-click="click($index + 1)" ng-mouseover="over($index + 1)">' +
                            '<i class="glyphicon glyphicon-star stars"></i>' +
                        '</li>' +
                    '</ul>',
        scope: {
            ratingValue: '=',
            hoverValue: '=',
            max: '=',
            onHover: '=',
            onLeave: '=',
        },
        controller: startsController,

        link: function(scope, elem, attrs) {
            elem.css("display", "block");
            elem.css("text-align", "center");
            var updateStars = function() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };
            updateStars();

            var updateStarsHover = function() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.hoverValue
                    });
                }
            };
            updateStarsHover();

            scope.$watch('ratingValue', function(oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
            scope.$watch('hoverValue', function(oldVal, newVal) {
                if (newVal) {
                    updateStarsHover();
                }
            });
        }


    };

    return directive;

    /** @ngInject */
    function startsController($scope) {
        // var vm = this;
        $scope.click = function(val) {
            $scope.ratingValue = val;
        };
        $scope.over = function(val) {
            $scope.hoverValue = val;
        };
        $scope.leave = function() {
            $scope.onLeave();
        }
    }
}
// 自定义过滤器　省略太长
function ellipsis(){
    return function(ele,num){
        if(ele.length >= Math.floor(num)){
            return ele.substr(0,Math.floor(num)) + "...";
        }else{
            return ele;
        }
    }
}

angular
    .module('inspinia')
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('iboxToolsFullScreen', iboxToolsFullScreen)
    .directive('proListHover', proListHover)
    .directive('userListHover',userListHover)
    .directive('proListClick', proListClick)
    .directive('file',file)
    .directive('dateInp',dateInp)
    .directive('paginationCli',paginationCli)
    .directive('uploadImage',uploadImage)
    .directive('stars',stars)
    .filter('ellipsis',ellipsis)