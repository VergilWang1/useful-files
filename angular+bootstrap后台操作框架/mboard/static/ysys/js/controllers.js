/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
function MainCtrl($rootScope,$scope,myFactory) {
    this.userName = 'Example user';
    this.helloText = 'Welcome in SeedProject';
    this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';
   
};

function UsermgrCtrl() {
    this.tt ='ss';
};
function allProList($scope,$http,myFactory){
    $scope.panels = [
        {
            title: "标题",
            body: "内容",
            other: "其他"
        }
    ]
}
function question($scope){
    
}
// 注册
function register($scope,$http,myFactory){
    
}
// 登录
function login($rootScope,$scope,$http,myFactory){
    
}

angular
    .module('inspinia')
    .controller('MainCtrl', MainCtrl)
    .controller('UserMgrCtrl',UsermgrCtrl)
    .controller('allProList',allProList)
    .controller('register',register)
    .controller('login',login)
    .controller('question',question)




    // 测试
    .controller("testCon", function($scope,$http,myFactory){
                // 分片文件上传
                $scope.fileSlice = function(){
                    var blob = new Blob(["hellow"]);

                    var a = document.createElement("a");
                    a.href = window.URL.createObjectURL(blob);
                    a.download = "test0000.txt";
                    a.textContent = "download hellow";
                    document.body.appendChild(a);
                    a.click();
                }
                // 文件下载
                $scope.getExcel = function(){
                    $http({
                        url: "./testDownlod/12.png",
                        headers: {  
                            'Content-type': 'application/json'  
                        }, 
                        method: 'get',
                        responseType: 'arraybuffer'
                    }).then(function(response){
                        var blob = new Blob([response.data], {type: "application/vnd.ms-excel"});  
                        var objectUrl = URL.createObjectURL(blob);  
                        var a = document.createElement('a');  
                        document.body.appendChild(a);  
                        a.setAttribute('style', 'display:none');  
                        a.setAttribute('href', objectUrl);  
                        var filename="测试下载.png";  
                        a.setAttribute('download', filename);  
                        a.click();  
                        URL.revokeObjectURL(objectUrl); 
                    });
                }
                $scope.postCli = function(){
                    $http({
                        method: "POST",
                        url: "/add/",
                        headers: {  
                            'Content-type': 'application/json'  
                        }, 
                        data: 1,
                        transformResponse: function(data, headers){  
                            //MESS WITH THE DATA  
                            var response = {};  
                            response.data = data;  
                            return response;  
                        }
                    }).then(function(response){
                        console.log(response);
                    });
                }
                $scope.getCli = function(){
                    $http({
                        method: "GET",
                        url: "/add/"
                    }).then(function(response){
                        console.log(response);
                    });
                }
                $scope.putCli = function(){
                    $http({
                        method: "PUT",
                        url: "/add/",
                        data: {name:"name"}
                    }).then(function(response){
                        console.log(response);
                    });
                }
                $scope.deleteCli = function(){
                    $http({
                        method: "DELETE",
                        url: "/add/",
                        data: {name:"name"}
                    }).then(function(response){
                        console.log(response);
                    });
                }
                $scope.fileCli = function(){
                    console.log($scope.upload_files)
                    console.log(myFactory.formatFils($scope))
                    var datas = {
                            save: JSON.stringify({name:1}),
                            0: $scope.upload_files[0],
                            1: $scope.upload_files[1]
                        }
                    $http({
                        method: "POST",
                        url: "/add/",
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        data: datas,
                        transformRequest: function (data, headersGetter) {
                            var formData = new FormData();
                            angular.forEach(data, function (value, key) {
                                formData.append(key, value);
                            });

                            var headers = headersGetter();
                            delete headers['Content-Type'];

                            return formData;
                        }
                    }).then(function(response){
                        console.log(response);
                    });
                }
                $scope.base64Jia = function(){
                    console.log("加密");
                    var a = $(".base64Test").val();
                    var result = Base64.encode(a);
                    console.log(result);
                }
                $scope.base64Jie = function(){
                    console.log("解密");
                    var a = $(".base64Test").val();
                    var result = Base64.decode(a);
                    console.log(result);
                }
           })
