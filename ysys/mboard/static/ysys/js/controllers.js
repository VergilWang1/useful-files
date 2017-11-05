/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
// 主控制器
function MainCtrl($rootScope,$scope,myFactory) {
    this.projectName = '云生物';
    this.helloText = 'Welcome in SeedProject';
    this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

    // 第一次未登录加载
    $scope.locaStorageUserName ="请登录";
    

    // 根据子控制器检查是否登录
    $rootScope.$on("msg",function(e,msg){
        $scope.locaStorageUserName = msg;
    });

    // 刷新页面检测本地存储显示页面
    console.log("userInfo",myFactory.getObjStorage("userInfo"));
    myFactory.isLoginIN($scope);
    console.log(myFactory.getObjStorage("userInfo").head_img_addr);
    if(myFactory.getObjStorage("userInfo").head_img_addr){
        var arr = myFactory.getObjStorage("userInfo").head_img_addr.split("/");
        arr.shift();
        $scope.headerImg = "http://192.168.16.101:8000/" + arr.join("/");
    }else{
        $scope.headerImg = "../../static/ysys/images/avatar.png";
    }
    // 登录后显示页面
    $rootScope.$on("isLog",function(e,isLog){
        if(isLog){
            myFactory.isLoginIN($scope);
        }
    });

    $scope.backHomePage = function(){
        myFactory.toHomePage($scope);
    }

    if(myFactory.getObjStorage("userInfo").groupname == "物流商"){
        $scope.isWuliu = true;
    }
    
};
function UsermgrCtrl() {
    this.tt ='ss';
};
// 保存样本信息
function createSimple($scope,$http,myFactory){
    // 判断是否登录状态
    myFactory.checkLogin($scope);
    
    // 动态添加日期插件
    laydate.render({
        elem: '#dataInputProMan' //指定元素
    });
    // 默认地址选中
   $scope.defaultAddr = true;
    var id = myFactory.getStorage("proID");
    console.log("id",id);

    // 获取项目流程模板
    $http({
        method: "GET",
        url: "http://192.168.16.101:8000/service_provider/one_param/show_new_process_model",
        withCredentials: true,
    }).then(function(response){
        console.log(response);
        if(response.data.data){
            for(var i = 0;i < response.data.data.length;i++){
                if(response.data.data[i].length >= 20){
                    response.data.data[i].name = response.data.data[i].name.substr(0,20) + "...";
                }
            }
        }
        
        $scope.selectedProgress = response.data.data;
    },function(response){
        console.log(response);
    });
    // 获取项目信息
    $http({
        method: "GET",
        url: "http://192.168.16.101:8000/service_provider/two_params/"+id+"/show_project_detail",
        withCredentials: true,
    }).then(function(response){
        console.log(response);
        if(response.data.data[0]){
            $scope.simleInfos = response.data.data[0];
            $scope.content = $scope.simleInfos.content;
            $scope.hideSeleced = false;
            $scope.$watch("content",function(){
                $scope.hideSeleced = true;
            })
            console.log(response.data.data[0]['homogenization']);
            $scope.homegenization = response.data.data[0]['homogenization'];
            $scope.take_sample_date = response.data.data[0]['take_sample_date'];
            if($scope.simleInfos.test_index && $scope.simleInfos.species && $scope.simleInfos.sample_size){
                $scope.haxProInfo = true
            }else{
                $scope.haxProInfo = false;
            }
            // 获取样本信息
            $scope.tableInfos = response.data.data[0]['samples_obj'];
            if($scope.tableInfos[0]){
                $scope.haxSimpleInfo = true;
            }else{
                $scope.haxSimpleInfo = false;
            }

            if($scope.simleInfos.take_sample_date && $scope.simleInfos.sampling_address){
                $scope.hasSimpleDate = true;
            }else{
                $scope.hasSimpleDate = false;
            }
            // 默认取样地址
            $scope.$watch("defaultAddr",function(newBool,oldBool){
                if(newBool){
                    $scope.simleInfos.sampling_address = $scope.simleInfos.customer.addr
                }else{
                    $scope.simleInfos.sampling_address = "";
                }
            })
        }
    },function(response){
        console.log(response);
    });
    // 获取样本信息
    // $http({
    //     method: "GET",
    //     url: "http://192.168.16.101:8000/service_provider/two_params/"+id+"/show_project_samples",
    //     withCredentials: true,
    // }).then(function(response){
        // console.log(response);
        // $scope.tableInfos = response.data.data;
        // if($scope.tableInfos[0]){
        //     $scope.haxSimpleInfo = true;
        // }else{
        //     $scope.haxSimpleInfo = false;
        // }
    // },function(response){
    //     console.log(response);
    // });
    // 保存样本信息
    $scope.saveSimple = function(){
        console.log("getSimpleData",myFactory.getSimpleData($scope));
        console.log("proID",myFactory.getStorage("proID"));
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+myFactory.getStorage("proID")+"/save_project_info",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
            data : myFactory.getSimpleData($scope),
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
            if(response.data.success){
                // alert("保存成功");
                $scope.haxProInfo = true
            }else{
                $scope.haxProInfo = false
            }
        },function(response){
            console.log(response);
        });
    }
    
    // createSimple
    $scope.simlleAddrAndDate = function(){
        console.log(myFactory.getSimpleData2($scope));
        console.log("proID",myFactory.getStorage("proID"));
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+myFactory.getStorage("proID")+"/save_project_info",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
            data : myFactory.getSimpleData2($scope),
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
            if(response.data.success){
                // alert("保存成功");
                myFactory.toHomePage($scope);
                $scope.hasSimpleDate = true;
            }else{
                $scope.hasSimpleDate = false;
            }
        },function(response){
            console.log(response);
        });
        
    }
        // 下载样本模板
    $scope.downLoadMB = function(){
        // 文件下载
        $http({
            url: "../../static/ysys/file/sample_model.xls",
            // params: {addr: "service_provider/media/service_provider/upload/samples/sample_model.xls"},
            headers: {  
                'Content-type': 'application/json'  
            }, 
            method: 'get',
            responseType: 'arraybuffer'
        }).then(function(response){
            console.log(response);
            var blob = new Blob([response.data], {type: "application/vnd.ms-excel"});  
            var objectUrl = URL.createObjectURL(blob);  
            var a = document.createElement('a');  
            document.body.appendChild(a);  
            a.setAttribute('style', 'display:none');  
            a.setAttribute('href', objectUrl);  
            var filename="sample_model.xls";  
            a.setAttribute('download', filename);  
            a.click();  
            URL.revokeObjectURL(objectUrl); 
        });
    }

    // 导入EXIL
    $scope.$watch("upload_files",function(newFile,oldFile){
        if(newFile && newFile.length > 0){
            console.log(myFactory.formatFils($scope));
            console.log("proID",myFactory.getStorage("proID"));
            $scope.uploadFilesText = newFile[0].name;
            $(".uploadText").css("color","#000");
            $http({
                method: "POST",
                url: "http://192.168.16.101:8000/service_provider/two_params/"+myFactory.getStorage("proID")+"/upload_sample",
                // url: "http://192.168.16.103:8000/samples/",
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data :  myFactory.formatFils($scope),
                withCredentials: true,
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
                // $scope.sampleInfos = response.data;
                console.log(response);
                if(response.data.success){
                    $scope.tableInfos = response.data.data;
                    // alert("导入成功");
                    $scope.haxSimpleInfo = true;
                }else{
                    $scope.haxSimpleInfo = false;
                }
            },function(response){
                console.log(response);
            });
        }else{
            console.log(newFile);
            console.log(oldFile);
            $scope.uploadFilesText = "未选择任何文件";
            $(".uploadText").css("color","#ccc");
        }
       
    })
}
// 创建项目
function createPro($scope,$http,myFactory){
    // 判断是否登录状态
    myFactory.checkLogin($scope);

    // 获取项目流程模板
    $http({
        method: "GET",
        url: "http://192.168.16.101:8000/service_provider/one_param/show_new_process_model",
        withCredentials: true,
    }).then(function(response){
        console.log(response);
        $scope.selectedProgress = response.data.data;
    },function(response){
        console.log(response);
    });
    // 创建项目
    $scope.createPro = function(){
        console.log(myFactory.getData($scope));
        var id = myFactory.getObjStorage("userInfo").id;
        console.log("id",id);
        
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/one_param/create_project",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data : myFactory.getData($scope),
            withCredentials: true,
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
            if(response.data.success){
                // alert("创建成功");
                myFactory.toHomePage($scope);
            }
        },function(response){
            console.log(response);
        });
    }
}
// 客户项目列表
function allProList($scope,$http,myFactory){
    // 判断是否登录状态
    myFactory.checkLogin($scope);
    // $scope.hiddenPro = "false";
    // get所有项目
    var id = myFactory.getObjStorage("userInfo").id;
    console.log("id",id);
    $scope.proIndex = parseInt(myFactory.getStorage("proIndex")) || 1;
    console.log("proIndex",$scope.proIndex);
    pagesChange($scope.searchPro);
    function pagesChange(param){
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$scope.proIndex+"/show_projects",
            params: {q: param || ""},
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            for(var i in response.data.data.current_page_data){
                var timer = new Date(response.data.data.current_page_data[i]['create_date']).toLocaleString('chinese',{hour12:false});
                response.data.data.current_page_data[i]['create_date'] = timer.split("/").join("-");
                response.data.data.current_page_data[i]['progress'] = {
                    width: response.data.data.current_page_data[i]['process_value'] + "%" || 0 + "%"
                };
                if(response.data.data.current_page_data[i].process_obj.total_cycle){
                    var totalCycle = response.data.data.current_page_data[i].process_obj.total_cycle;
                    var cycleTime = new Date(new Date().getTime() + totalCycle * 24 * 60 *60 *1000).toLocaleDateString();
                    response.data.data.current_page_data[i]['totalCycleTime'] = cycleTime.split("/").join("-");
                }else{
                    response.data.data.current_page_data[i]['totalCycleTime'] = "未知";
                }
            }
            $scope.proList = response.data.data.current_page_data;
            
            $scope.allProItemPageIndex = response.data.data.num_pages;
            $(".numPage span:first").html($scope.proIndex);
            $(".numPage span:last").html($scope.allProItemPageIndex);
            myFactory.setStorage("proIndex",$scope.proIndex);
            callBackPage($scope);
        },function(response){
            console.log(response);
        });
    }
    // 分页函数
    function callBackPage($scope){
        var allProItemPageIn = 3;
        $scope.prevPage = function(){
            console.log("上一页");
            if($scope.proIndex > 1){
                $scope.proIndex -= 1;
            }
            pagesChange($scope.searchPro);
        };
        $scope.nextPage = function(){
            console.log("下一页");
            if($scope.proIndex < $scope.allProItemPageIndex){
                $scope.proIndex += 1; 
            }
            pagesChange($scope.searchPro);
        };
        $scope.toNumPage = function(){
            console.log("跳页");
            console.log("输入",$(".toPage").find("a>input").val());
            if($(".toPage").find("a>input").val() >=1 && $(".toPage").find("a>input").val() <= $scope.allProItemPageIndex){
                $scope.proIndex = parseInt($(".toPage").find("a>input").val());
            }
            pagesChange($scope.searchPro);
        };
    } 
    $scope.saveProIDDetail = function(){
        var proID = this.pro.id || $(event.target).parent().find(".hiddenID>span").html()
        console.log("proID",proID);
        myFactory.setStorage("proID",proID);
    }
    $scope.saveProID = function(){
        var id0 = this.pro.id;
        var proID = id0 || $(event.target).parent().parent().siblings(".hiddenID").find("span").html() || $(event.target).parent().siblings(".hiddenID").find("span").html();
        console.log("proID",proID);
        myFactory.setStorage("proID",proID);
    }

    // 重新备样
    $scope.againSimple = function(){
        var id = this.pro.id || $(event.target).parent().parent().siblings(".hiddenID").find("span").html() || $(event.target).parent().siblings(".hiddenID").find("span").html();
        console.log("id",id);
        myFactory.setStorage("proID",id);
        $("#TKAgainBY").modal();
        $scope.confirmTKAgain = function(){
            $('#TKAgainBY').modal('hide')
            $http({
                method: "POST",
                url: "http://192.168.16.101:8000/service_provider/two_params/"+id+"/reset_project",
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: JSON.stringify({inp: "search"}),
                withCredentials: true,
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
                if(response.data.success){
                    // alert("已经重新备样");
                    setTimeout(function(){
                        location.href = "#/index/customer/createSimple";
                    },500);
                }
            },function(response){
                console.log(response);
            });
        }
    }
    $scope.TKUploadPro = function(){
        var id0 = this.pro.id;
        var proID = id0 || $(event.target).parent().parent().siblings(".hiddenID").find("span").html() || $(event.target).parent().siblings(".hiddenID").find("span").html();
        console.log("proID",proID);
        myFactory.setStorage("proID",proID);
        location.href = "#/index/yunSW/proData";
    }
    // 搜索项目按钮
    $scope.searchProBtn = function(){
        console.log($scope.searchPro);
        $scope.proIndex = 1;
        pagesChange($scope.searchPro);
    }
    // 确认项目报告弹框
    $scope.TK1 = function(){
        console.log("项目id",$(".TKHiddenID").find("span").html());
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$(".TKHiddenID").find("span").html()+"/show_report",
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            if(response.data.data[0]){
                $scope.hasFile = true;
                $scope.fileAddr = response.data.data[0].addr;
                console.log($scope.fileAddr);
                $scope.fileName = $scope.fileAddr.split("/");
                $scope.fileName = $scope.fileName[$scope.fileName.length - 1];
                console.log("报告名字",$scope.fileName);
            }else{
                $scope.hasFile = false;
            }
        });
        
    }
    // 文件下载
    $scope.downLoad = function(){
        $http({
            url: "http://192.168.16.101:8000/service_provider/one_param/get_file",
            params: {addr: $scope.fileAddr},
            headers: {  
                'Content-type': 'application/json'  
            }, 
            method: 'GET',
            responseType: 'arraybuffer'
        }).then(function(response){
            var blob = new Blob([response.data], {type: "application/vnd.ms-excel"});  
            var objectUrl = URL.createObjectURL(blob);  
            var a = document.createElement('a');  
            document.body.appendChild(a);  
            a.setAttribute('style', 'display:none');  
            a.setAttribute('href', objectUrl);  
            a.setAttribute('download', $scope.fileName);  
            a.click();  
            URL.revokeObjectURL(objectUrl); 
        });
    }
    // 弹框提交
    $scope.TKConfirm = function(){
        console.log(myFactory.getTKProData($scope));
        console.log("项目id",$(".TKHiddenID").find("span").html());
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$(".TKHiddenID").find("span").html()+"/report_confirm",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: myFactory.getTKProData($scope), 
            withCredentials: true,
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
            history.go(0);
        },function(response){
            console.log(response);
        });
    }
    // 服务商评价
    // 星级评价星星的个数
    $scope.max = 5;
    $scope.svEvaCli = function(){
        $scope.service_provider_id = this.pro.service_provider_id;
        $scope.proId = this.pro.id || $(".TKHiddenID").find("span").html();
        console.log("服务商评价",$scope.proId);
        // choiceStars($scope.service_star)
        //星星等级评分
        $scope.service_star = 0;
        $scope.hoverVal = 0;
        $scope.onHover = function(val) {
            $scope.hoverVal = val;
        };
        $scope.onLeave = function() {
            $scope.hoverVal = $scope.service_star;
        }
        $scope.onChange = function(val) {
            $scope.service_star = val;
        }
    }
    $scope.TKSvEvaluate = function(){
        console.log(myFactory.getSvEvaData($scope));
        console.log("svId",$scope.service_provider_id);
        console.log("proId",$scope.proId);
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/three_params/"+$scope.proId+"/"+$scope.service_provider_id+"/save_evaluation",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: myFactory.getSvEvaData($scope), 
            withCredentials: true,
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
            if(response.data.success){
                // alert("已评价");
                history.go(0);
            }else{
                // alert("评价失败");
            }
        },function(response){
            console.log(response);
        });
    }
    // 物流评价
    $scope.wlEvaCli = function(){
        $scope.shipment_enterprise_id = this.pro.shipment_enterprise_id;
        $scope.proId = this.pro.id || $(".TKHiddenID").find("span").html();
        console.log("物流评价",$scope.proId);
        //星星等级评分
        $scope.logistics_star = 0;
        $scope.hoverVal = 0;
        $scope.onHover = function(val) {
            $scope.hoverVal = val;
        };
        $scope.onLeave = function() {
            $scope.hoverVal = $scope.logistics_star;
        }
        $scope.onChange = function(val) {
            $scope.logistics_star = val;
        }
    }
    $scope.TKWlEvaluate = function(){
        console.log(myFactory.getWlEvaData($scope));
        console.log("wlId",$scope.shipment_enterprise_id);
        console.log("proId",$scope.proId);
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/three_params/"+$scope.proId+"/"+$scope.shipment_enterprise_id+"/save_evaluation",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: myFactory.getWlEvaData($scope), 
            withCredentials: true,
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
            if(response.data.success){
                // alert("已评价");
                history.go(0);
            }else{
                // alert("评价失败");
            }
        },function(response){
            console.log(response);
        });
    }
}
// 项目管理
function proManage($scope,$http,myFactory,$filter){
    // 判断是否登录状态
    myFactory.checkLogin($scope);
    // 动态添加日期插件
    laydate.render({
        elem: '#dataInput' //指定元素
    });
    var id = myFactory.getStorage("proID");
    console.log("id",id);

    // 判断是管理员还是客户
    if(myFactory.getObjStorage("userInfo").groupname == "管理员"){
        $scope.showProDetails = true;
        $scope.isMana = true;
    }else if(myFactory.getObjStorage("userInfo").groupname == "服务商"){
        $scope.showProDetails = true;
        $scope.isMana = false;
    }else{
        $scope.showProDetails = false;
        $scope.isMana = false;
    }
    
    // 获取项目进展
    // $http({
    //     method: "GET",
    //     url: "http://192.168.16.101:8000/service_provider/two_params/"+id+"/show_project_process_detail",
    //     withCredentials: true,
    // }).then(function(response){
    //     // console.log(response);
    //     // for(var i in response.data.data){
    //     //     var timer1 = new Date(response.data.data[i]['date']).toLocaleString('chinese',{hour12:false});
    //     //     response.data.data[i]['date'] = timer1.split("/").join("-");
    //     // }
    //     // $scope.processDetail = response.data.data;
    //     // $scope.processDetail[$scope.processDetail.length-1].bg = {
    //     //     background: "#46aad1"
    //     // }
    //     // $scope.processDetail[$scope.processDetail.length-1].color = {
    //     //     color: "#46aad1"
    //     // }
        
    // },function(response){
    //     console.log(response);
    // });
    $("#collapseOne").collapse('show');
    var id = myFactory.getStorage("proID");
    console.log("proID",id);
    $http({
        method: "GET",
        url: "http://192.168.16.101:8000/service_provider/two_params/"+id+"/show_project_detail",
        withCredentials: true,
    }).then(function(response){
        console.log(response);
        if(response.data.data[0]){
            var detail_obj = response.data.data[0].detail_obj;
            for(var i in detail_obj){
                var timer1 = new Date(detail_obj[i]['date']).toLocaleString('chinese',{hour12:false});
                detail_obj[i]['date'] = timer1.split("/").join("-");
            }
            $scope.processDetail = detail_obj;
            $scope.processDetail[$scope.processDetail.length-1].bg = {
                background: "#46aad1"
            }
            $scope.processDetail[$scope.processDetail.length-1].color = {
                color: "#46aad1"
            }
            // 日期转换
            var timer = new Date(response.data.data[0]['create_date']).toLocaleString('chinese',{hour12:false});
            $scope.create_date = timer.split("/").join("-");
            $scope.simleInfos = response.data.data[0];
            $scope.take_sample_date = response.data.data[0]['take_sample_date'];

            $scope.serviceProvider = response.data.data[0].logistics_evaluation;
            $scope.shipmentEnterprise = response.data.data[0].service_provider_evaluation;
            //服务商星星等级评分
            console.log($scope.serviceProvider.stars);
            $scope.serviceStars = [];
            for(var i = 0;i < $scope.serviceProvider.stars;i++){
                $scope.serviceStars.push({a: 1});
            }
            
            //物流商星星等级评分
            console.log($scope.shipmentEnterprise.stars);
            $scope.logisticsStar = [];
            for(var i = 0;i < $scope.shipmentEnterprise.stars;i++){
                $scope.logisticsStar.push({a: 1});
            }

            // 项目进展的圈
            var process_obj_steps = response.data.data[0].process_obj.steps
            $scope.flowMenu = [
                {
                    name: "项目已创建"
                }
            ];
            if(response.data.data[0]['sampling_address']){
                $scope.flowMenu.push({
                    name: "取样等待"
                });
                var timeD = response.data.data[0]['take_sample_date'];
                var timeT = response.data.data[0]['take_sample_time'] || "08:00";
                var timerD = timeD +" "+ timeT;
                if(new Date(timerD).getTime() < new Date().getTime()){
                    $scope.flowMenu.push({
                        name: "运输中"
                    });
                }
            }
            var flowArr = [];
            var littleFlowArr = [];
            
            var steps = response.data.data[0].process_obj.steps;
            if(steps){
                for(var i = 0;i < steps.length;i++){
                    if(steps[i].cycle > 0 && steps[i].active){
                        littleFlowArr.push(steps[i]);
                        if(steps[i].running){
                            flowArr.push(steps[i]);
                        }
                    }
                }
            }
            if($scope.flowMenu.length >= 3){
                $scope.flowMenu = $scope.flowMenu.concat(flowArr);
                if(littleFlowArr.length > 0){
                    if(littleFlowArr[littleFlowArr.length - 1].complete){
                        $scope.flowMenu.push({
                            name: "项目完成",
                            hiddenFlow: true
                        });
                    }
                }
            }
             // 样本信息
            $scope.tableInfos = response.data.data[0].samples_obj;
        }
    },function(response){
        console.log(response);
    });
    
    // 查看项目流程
    $scope.progressModel = function(){
        if(!id){
            alert("请重新登录");
        }
    }

    // 下载文件
    $scope.downloadPro = function(){ 
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+id+"/download_project",
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            if(response.data.success){
                $scope.proFileUrl = response.data.data;
                $scope.fileName = $scope.proFileUrl.split("/");
                $scope.fileName = $scope.fileName[$scope.fileName.length - 1];
                console.log("报告名字",$scope.fileName);
                if($scope.proFileUrl){
                    console.log($scope.proFileUrl);
                    $http({
                        url: "http://192.168.16.101:8000/service_provider/one_param/get_file",
                        params: {addr: $scope.proFileUrl},
                        headers: {  
                            'Content-type': 'application/json'  
                        }, 
                        method: 'GET',
                        responseType: 'arraybuffer'
                    }).then(function(response){
                        // console.log(response);
                        var blob = new Blob([response.data], {type: "application/vnd.ms-excel"});  
                        var objectUrl = URL.createObjectURL(blob);  
                        var a = document.createElement('a');  
                        document.body.appendChild(a);  
                        a.setAttribute('style', 'display:none');  
                        a.setAttribute('href', objectUrl);  
                        a.setAttribute('download', $scope.fileName);  
                        a.click();  
                        URL.revokeObjectURL(objectUrl); 
                    });
                }else{
                    // alert("没有可下载的项目");
                }
            }
        },function(response){
            console.log(response);
        });
        
    }
    // 下载项目
    // $scope.downloadPro = function(){ 
    //     if($scope.proFileUrl){
    //         console.log($scope.proFileUrl);
    //         $http({
    //             url: "http://192.168.16.101:8000/service_provider/one_param/get_file",
    //             params: {addr: $scope.proFileUrl},
    //             headers: {  
    //                 'Content-type': 'application/json'  
    //             }, 
    //             method: 'GET',
    //             responseType: 'arraybuffer'
    //         }).then(function(response){
    //             var blob = new Blob([response.data], {type: "application/vnd.ms-excel"});  
    //             var objectUrl = URL.createObjectURL(blob);  
    //             var a = document.createElement('a');  
    //             document.body.appendChild(a);  
    //             a.setAttribute('style', 'display:none');  
    //             a.setAttribute('href', objectUrl);  
    //             a.setAttribute('download', $scope.fileName);  
    //             a.click();  
    //             URL.revokeObjectURL(objectUrl); 
    //         });
    //     }else{
    //         // alert("没有可下载的项目");
    //     }
    // }
}
// 服务商
function svProvider($scope,$http,myFactory){
    // 判断是否登录状态
    myFactory.checkLogin($scope);
    var id = myFactory.getObjStorage("userInfo").id;
    console.log("userid",id);
    if(myFactory.getObjStorage("userInfo").groupname == "物流商"){
        $scope.isWuliuSh = true;
    }
    console.log("proIndex",myFactory.getStorage("proIndex"));
    $scope.proIndex = parseInt(myFactory.getStorage("proIndex")) || 1;
    pagesChange($scope.searchPro);
    function pagesChange(param){
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$scope.proIndex+"/show_projects",
            params: {q: param || ""},
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            for(var i in response.data.data.current_page_data){
                var timer = new Date(response.data.data.current_page_data[i]['create_date']).toLocaleString('chinese',{hour12:false});
                response.data.data.current_page_data[i]['create_date'] = timer.split("/").join("-");
                response.data.data.current_page_data[i]['progress'] = {
                    width: response.data.data.current_page_data[i]['process_value'] + "%" || 0 + "%"
                };
            }
            $scope.proList = response.data.data.current_page_data;
            
            $scope.allProItemPageIndex = response.data.data.num_pages;
            $(".numPage span:first").html($scope.proIndex);
            $(".numPage span:last").html($scope.allProItemPageIndex);
            myFactory.setStorage("proIndex",$scope.proIndex);
            callBackPage($scope);
        },function(response){
            console.log(response);
        });
    }
    // 分页函数
    function callBackPage($scope){
        var allProItemPageIn = 3;
        $scope.prevPage = function(){
            console.log("上一页");
            if($scope.proIndex > 1){
                $scope.proIndex -= 1;
            }
            pagesChange($scope.searchPro);
        };
        $scope.nextPage = function(){
            console.log("下一页");
            if($scope.proIndex < $scope.allProItemPageIndex){
                $scope.proIndex += 1; 
            }
            pagesChange($scope.searchPro);
        };
        $scope.toNumPage = function(){
            console.log("跳页");
            console.log("输入",$(".toPage").find("a>input").val());
            if($(".toPage").find("a>input").val() >=1 && $(".toPage").find("a>input").val() <= $scope.allProItemPageIndex){
                $scope.proIndex = parseInt($(".toPage").find("a>input").val());
            }
            pagesChange($scope.searchPro);
        };
    }   
    $scope.saveProIDDetail = function(){
        var proID = this.pro.id || $(event.target).parent().find(".hiddenID>span").html()
        console.log("proID",proID);
        myFactory.setStorage("proID",proID);
    }
    $scope.saveProID = function(){
        var id0 = this.pro.id;
        var proID = id0 || $(event.target).parent().parent().siblings(".hiddenID").find("span").html() || $(event.target).parent().siblings(".hiddenID").find("span").html();
        console.log("proID",proID);
        myFactory.setStorage("proID",proID);
    }
    // 搜索按钮
    $scope.searchProBtn = function(){
        console.log($scope.searchPro);
        $scope.proIndex = 1;
        pagesChange($scope.searchPro);
    }

    // 查看项目详情
    $scope.seePro = function(){
        // 保存ID
        myFactory.setStorage("proID",$(event.target).siblings("ul").find(".hiddenID>span").html());
        console.log("id",myFactory.getStorage("proID"));
    }
    // 服务商项目确认报告弹框
    $scope.TK2 = function(){
        console.log("项目id",$(".TKHiddenID").find("span").html());
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$(".TKHiddenID").find("span").html()+"/show_report",
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            if(response.data.data[0]){
                $scope.hasFile = true;
                $scope.fileAddr = response.data.data[0].addr;
                console.log($scope.fileAddr);
                $scope.fileName = $scope.fileAddr.split("/");
                $scope.fileName = $scope.fileName[$scope.fileName.length - 1];
                console.log("报告名字",$scope.fileName);
            }else{
                $scope.hasFile = false;
            }
        });
    }
    $scope.TKUploadPro = function(){
        var id0 = this.pro.id;
        var proID = id0 || $(event.target).parent().parent().siblings(".hiddenID").find("span").html() || $(event.target).parent().siblings(".hiddenID").find("span").html();
        console.log("proID",proID);
        myFactory.setStorage("proID",proID);
        location.href = "#/index/yunSW/proData";
    }
    // 文件下载
    $scope.downLoad = function(){
        $http({
            url: "http://192.168.16.101:8000/service_provider/one_param/get_file",
            params: {addr: $scope.fileAddr},
            headers: {  
                'Content-type': 'application/json'  
            }, 
            method: 'get',
            responseType: 'arraybuffer'
        }).then(function(response){
            console.log(response);
            var blob = new Blob([response.data], {type: "application/vnd.ms-excel"});  
            var objectUrl = URL.createObjectURL(blob);  
            var a = document.createElement('a');  
            document.body.appendChild(a);  
            a.setAttribute('style', 'display:none');  
            a.setAttribute('href', objectUrl);  
            a.setAttribute('download', $scope.fileName);  
            a.click();  
            URL.revokeObjectURL(objectUrl); 
        });
    }
    // 监视文件变化
    $scope.$watch("upload_files",function(newFile,oldFile){
        if(newFile && newFile.length > 0){
            $scope.uploadFilesText = newFile[0].name;
            $(".uploadText").css("color","#000");
            $scope.hasUploadFile = true;
        }else{
            $scope.uploadFilesText = "未选择任何文件";
            $(".uploadText").css("color","#ccc");
            $scope.hasUploadFile = false;
        }
    })
    // 确认上传文件
    $scope.TKConfirm = function(){
        console.log("上传的数据",myFactory.getSvTKConfirmPro($scope));
        console.log(myFactory.getStorage("proID"));
        console.log($(".TKHiddenID").find("span").html());
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$(".TKHiddenID").find("span").html()+"/upload_report",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: myFactory.getSvTKConfirmPro($scope), 
            withCredentials: true,
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
            if(response.data.success){
                // alert("上传成功");
                history.go(0);
            }
        },function(response){
            console.log(response);
        });
    }
    // 分派项目流程
    $scope.TKProgress = function(){
        var new_process_id = this.pro.new_process_id;
        var content = this.pro.content;
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/service_provider/one_param/show_new_process_model",
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            $scope.selectedProgress = response.data.data;
            $scope.progressId = $scope.selectedProgress[0].id;
            for(var i = 0;i < response.data.data.length;i++){
                if(response.data.data[i].name == content){
                    $scope.progressId = response.data.data[i].id
                }
            }
        },function(response){
            console.log(response);
        });
    }
    $scope.TKConfirmProgress = function(){
        console.log("proID",$(".TKHiddenID").find("span").html());
        console.log("流程id",$scope.progressId);
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/three_params/"+$(".TKHiddenID").find("span").html()+"/"+$scope.progressId+"/set_project_new_process",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
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
            if(response.data){
                // alert("分派成功");
                history.go(0);
            }
        },function(response){
            console.log(response);
        });
    }
    // 修改周期
    $scope.TKChangeCycle = function(){
        console.log(this.pro.id);

        // 动态添加日期插件
        laydate.render({
            elem: '#dataInput6' //指定元素
        });
        $scope.$watch("cycle",function(){
            var timerDate = new Date(new Date($("#dataInput6").val()).getTime() + 86400000*$scope.cycle);
            var timerYear = timerDate.getFullYear();
            var timerMonth = timerDate.getMonth() + 1;
            var timerDay = timerDate.getDate();
            $(".yujiDate").html("预计" + timerYear + "年" + timerMonth + "月" + timerDay　+ "日完成。");
            if($scope.cycle && $scope.cycleData.name && !isNaN($scope.cycle)){
                $scope.canConfirm = false;
            }else{
                $scope.canConfirm = true;
            }
            if(!isNaN($scope.cycle)){
                $scope.isNumber = true;
            }else{
                $scope.isNumber = false;
            }
        })
        $scope.changeCycleProID = this.pro.id;
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/service_provider/one_param/show_current_step",
            params: {project_id: $scope.changeCycleProID},
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            $scope.cycleData = [];
            $scope.cycle = "";
            $("#dataInput6").val(new Date().toLocaleDateString().split("/").join("-"));
            $scope.start_time = "08:00"
            if(response.data.data[0]){
                $scope.cycleData = response.data.data[0];
                $scope.cycle = response.data.data[0].cycle;
            }
        },function(response){
            console.log(response);
        });
    }
    $scope.confirmChangeCycle = function(){
        console.log(myFactory.getChangeCycleData($scope));
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/one_param/save_new_process_step",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
            data:  myFactory.getChangeCycleData($scope),
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
            if(response.data.success){
                // alert("操作成功");
                pagesChange();
            }
        },function(response){
            console.log(response);
        });
    }
}
// 物流商首页
function wuliuHome($scope,$http,myFactory){
     // 判断是否登录状态
    myFactory.checkLogin($scope);
    var id = myFactory.getObjStorage("userInfo").id;
    console.log("userid",id);
    console.log("proIndex",myFactory.getStorage("proIndex"));
    $scope.proIndex = parseInt(myFactory.getStorage("proIndex")) || 1;
    pagesChange($scope.searchPro);
    function pagesChange(param){
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$scope.proIndex+"/show_projects",
            params: {q: param || ""},
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            for(var i in response.data.data.current_page_data){
                var timer = new Date(response.data.data.current_page_data[i]['create_date']).toLocaleString('chinese',{hour12:false});
                response.data.data.current_page_data[i]['create_date'] = timer.split("/").join("-");
                response.data.data.current_page_data[i]['progress'] = {
                    width: response.data.data.current_page_data[i]['process_value'] + "%" || 0 + "%"
                };
            }
            $scope.proList = response.data.data.current_page_data;
            
            $scope.allProItemPageIndex = response.data.data.num_pages;
            $(".numPage span:first").html($scope.proIndex);
            $(".numPage span:last").html($scope.allProItemPageIndex);
            myFactory.setStorage("proIndex",$scope.proIndex);
            callBackPage($scope);
        },function(response){
            console.log(response);
        });
    }
    // 分页函数
    function callBackPage($scope){
        var allProItemPageIn = 3;
        $scope.prevPage = function(){
            console.log("上一页");
            if($scope.proIndex > 1){
                $scope.proIndex -= 1;
            }
            pagesChange($scope.searchPro);
        };
        $scope.nextPage = function(){
            console.log("下一页");
            if($scope.proIndex < $scope.allProItemPageIndex){
                $scope.proIndex += 1; 
            }
            pagesChange($scope.searchPro);
        };
        $scope.toNumPage = function(){
            console.log("跳页");
            console.log("输入",$(".toPage").find("a>input").val());
            if($(".toPage").find("a>input").val() >=1 && $(".toPage").find("a>input").val() <= $scope.allProItemPageIndex){
                $scope.proIndex = parseInt($(".toPage").find("a>input").val());
            }
            pagesChange($scope.searchPro);
        };
    }   
    $scope.saveProIDDetail = function(){
        var proID = this.pro.id || $(event.target).parent().find(".hiddenID>span").html()
        console.log("proID",proID);
        myFactory.setStorage("proID",proID);
    }
    $scope.saveProID = function(){
        var id0 = this.pro.id;
        var proID = id0 || $(event.target).parent().parent().siblings(".hiddenID").find("span").html() || $(event.target).parent().siblings(".hiddenID").find("span").html();
        console.log("proID",proID);
        myFactory.setStorage("proID",proID);
    }
    // 搜索按钮
    $scope.searchProBtn = function(){
        console.log($scope.searchPro);
        $scope.proIndex = 1;
        pagesChange($scope.searchPro);
    }
}
// 服务商项目管理
function svProMan($scope,$http,myFactory){
}
// 服务商创建项目流程
function svCreatePro($scope,$http,myFactory){
}
// 服务商子流程
function svSubPro($scope,$http,myFactory){
}
// 服务商项目流程
function svProFlow($scope,$http,myFactory){
}
// 服务商项目流程详情
function svDetails($scope,$http,myFactory){
    // console.log(myFactory.getStorage("proID"));
    // // 当id存在时候get项目详情数据
    // if(myFactory.getStorage("proID")){
    //     $http({
    //         method: "GET",
    //         url: ""
    //     }).then(function(response){
    //         console.log(response);
    //     },function(response){
    //         console.log(response);
    //     });
    // }
    // $scope.proList = [
    //     {
    //         content: ['基因测序','基因测序','基因测序'],
    //         name:"基因测序实验流程",
    //         responsible: "我是项目负责人",
    //         phone: "我是联系方式",
    //         email: "我是电子邮件"
    //     }
    // ];
    // $scope.subInfo = [
    //     {
    //         name: "质检",
    //         start_state: "已收样",
    //         stop_state: "质检报告确认",
    //         update_state: "质检中",
    //         cycle: "5天",
    //         responsible: "负责人",
    //         phone: "联系方式",
    //         email: "电子邮件"
    //     }
    // ];
}
// 云生物
function yswHomePage($scope,$http,myFactory){
    // 判断是否登录状态
    myFactory.checkLogin($scope);
    // 获取所有云生物创建项目的信息
    var id = myFactory.getObjStorage("userInfo").id;
    console.log("id",id);
    // 第一页
    console.log("proIndex",myFactory.getStorage("proIndex"));
    $scope.proIndex = parseInt(myFactory.getStorage("proIndex")) || 1;
    pagesChange($scope.searchPro);
    function pagesChange(param){
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$scope.proIndex+"/show_projects",
            withCredentials: true,
            params: {q: param || ""}
        }).then(function(response){
            console.log(response);
            // 日期转换
            for(var i in response.data.data.current_page_data){
                var timer = new Date(response.data.data.current_page_data[i]['create_date']).toLocaleString('chinese',{hour12:false});
                response.data.data.current_page_data[i]['create_date'] = timer.split("/").join("-");
                // 进度条
                response.data.data.current_page_data[i]['progress'] = {
                    width: response.data.data.current_page_data[i]['process_value'] + "%" || 0 + "%"
                };
                if(response.data.data.current_page_data[i].process_obj.total_cycle){
                    var totalCycle = response.data.data.current_page_data[i].process_obj.total_cycle;
                    var cycleTime = new Date(new Date().getTime() + totalCycle * 24 * 60 *60 *1000).toLocaleDateString();
                    response.data.data.current_page_data[i]['totalCycleTime'] = cycleTime.split("/").join("-");
                }else{
                    response.data.data.current_page_data[i]['totalCycleTime'] = "未知";
                }
            }
            $scope.proList = response.data.data.current_page_data;
            // 分页、页码
            $scope.allProItemPageIndex = response.data.data.num_pages;
            $(".numPage span:first").html($scope.proIndex);
            $(".numPage span:last").html($scope.allProItemPageIndex);
            myFactory.setStorage("proIndex",$scope.proIndex);
            callBackPage($scope);
        },function(response){
            console.log(response);
        });
    }

    // 分页函数
    function callBackPage($scope){
        var allProItemPageIn = 3;
        $scope.prevPage = function(){
            console.log("上一页");
            if($scope.proIndex > 1){
                $scope.proIndex -= 1;
            }
            pagesChange($scope.searchPro);
        };
        $scope.nextPage = function(){
            console.log("下一页");
            if($scope.proIndex < $scope.allProItemPageIndex){
                $scope.proIndex += 1; 
            }
            pagesChange($scope.searchPro);
        };
        $scope.toNumPage = function(){
            console.log("跳页");
            console.log("输入",$(".toPage").find("a>input").val());
            if($(".toPage").find("a>input").val() >=1 && $(".toPage").find("a>input").val() <= $scope.allProItemPageIndex){
                $scope.proIndex = parseInt($(".toPage").find("a>input").val());
            }
            pagesChange($scope.searchPro);
        };
    }    
    
    $scope.saveProIDDetail = function(){
        var proID = this.pro.id || $(event.target).parent().find(".hiddenID>span").html()
        console.log("proID",proID);
        myFactory.setStorage("proID",proID);
    }
    $scope.saveProID = function(){
        var id0 = this.pro.id;
        var proID = id0 || $(event.target).parent().parent().siblings(".hiddenID").find("span").html() || $(event.target).parent().siblings(".hiddenID").find("span").html();
        console.log("proID",proID);
        myFactory.setStorage("proID",proID);
    }
    // 存在文件后显示
    $scope.$watch("upload_files",function(newFile,oldFile){
        if(newFile && newFile.length > 0){
            $scope.uploadFilesText = newFile[0].name;
            $(".uploadText").css("color","#000");
            $scope.hasUploadFile = true;
        }else{
            $scope.uploadFilesText = "未选择任何文件";
            $(".uploadText").css("color","#ccc");
            $scope.hasUploadFile = false;
        }
    })
    // 搜索项目
    $scope.searchProBtn = function(){
        console.log($scope.searchPro);
        $scope.proIndex = 1;
        pagesChange($scope.searchPro);
    }
    $scope.TKUpload = function(){
        console.log("项目id",$(".TKHiddenID").find("span").html());
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$(".TKHiddenID").find("span").html()+"/show_report",
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            if(response.data.data[0]){
                $scope.hasFile = true;
                $scope.fileAddr = response.data.data[0].addr;
                console.log($scope.fileAddr);
                $scope.fileName = $scope.fileAddr.split("/");
                $scope.fileName = $scope.fileName[$scope.fileName.length - 1];
                console.log("报告名字",$scope.fileName);
            }else{
                $scope.hasFile = false;
            }
        });
    }
    $scope.TKUploadPro = function(){
        var id0 = this.pro.id;
        var proID = id0 || $(event.target).parent().parent().siblings(".hiddenID").find("span").html() || $(event.target).parent().siblings(".hiddenID").find("span").html();
        console.log("proID",proID);
        myFactory.setStorage("proID",proID);
        location.href = "#/index/yunSW/proData";
    }
    // 文件下载
    $scope.downLoad = function(){
        $http({
            url: "http://192.168.16.101:8000/service_provider/one_param/get_file",
            params: {addr: $scope.fileAddr},
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
            a.setAttribute('download', $scope.fileName);  
            a.click();  
            URL.revokeObjectURL(objectUrl); 
        });
    }

    $scope.TKConfirm = function(){
        console.log("上传的数据",myFactory.getSvTKConfirmPro($scope));
        console.log($(".TKHiddenID").find("span").html());
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$(".TKHiddenID").find("span").html()+"/upload_report",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: myFactory.getSvTKConfirmPro($scope), 
            withCredentials: true,
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
            if(response.data.success){
                // alert("上传成功");
                history.go(0);
            }
        },function(response){
            console.log(response);
        });
    }
    // 核查报告
    $scope.TK2 = function(){
        console.log("项目id",$(".TKHiddenID").find("span").html());
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$(".TKHiddenID").find("span").html()+"/show_report",
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            if(response.data.data[0]){
                $scope.hasFile = true;
                $scope.fileAddr = response.data.data[0].addr;
                console.log($scope.fileAddr);
                $scope.fileName = $scope.fileAddr.split("/");
                $scope.fileName = $scope.fileName[$scope.fileName.length - 1];
                console.log("报告名字",$scope.fileName);
            }else{
                $scope.hasFile = false;
            }
        });
        
    }
    // 文件下载
    $scope.TK2downLoad = function(){
        $http({
            url: "http://192.168.16.101:8000/service_provider/one_param/get_file",
            params: {addr: $scope.fileAddr},
            headers: {  
                'Content-type': 'application/json'  
            }, 
            method: 'GET',
            responseType: 'arraybuffer'
        }).then(function(response){
            var blob = new Blob([response.data], {type: "application/vnd.ms-excel"});  
            var objectUrl = URL.createObjectURL(blob);  
            var a = document.createElement('a');  
            document.body.appendChild(a);  
            a.setAttribute('style', 'display:none');  
            a.setAttribute('href', objectUrl);  
            a.setAttribute('download', $scope.fileName);  
            a.click();  
            URL.revokeObjectURL(objectUrl); 
        });
    }
    
    // 查核弹框
    $scope.TKchecked = function(){
        console.log(myFactory.getYswTKCehckedData($scope));
        console.log("proID",$(".TKHiddenID").find("span").html());
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$(".TKHiddenID").find("span").html()+"/report_confirm",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data:  myFactory.getYswTKCehckedData($scope),
            withCredentials: true,
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
            if(response.data.success){
                console.log(response);
                // alert(response.data.message);
                history.go(0);
            }
        },function(response){
            console.log(response);
        });
    }
    // 项目确认报告
    $scope.TKconfirmReport = function(){
        console.log("项目id",$(".TKHiddenID").find("span").html());
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$(".TKHiddenID").find("span").html()+"/show_report",
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            if(response.data.data[0]){
                $scope.hasFile = true;
                $scope.fileAddr = response.data.data[0].addr;
                console.log($scope.fileAddr);
                $scope.fileName = $scope.fileAddr.split("/");
                $scope.fileName = $scope.fileName[$scope.fileName.length - 1];
                console.log("报告名字",$scope.fileName);
            }else{
                $scope.hasFile = false;
            }
        });
    }
    $scope.TKConfirmRepCli = function(){
        console.log(myFactory.getTKConfirmData($scope));
        console.log("项目id",$(".TKHiddenID").find("span").html());
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$(".TKHiddenID").find("span").html()+"/report_confirm",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: myFactory.getTKConfirmData($scope), 
            withCredentials: true,
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
            if(response.data.success){
                // alert("已经确认上传");
                history.go(0);
            }
        },function(response){
            console.log(response);
        });
    }
    // 弹框3　分派物流商
    $scope.TK3 = function(){
        // 动态添加日期插件
        laydate.render({
            elem: '#dataInputProMan' //指定元素
        });
        var shipment_enterprise_id = this.pro.shipment_enterprise_id;
        // 取样地址
        $scope.sampling_address = this.pro.sampling_address;
        $scope.service_provider_addr = this.pro.service_provider.addr;
        console.log("proID",$(".TKHiddenID").find("span").html());
        // 获取所有物流商
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/user_manage/one_param/get_target_group_users",
            params: {group_name: "物流商"},
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            $scope.selectLogis = response.data.data[0].id;
            $scope.shipment = response.data.data;
        },function(response){
            console.log(response);
        });
        // 获取时间
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$(".TKHiddenID").find("span").html()+"/show_project_detail",
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            if(response.data.data[0]){
                $scope.sampling_date = response.data.data[0].take_sample_date;
                $scope.sampling_time1 = response.data.data[0].take_sample_time || "8:00";
                $scope.sampling_time2 = response.data.data[0].accept_sample_time || "18:00";
            }
        },function(response){
            console.log(response);
        });
    }
    $scope.TKYswLogistics = function(){
        console.log(myFactory.getTKYswLogisData($scope));
        console.log("proID",$(".TKHiddenID").find("span").html());
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$(".TKHiddenID").find("span").html()+"/save_project_info",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
            data:  myFactory.getTKYswLogisData($scope),
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
            if(response.data.success){
                // alert("分派成功");
                history.go(0);
            }
        },function(response){
            console.log(response);
        });
    },
    // 弹框4 分派服务商
    $scope.TK4 = function(){
        // console.log(this);
        var service_provider_id = this.pro.service_provider_id;
        var new_process_id = this.pro.new_process_id;
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/user_manage/one_param/get_target_group_users",
            params: {group_name: "服务商"},
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            $scope.servicePV = response.data.data;
            $scope.logisticsPro = service_provider_id || $scope.servicePV[0].id;
        },function(response){
            console.log(response);
        });
        
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/service_provider/one_param/show_new_process_model",
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            $scope.servicePVprocess = response.data.data;
            $scope.logisticsSh = $scope.servicePVprocess[0].id;
        },function(response){
            console.log(response);
        });
        
    }
    $scope.TKLogisAllo = function(){
        console.log(myFactory.getTKLogisAlloData($scope));
        console.log("proID",$(".TKHiddenID").find("span").html());
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$(".TKHiddenID").find("span").html()+"/save_project_info",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
            data:  myFactory.getTKLogisAlloData($scope),
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
            if(response.data){
                // alert("分派成功");
                history.go(0);
            }
        },function(response){
            console.log(response);
        });
    }
    // 分派流程
    $scope.TKProgress = function(){
        var new_process_id = this.pro.new_process_id;
        var content = this.pro.content;
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/service_provider/one_param/show_new_process_model",
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            
            $scope.selectedProgress = response.data.data;
            for(var i = 0;i < response.data.data.length;i++){
                if(response.data.data[i].name == content){
                    $scope.progressId = response.data.data[i].id
                }
            }
        },function(response){
            console.log(response);
        });
    }
    $scope.TKConfirmProgress = function(){
        console.log("proID",$(".TKHiddenID").find("span").html());
        console.log("流程id",$scope.progressId);
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/three_params/"+$(".TKHiddenID").find("span").html()+"/"+$scope.progressId+"/set_project_new_process",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
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
            if(response.data){
                // alert("分派成功");
                history.go(0);
            }
        },function(response){
            console.log(response);
        });
    }
    // 客户分派
    $scope.TKkehu = function(){
        var customer_id = this.pro.customer_id;
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/user_manage/one_param/get_target_group_users",
            params: {
                group_name: '客户'
            },
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            $scope.kehuPV = response.data.data;
            $scope.logisticsPro = customer_id || $scope.kehuPV[0].id;
        },function(response){
            console.log(response);
        });
    }
    $scope.TKKehuAllo = function(){
        console.log(myFactory.getTKKehuAlloData($scope));
        console.log("proID",$(".TKHiddenID").find("span").html());
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$(".TKHiddenID").find("span").html()+"/save_project_info",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
            data:  myFactory.getTKKehuAlloData($scope),
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
            if(response.data.success){
                // alert("分派成功");
                history.go(0);
            }
        },function(response){
            console.log(response);
        });
    }
    // 确认收样
    $scope.TK5 = function(){

        // 动态添加日期插件
        laydate.render({
            elem: '#dataInput5' //指定元素
        });
        // 获取时间
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$(".TKHiddenID").find("span").html()+"/show_project_detail",
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            if(response.data.data[0]){
                $(".demo-input").val(response.data.data[0].accept_sample_date);
                $scope.sampling_date = $(".demo-input").val();
                $scope.sampling_time2 = response.data.data[0].accept_sample_time || "18:00";
            }
        },function(response){
            console.log(response);
        });
    }
    $scope.yswTKpConfirm = function(){
        console.log(myFactory.getTKpConfirmData($scope));
        console.log("id",$(".TKHiddenID").find("span").html());
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$(".TKHiddenID").find("span").html()+"/save_project_info",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
            data:  myFactory.getTKpConfirmData($scope),
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
            if(response.data.success){
                // alert("操作成功");
                history.go(0);
            }
        },function(response){
            console.log(response);
        });
    }
    // 修改周期
    $scope.TKChangeCycle = function(){
        console.log(this.pro.id);

        // 动态添加日期插件
        laydate.render({
            elem: '#dataInput6' //指定元素
        });
        $scope.$watch("cycle",function(){
            var timerDate = new Date(new Date($("#dataInput6").val()).getTime() + 86400000*$scope.cycle);
            var timerYear = timerDate.getFullYear();
            var timerMonth = timerDate.getMonth() + 1;
            var timerDay = timerDate.getDate();
            $(".yujiDate").html("预计" + timerYear + "年" + timerMonth + "月" + timerDay　+ "日完成。")
            if($scope.cycle && $scope.cycleData.name && !isNaN($scope.cycle)){
                $scope.canConfirm = false;
            }else{
                $scope.canConfirm = true;
            }
            if(!isNaN($scope.cycle)){
                $scope.isNumber = true;
            }else{
                $scope.isNumber = false;
            }
        })
        $scope.changeCycleProID = this.pro.id;
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/service_provider/one_param/show_current_step",
            params: {project_id: $scope.changeCycleProID},
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            $scope.cycleData = [];
            $scope.cycle = "";
            $("#dataInput6").val(new Date().toLocaleDateString().split("/").join("-"));
            $scope.start_time = "08:00"
            if(response.data.data[0]){
                $scope.cycleData = response.data.data[0];
                $scope.cycle = response.data.data[0].cycle;
            }
        },function(response){
            console.log(response);
        });
    }
    $scope.confirmChangeCycle = function(){
        console.log(myFactory.getChangeCycleData($scope));
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/one_param/save_new_process_step",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
            data:  myFactory.getChangeCycleData($scope),
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
            if(response.data.success){
                // alert("操作成功");
                pagesChange();
            }
        },function(response){
            console.log(response);
        });
    }
    // 删除项目弹框
    $scope.TKDeletePro = function(){
        console.log(this.pro.id);
        $scope.deleteProId = this.pro.id;
    }
    // 删除项目
    $scope.confirmDeletePro = function(){
        console.log(myFactory.getTKpDeleteProData($scope));
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+$scope.deleteProId+"/save_project_info",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
            data:  myFactory.getTKpDeleteProData($scope),
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
            if(response.data.success){
                // alert("已删除");
                pagesChange();
            }
        },function(response){
            console.log(response);
        });
    }
}
function yswCreateP($scope,$http,myFactory){
}
// 项目资料
function proData($scope,$http,myFactory){
     // 判断是否登录状态
    myFactory.checkLogin($scope);
    var id = myFactory.getStorage("proID");
    console.log("项目id",id);
    $http({
        method: "GET",
        url: "http://192.168.16.101:8000/service_provider/one_param/get_project_datas",
        withCredentials: true,
        params: {project_id: id}
    }).then(function(response){
        console.log(response);
        if(response.data.data[0]){
            // 日期转换
            for(var i in response.data.data){
                var timer = new Date(response.data.data[i]['date']).toLocaleString('chinese',{hour12:false});
                response.data.data[i]['date'] = timer.split("/").join("-");
            }
            $scope.proDataFiles = response.data.data;
        }else{
            $scope.hasFile = false;
        }
    });

    $scope.$watch("upload_files",function(newFile,oldFile){
        if(newFile && newFile.length > 0){
            $scope.uploadFilesText = newFile[0].name;
            $(".uploadText").css("color","#000");
            $scope.hasFile = true;
        }else{
            $scope.uploadFilesText = "未选择任何文件";
            $(".uploadText").css("color","#ccc");
            $scope.hasFile = false;
        }
    })
    $scope.$watch("remark",function(){
        if($scope.remark){
            $scope.hasRemark = true;
        }else{
            $scope.hasRemark = false;
        }
    })
    $scope.TKUploadProConfirm = function(){
        console.log(myFactory.getTKUploadData($scope));
        var id = myFactory.getStorage("proID")
        console.log("项目id",id);
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/two_params/"+id+"/upload_datas",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: myFactory.getTKUploadData($scope), 
            withCredentials: true,
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
            if(response.data.success){
                // alert("上传成功");
                history.go(0);
            }
        },function(response){
            console.log(response);
        });
    }
    // 项目资料下载
    $scope.downloadPro = function(){
        var fileAddr = this.pro.addr;
        var fileName = fileAddr.split("/");
        fileName = fileName[fileName.length - 1];
        $http({
            url: "http://192.168.16.101:8000/service_provider/one_param/get_file",
            params: {addr: fileAddr},
            headers: {  
                'Content-type': 'application/json'  
            }, 
            method: 'GET',
            responseType: 'arraybuffer'
        }).then(function(response){
            console.log(response);
            var blob = new Blob([response.data], {type: "application/vnd.ms-excel"});  
            var objectUrl = URL.createObjectURL(blob);  
            var a = document.createElement('a');  
            document.body.appendChild(a);  
            a.setAttribute('style', 'display:none');  
            a.setAttribute('href', objectUrl);  
            a.setAttribute('download', fileName);  
            a.click();  
            URL.revokeObjectURL(objectUrl); 
        });
    }
}
// 展示流程模板 
function demo1LC($scope,$http,myFactory){
    // 判断是否登录状态
    myFactory.checkLogin($scope);

    // if(!myFactory.isManage()){
    //     alert("不是管理员");
    //     location.href = "#/index/customer/login";

    //     return;
    // }
    // 获取模板
    getProgressModal();
    function getProgressModal(){
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/service_provider/one_param/show_new_process_model",
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            $scope.allDetails = response.data.data;
        });
    }
    
    

    $scope.detailsCli = function(){
        if(this.info.id || $(event.target)){
            var id = this.info.id || $(event.target).parent().parent().find(".LCid").find("span").html();
            console.log("模板id",id);
            myFactory.setStorage("LCid",id);
        }
    }

    // 删除模板弹框
    $scope.deleteDetailsCli = function(){
        $('#deleteDetail').modal('show');
        $scope.deleteDetailId = this.info.id;
    }
    // 删除模板
    $scope.confirmDeleteDetail = function(){
        var datas = {
            save: JSON.stringify([{
                active: false,
                id: $scope.deleteDetailId
            }])
        }
        console.log(datas);
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/one_param/save_new_process_model",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data:  datas,
            withCredentials: true,
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
            getProgressModal();
        },function(response){
            console.log(response);
        });
    }
}
// 创建流程模板
function demo1Create($scope,$http,myFactory){
    // 判断是否登录状态
    myFactory.checkLogin($scope);
    $scope.proDetail = "默认模板";
    $scope.allDetails = [
        {
            // active: true,
            cycle: 5,
            name: "质检",
            email_content: "我是邮件内容",
            message_content: "我是短信内容",
            // process_model_id: 1,
            remark: "我是备注",
            send_email: true,
            send_message: false,
            service_provider: true,
            shipment_enterprise: true,
            customer: true,
             yunbio: true
        },{
            // active: true,
            cycle: 5,
            name: "预实验",
            email_content: "我是邮件内容",
            message_content: "我是短信内容",
            // process_model_id: 1,
            remark: "我是备注",
            send_email: true,
            send_message: false,
            service_provider: true,
            shipment_enterprise: true,
            customer: true,
            yunbio: true
        },{
            // active: true,
            cycle: 5,
            name: "正式实验",
            email_content: "我是邮件内容",
            message_content: "我是短信内容",
            // process_model_id: 1,
            remark: "我是备注",
            send_email: true,
            send_message: false,
            service_provider: true,
            shipment_enterprise: true,
            customer: true,
            yunbio: true
        }
    ];

    // 删除步骤
    $scope.deleteMBBZ = function(){
        console.log($scope.allDetails);
        for(var i = 0;i < $scope.allDetails.length;i++){
            console.log($scope.allDetails[i].name);
            if($scope.allDetails[i].name == this.info.name){
                $scope.allDetails.splice(i,1);
            }
        }
    }
    $scope.addDetail = function(){
        // var detailsId = $scope.allDetails.length + 1;
        $scope.allDetails.push({
            // active: true,
            cycle: 5,
            name: "步骤名称" + ($scope.allDetails.length + 1),
            email_content: "我是邮件内容",
            message_content: "我是短信内容",
            // id: detailsId,
            // process_model_id: 1,
            remark: "我是备注",
            send_email: true,
            send_message: false,
            service_provider: true,
            shipment_enterprise: true,
            customer: true,
            yunbio: true
        });
    }
    $scope.createTomplate = function(){

        var datas = {save: JSON.stringify($scope.allDetails)}
        var datas1 = {save: JSON.stringify([{
            name: $scope.proDetail
        }])}
        console.log("datas",datas);
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/one_param/create_new_process_model",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data:  datas1,
            withCredentials: true,
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
            callBack(response);
        },function(response){
            console.log(response);
        });
        // 创建模板流程获取id后创建步骤模板
        function callBack(response){
            var id = response.data.data[0].id;
            console.log("id",id);
            if(id){
                $http({
                    method: "POST",
                    url: "http://192.168.16.101:8000/service_provider/two_params/"+id+"/create_new_process_step_model",
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    data:  datas,
                    withCredentials: true,
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
                    location.href = "#/index/yunSW/demo1LC";
                },function(response){
                    console.log(response);
                });
            }
        }
    }
}  
// 修改保存流程模板
function demo1Xiang($scope,$http,myFactory){
    // 判断是否登录状态
    myFactory.checkLogin($scope);
    var id = myFactory.getStorage("LCid");
    console.log("id",id);
    $http({
        method: "GET",
        url: "http://192.168.16.101:8000/service_provider/two_params/"+id+"/show_new_process_step_model",
        withCredentials: true,
    }).then(function(response){
        console.log(response);
        $scope.allDetails = response.data.data;
    });
    $http({
        method: "GET",
        url: "http://192.168.16.101:8000/service_provider/two_params/"+id+"/show_new_process_model_detail",
        withCredentials: true,
    }).then(function(response){
        console.log(response);
        $scope.proDetail = response.data.data[0].name;
    });
    // 删除步骤
    $scope.deleteMBBZ = function(){
        console.log($scope.allDetails);
        for(var i = 0;i < $scope.allDetails.length;i++){
            console.log($scope.allDetails[i].id);
            if($scope.allDetails[i].id == this.info.id){
                $scope.allDetails[i].active = false;
            }
        }
        // $scope.allDetails.splice(this.info - 1,1);
        // console.log($scope.allDetails);
    }
    
    //    保存修改的流程
    $scope.saveTomplate = function(){
        var datas = {save: JSON.stringify($scope.allDetails)}
        var datas1 = {save: JSON.stringify([{
            name: $scope.proDetail,
            id: id
        }])}
        console.log("datas",datas);
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/one_param/save_new_process_model",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data:  datas1,
            withCredentials: true,
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
            // history.go(0);
        },function(response){
            console.log(response);
        });
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/one_param/save_new_process_step_model",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data:  datas,
            withCredentials: true,
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
            // history.go(0);
            location.href = "#/index/yunSW/demo1LC";
        },function(response){
            console.log(response);
        });
    }
         
}
// 项目详情
function proDetailsCon($scope,$http,myFactory){
    // 判断是否登录状态
    myFactory.checkLogin($scope);
    var id = myFactory.getStorage("proID");
    console.log("id",id);
    // 判断是管理员还是服务商
    console.log(myFactory.getObjStorage("userInfo"));
    if(myFactory.getObjStorage("userInfo").groupname == "服务商"){
        $scope.manageQX = false;
        console.log("服务商");
    }else if(JSON.parse(myFactory.getStorage("userInfo")).groupname == "管理员"){
        $scope.manageQX = true;
        console.log("管理员");
    }
    
    $http({
        method: "GET",
        url: "http://192.168.16.101:8000/service_provider/two_params/"+id+"/show_new_process_step",
        withCredentials: true,
    }).then(function(response){
        console.log(response);
        $scope.allDetails = response.data.data;
    });
    $http({
        method: "GET",
        url: "http://192.168.16.101:8000/service_provider/two_params/"+id+"/show_new_process_detail",
        withCredentials: true,
    }).then(function(response){
        console.log(response);
        $scope.proDetail = response.data.data;
    });
    
    //    保存修改的流程
    $scope.saveTomplate = function(){
        var datas = {save: JSON.stringify($scope.allDetails)}
        var datas1 = {save: JSON.stringify($scope.proDetail)}
        console.log("datas",datas);
        console.log("datas1",datas1);
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/one_param/save_new_process",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data:  datas1,
            withCredentials: true,
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
        },function(response){
            console.log(response);
        });
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/one_param/save_new_process_step",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data:  datas,
            withCredentials: true,
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
            location.href = "#/index/yunSW/yunSWHome";
        },function(response){
            console.log(response);
        });
    }
}
// 系统设置
function yswSysSet($scope,$http,myFactory){
    // 判断是否登录状态

    
    // $http({
    //     method: "POST",
    //     url: "http://192.168.16.101:8000/service_provider/three_params/"+$(".TKHiddenID").find("span").html()+"/"+$scope.logisticsSh+"/set_project_new_process",
    //     headers: {
    //         'Content-Type': 'multipart/form-data'
    //     },
    //     withCredentials: true,
    //     data:  myFactory.getTKLogisAlloData($scope),
    //     transformRequest: function (data, headersGetter) {
    //         var formData = new FormData();
    //         angular.forEach(data, function (value, key) {
    //             formData.append(key, value);
    //         });

    //         var headers = headersGetter();
    //         delete headers['Content-Type'];

    //         return formData;
    //     }
    // }).then(function(response){
    //     console.log(response);
    // },function(response){
    //     console.log(response);
    // });
    // myFactory.checkLogin($scope);
    // $scope.infos = [
    //     {
    //         test1: "客户",
    //         test2: "云生物",
    //         test3: "【云生物】【项目编号260250783】取样等待中 客户姓名手机号",
    //         test4: "等待取样",
    //         test5: "无",
    //         test6: "触发时"
    //     }
    // ];
}
// 云生物用户管理
function yswUserMan($scope,$http,myFactory){
    // 判断是否登录状态
    myFactory.checkLogin($scope);
    // 获取所有用户信息
    $scope.proIndex = 1;
    $http({
        method: "GET",
        url: "http://192.168.16.101:8000/user_manage/one_param/get_groups",
        withCredentials: true,
    }).then(function(response){
        console.log(response);
        if(response.data.success){
            $scope.groupCode = [];
            for(var i = 0;i < response.data.data.length;i++){
                if(i >= 1 ){
                    $scope.groupCode[i - 1] = response.data.data[i];
                }
            }
            $scope.group = $scope.groupCode[0].id;
            $scope.$watch("group",function(newGroup,oldGroup){
                if(newGroup == "8"){
                    $scope.keHuUser = true;
                }else{
                    $scope.keHuUser = false;
                }
                console.log(newGroup);
                for(var i = 0;i < $scope.groupCode.length;i++){
                    if($scope.groupCode[i].id == $scope.group){
                        $scope.group_name = $scope.groupCode[i].name;
                    }
                }
                $scope.proIndex = 1;
                $scope.searchUser = "";
                pagesChange($scope.group_name,$scope.searchUser);
            });
        }
    });
    function pagesChange(group_name,param){
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/user_manage/one_param/get_target_users",
            params: {
                    group_name: group_name,
                    q: param || "",
                    page_num: $scope.proIndex
            },
            withCredentials: true,
        }).then(function(response){
            console.log(response);
            if(response.data.success){
                for(var i = 0;i < response.data.data.current_page_data.length;i++){
                    if(!response.data.data.current_page_data[i]['head_img_addr']){
                        response.data.data.current_page_data[i]['head_img_addr'] = "../../static/ysys/images/avatar.png";
                    }else{
                        var arr = response.data.data.current_page_data[i]['head_img_addr'].split("/");
                        arr.shift();
                        response.data.data.current_page_data[i]['head_img_addr'] = "http://192.168.16.101:8000/" + arr.join("/");
                    }
                }
                $scope.userList = response.data.data.current_page_data;
                // 分页、页码
                $scope.allProItemPageIndex = response.data.data.num_pages;
                $(".numPage span:first").html($scope.proIndex);
                $(".numPage span:last").html($scope.allProItemPageIndex);
                callBackPage($scope);
            }
        },function(response){
            console.log(response);
        });
    }

    // 分页函数
    function callBackPage($scope){
        var allProItemPageIn = 3;
        $scope.prevPage = function(){
            console.log("上一页");
            if($scope.proIndex > 1){
                $scope.proIndex -= 1;
            }
            pagesChange($scope.group_name,$scope.searchUser);
        };
        $scope.nextPage = function(){
            console.log("下一页");
            if($scope.proIndex < $scope.allProItemPageIndex){
                $scope.proIndex += 1; 
            }
            pagesChange($scope.group_name,$scope.searchUser);
        };
        $scope.toNumPage = function(){
            console.log("输入",$(".toPage").find("a>input").val());
            if($(".toPage").find("a>input").val() >=1 && $(".toPage").find("a>input").val() <= $scope.allProItemPageIndex){
                $scope.proIndex = parseInt($(".toPage").find("a>input").val());
            }
            pagesChange($scope.group_name,$scope.searchUser);
        };
    } 
    // 搜索
    $scope.searchUserBtn = function(){
        console.log($scope.searchUser);
        $scope.proIndex = 1;
        pagesChange($scope.group_name,$scope.searchUser);
    }
    // 查看用户信息
    $scope.toUserInfo = function(){
        var userObj = this.userInfo;
        userObj.groupId = $scope.group;
        userObj.groupname = $scope.group_name
        myFactory.setObjStorage("checkUserInfo",userObj);
    }
}
// 云生物查看用户项目
function yswProMan($scope,$http,myFactory){
    // 判断是否登录状态
    myFactory.checkLogin($scope);
    // 获取所有云生物创建项目的信息
    var checkUserId = myFactory.getObjStorage("checkUserInfo").id;
    console.log("checkUserId",checkUserId);
    // 第一页
    console.log("yswProIndex",myFactory.getStorage("yswProIndex"));
    $scope.yswProIndex = parseInt(myFactory.getStorage("yswProIndex")) || 1;
    pagesChange($scope.searchPro);
    function pagesChange(param){
        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/service_provider/one_param/get_user_projects",
            withCredentials: true,
            params: {
                user_id: checkUserId,
                q: param || "",
                page_num: $scope.yswProIndex
            }
        }).then(function(response){
            console.log(response);
            // 日期转换
            for(var i in response.data.data.current_page_data){
                var timer = new Date(response.data.data.current_page_data[i]['create_date']).toLocaleString('chinese',{hour12:false});
                response.data.data.current_page_data[i]['create_date'] = timer.split("/").join("-");
                 // 进度条
                 response.data.data.current_page_data[i]['progress'] = {
                    width: response.data.data.current_page_data[i]['process_value'] + "%" || 0 + "%"
                };
                if(response.data.data.current_page_data[i].process_obj.total_cycle){
                    var totalCycle = response.data.data.current_page_data[i].process_obj.total_cycle;
                    var cycleTime = new Date(new Date().getTime() + totalCycle * 24 * 60 *60 *1000).toLocaleDateString();
                    response.data.data.current_page_data[i]['totalCycleTime'] = cycleTime.split("/").join("-");
                }else{
                    response.data.data.current_page_data[i]['totalCycleTime'] = "未知";
                }
            }
            $scope.proList = response.data.data.current_page_data;
            // 分页、页码
            $scope.allProItemPageIndex = response.data.data.num_pages;
            $(".numPage span:first").html($scope.yswProIndex);
            $(".numPage span:last").html($scope.allProItemPageIndex);
            myFactory.setStorage("yswProIndex",$scope.yswProIndex);
            callBackPage($scope);
        },function(response){
            console.log(response);
        });
    }

    // 分页函数
    function callBackPage($scope){
        var allProItemPageIn = 3;
        $scope.prevPage = function(){
            console.log("上一页");
            if($scope.yswProIndex > 1){
                $scope.yswProIndex -= 1;
            }
            pagesChange($scope.searchPro);
        };
        $scope.nextPage = function(){
            console.log("下一页");
            if($scope.yswProIndex < $scope.allProItemPageIndex){
                $scope.yswProIndex += 1; 
            }
            pagesChange($scope.searchPro);
        };
        $scope.toNumPage = function(){
            console.log("跳页");
            console.log("输入",$(".toPage").find("a>input").val());
            if($(".toPage").find("a>input").val() >=1 && $(".toPage").find("a>input").val() <= $scope.allProItemPageIndex){
                $scope.yswProIndex = parseInt($(".toPage").find("a>input").val());
            }
            pagesChange($scope.searchPro);
        };
    }    
    
    $scope.saveProIDDetail = function(){
        var proID = this.pro.id || $(event.target).parent().find(".hiddenID>span").html()
        console.log("proID",proID);
        myFactory.setStorage("proID",proID);
    }
    $scope.saveProID = function(){
        var id0 = this.pro.id;
        var proID = id0 || $(event.target).parent().parent().siblings(".hiddenID").find("span").html() || $(event.target).parent().siblings(".hiddenID").find("span").html();
        console.log("proID",proID);
        myFactory.setStorage("proID",proID);
    }

    // 搜索项目
    $scope.searchProBtn = function(){
        console.log($scope.searchPro);
        $scope.yswProIndex = 1;
        pagesChange($scope.searchPro);
    }
}
// 云生物创建用户
function yswCreateUser($scope,$http,myFactory){
    // // 判断是否登录状态
    // myFactory.checkLogin($scope);
    // // 发送创建用户信息
    // $scope.createUser = function(){
    //     console.log(myFactory.getCreateUserData($scope));
    //     $http({
    //         method: "POST",
    //         url: "/add/",
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         },
    //         data:  myFactory.getCreateUserData($scope),
    //         transformRequest: function (data, headersGetter) {
    //             var formData = new FormData();
    //             angular.forEach(data, function (value, key) {
    //                 formData.append(key, value);
    //             });

    //             var headers = headersGetter();
    //             delete headers['Content-Type'];

    //             return formData;
    //         }
    //     }).then(function(response){
    //         console.log(response);
    //     },function(response){
    //         console.log(response);
    //     });
    // }
}
// 云生物里面查看用户信息
function yswUserInfo($scope,$http,myFactory){
    // 判断是否登录状态
    myFactory.checkLogin($scope);
    console.log("checkUserInfo",myFactory.getObjStorage("checkUserInfo"));
    // 判断客户隐藏总览信息
    if(myFactory.getObjStorage("checkUserInfo").groupname == "客户"){
        $scope.hideKeHuInfos = true;
    }else{
        $scope.hideKeHuInfos = false;
    }
    // get信息
    $http({
        method: "GET",
        url: "http://192.168.16.101:8000/user_manage/one_param/get_groups",
        withCredentials: true,
    }).then(function(response){
        console.log(response);
        if(response.data.success){
            $scope.groupCode = response.data.data;
            $scope.groupId = myFactory.getObjStorage("checkUserInfo").groupId;
            $scope.userInfoDetail = myFactory.getObjStorage("checkUserInfo");
        }
    });
    var userId = myFactory.getObjStorage("checkUserInfo").id;
    $http({
        method: "GET",
        url: "http://192.168.16.101:8000/user_manage/one_param/get_user_projects_info",
        params: {user_id: userId},
        withCredentials: true,
    }).then(function(response){
        console.log(response);
        if(response.data.success){
            $scope.userProInfos = response.data.data
        }
    });
}
// 获取下载报告
function downLoadReport($scope,$http,myFactory){
    // 判断是否登录状态
    myFactory.checkLogin($scope);

    var id = myFactory.getStorage("proID");
    console.log("id",id);

    // 获取项目下载地址
    $http({
        method: "GET",
        url: "http://192.168.16.101:8000/service_provider/two_params/"+id+"/show_report",
        params: {get_all: true},
        withCredentials: true,
    }).then(function(response){
        console.log(response);
        if(response.data.success){
            for(var i in response.data.data){
                var timer = new Date(response.data.data[i]['date']).toLocaleString('chinese',{hour12:false});
                response.data.data[i]['date'] = timer.split("/").join("-");
            }
            $scope.proFileInfo = response.data.data;
        }
    },function(response){
        console.log(response);
    });
    // 下载项目
    $scope.downloadPro = function(){ 
        console.log($scope.proFileInfo);
        if($scope.proFileInfo){
            var fileAddr = this.pro.addr
            var fileName = this.pro.addr.split("/");
            fileName = fileName[fileName.length - 1];
            console.log("地址",fileAddr);
            console.log("报告名字",fileName);
            $http({
                url: "http://192.168.16.101:8000/service_provider/one_param/get_file",
                params: {addr: fileAddr},
                headers: {  
                    'Content-type': 'application/json'  
                }, 
                method: 'GET',
                responseType: 'arraybuffer'
            }).then(function(response){
                var blob = new Blob([response.data], {type: "application/vnd.ms-excel"});  
                var objectUrl = URL.createObjectURL(blob);  
                var a = document.createElement('a');  
                document.body.appendChild(a);  
                a.setAttribute('style', 'display:none');  
                a.setAttribute('href', objectUrl);  
                a.setAttribute('download', fileName);  
                a.click();  
                URL.revokeObjectURL(objectUrl); 
            });
        }else{
            alert("没有可下载的项目");
        }
    }
}
// 个人设置
function personnalSetting($scope,$http,myFactory){
    // 判断是否登录状态
    myFactory.checkLogin($scope);
    // 获取用户信息
    console.log("本地储存",myFactory.getObjStorage("userInfo"));
    var id = myFactory.getObjStorage("userInfo").id;
    console.log("id",id);
    $http({
        method: "GET",
        url: "http://192.168.16.101:8000/user_manage/one_param/get_user_setting",
        withCredentials: true,
    }).then(function(response){
        console.log(response);  
        if(response.data.success){
            $scope.phone = myFactory.getObjStorage("userInfo").username;
            $scope.email = myFactory.getObjStorage("userInfo").email;
            if(!response.data.data[0].head_img_addr){
                response.data.data[0].head_img_addr = "../../static/ysys/images/avatar.png";
            }else{
                var arr = response.data.data[0].head_img_addr.split("/");
                arr.shift();
                response.data.data[0].head_img_addr = "http://192.168.16.101:8000/" + arr.join("/");
            }
            $scope.userInfo = response.data.data[0];
        }
    },function(response){
        console.log(response);
    });

        // 用户修改保存信息
    $scope.setPersonInfo = function(){
        console.log(myFactory.getComUserInfo($scope));
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/user_manage/one_param/save_user_setting",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: myFactory.getComUserInfo($scope), 
            withCredentials: true,
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
            console.log($scope.upload_files);
            if(response.data.success){
                var obj = myFactory.getObjStorage("userInfo");
                obj.name = $scope.userInfo.name;
                console.log("userInfo",myFactory.getObjStorage("userInfo"));
                // alert("修改成功");
                history.go(0);
            }
        },function(response){
            console.log(response);
        });
    }
}
// 发邮件短信系统设置
function systemSettingPerson($scope,$http,myFactory){
    // 判断是否登录状态
    myFactory.checkLogin($scope);
    $http({
        method: "GET",
        url: "http://192.168.16.101:8000/service_provider/one_param/show_system_contact",
        withCredentials: true,
    }).then(function(response){
        console.log(response);
        // $scope.proList = response.data;
        $scope.sysTableInfos = response.data.data;
        for(var i = 0;i < $scope.sysTableInfos.length;i++){
            if(i == 0){
                $scope.sysTableInfos[i].canChange = true;
            }else if(i == 1){
                $scope.sysTableInfos[i].canChange = false;
            }
        }
        console.log($scope.sysTableInfos);
    },function(response){
        console.log(response);
    });

    $scope.saveSysInfos = function(){
        console.log(myFactory.getSysTemInfo($scope));
        if(!myFactory.getObjStorage("userInfo").id){
            location.href = "#/index/customer/login";
        }
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/service_provider/one_param/save_system_contact",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: myFactory.getSysTemInfo($scope), 
            withCredentials: true,
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
            if(response.data.success){
                // alert("修改成功");
                // history.go(0);
            }
        },function(response){
            console.log(response);
        });
    }
}
// 修改密码
function changePwd($scope,$http,myFactory){
    // 判断是否登录状态
    myFactory.checkLogin($scope);

    $scope.changePwd = function(){
        console.log(myFactory.getComUserPwd($scope))
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/user_manage/one_param/change_password",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
            data: myFactory.getComUserPwd($scope), 
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
            if(response.data.success){
                myFactory.setCookie("pwd",Base64.encode($scope.newPwd));
                // alert("修改成功，请重新登录");
                location.href = "#/index/customer/login";
            }else{
                alert(response.data.message);
            }
        },function(response){
            console.log(response);
        });
    }
}
// 修改邮箱地址
function changeEmail($scope,$http,myFactory){
    // 判断是否登录状态
    myFactory.checkLogin($scope);
    $scope.oldEmail = myFactory.getObjStorage("userInfo").email;
    $scope.changeEmailCli = function(){
        console.log(myFactory.setComUserEmail($scope));
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/user_manage/one_param/change_email",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: myFactory.setComUserEmail($scope), 
            withCredentials: true,
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
            if(response.data.success){
                var obj = myFactory.getObjStorage("userInfo");
                obj.email = $scope.email;
                myFactory.setObjStorage("userInfo",obj);
                console.log("userInfo",myFactory.getObjStorage("userInfo"));
                alert("邮箱已修改");
                location.href = "#/index/customer/personalSetting"
            }else{
                alert("修改失败");
            }
        },function(response){
            console.log(response);
        });
    }
}
// 注册
function register($scope,$http,myFactory){

    // 向父级controller传递参数
    $scope.$emit("msg", "请登录");
    // 清空本地存储
    localStorage.clear();
    // 发送请求清空登录信息
    $http({
        method: "POST",
        url: "http://192.168.16.101:8000/user_manage/one_param/logout",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data:  "",
        withCredentials: true,
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
        console.log(response)
        console.log("login out");
    },function(response){
        console.log(response);
    });

    // $scope.group = 1;
    $http({
        method: "GET",
        url: "http://192.168.16.101:8000/user_manage/one_param/get_groups",
        withCredentials: true,
    }).then(function(response){
        console.log(response);
        $scope.groupCode = response.data.data;
        $scope.group = response.data.data[1].id;
    });
    $scope.yanzhTip = "获取验证码";
    // 发送获取验证码
    var timer = null;
    var num;
    $scope.getTestNum = function(){
        num = 60;
        $scope.yanzhTip = num;
        clearInterval(timer);
        timer = setInterval(function() {
            num--;
            if(num <= 1){
                clearInterval(timer);
                num = "重新获取验证码";
            }
            $scope.$apply(function(){
                $scope.yanzhTip = num;
            });
        }, 1000);
        console.log(myFactory.getRegisterPhone($scope));
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/user_manage/one_param/code",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data:  myFactory.getRegisterPhone($scope),
            withCredentials: true,
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
            console.log(response.data);
        },function(response){
            console.log(response);
        });
    }
    // 注册信息
    $scope.register = function(){
        
        myFactory.setStorage('group',$scope.group);
        var id = $scope.group;

        $http({
            method: "GET",
            url: "http://192.168.16.101:8000/user_manage/one_param/get_all_phones_emails",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
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
            console.log(response.data);
            if(response.data.success){
                var emails = response.data.data.emails;
                var phones = response.data.data.phones;
                for(var i = 0;i < emails.length;i++){
                    if($scope.email == emails[i]){
                        alert("邮箱已经被注册");
                        return;
                    }
                }
                for(var i  = 0;i < phones.length;i++){
                    if($scope.phone == phones[i]){
                        alert("号码已经被注册");
                        return;
                    }
                }
            }
        },function(response){
            console.log(response);
        });

        if($scope.rePwd == $scope.password){
            console.log(myFactory.getRegisterData($scope));
            $http({
                method: "POST",
                url: "http://192.168.16.101:8000/user_manage/two_params/"+id+"/register",
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data:  myFactory.getRegisterData($scope),
                withCredentials: true,
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
                console.log(response)
                if(response.data.success){
                    console.log("注册response "+response);
                    alert(response.data.message);
                    console.log(myFactory.getLoginInfo($scope));
                    // 保存cookie
                    myFactory.setCookie("phone",$scope.phone,7);
                    myFactory.setCookie("pwd",Base64.encode($scope.password),7);
                    $http({
                        method: "POST",
                        url: "http://192.168.16.101:8000/user_manage/one_param/login",
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        data:  myFactory.getLoginInfo($scope),
                        withCredentials: true,
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
                        console.log("response ",response);
                        if(response.data.success){
                            console.log("登录 "+response.data.message);
                            console.log("用户信息"+$scope.rememberPWD);
                            // console.log('after', document.cookie);
                            // 本地存储用户信息
                            myFactory.setObjStorage("userInfo",response.data.data);

                            console.log("response",response);
                            console.log("本地储存",myFactory.getObjStorage("userInfo"));

                            $scope.$emit("isLog","success");

                            var peopleType = response.data.data.groupname;
                            switch(peopleType){
                                case　"管理员":
                                    location.href = "#/index/yunSW/yunSWHome";
                                    break;
                                case "客户": 
                                    location.href = "#/index/customer/allProList";
                                    break;
                                case "服务商": 
                                    location.href = "#/index/svProvider/svProvider";
                                    break;
                                default:
                                    location.href = "#/index/svProvider/wuliuHome";
                                    break;
                            }
                        }else{
                            alert("用户名或者密码错误");
                        }
                    },function(response){
                        console.log(response);
                    });
                }
            },function(response){
                console.log(response);
            });
        }else{
            alert("密码输入不一致");
        }
    }
}
// 登录
function login($rootScope,$scope,$http,myFactory){
    // 默认是记住密码状态
    $scope.rememberPWD = true;
    // 本地存储
    console.log("userInfo",myFactory.getObjStorage("userInfo"));

    console.log("cookie pwd",Base64.decode(myFactory.getCookie("pwd")));
    console.log("username phone",myFactory.getCookie("phone"));
    if(myFactory.getCookie("pwd") && myFactory.getCookie("phone")){
        $scope.password = Base64.decode(myFactory.getCookie("pwd"));
        $scope.phone = myFactory.getCookie("phone");
    }
    // 用户民改变密码改变
    $scope.$watch("phone",function(){
        console.log("用户名被更改");
        if($scope.phone == myFactory.getCookie("phone")){
            $scope.password = Base64.decode(myFactory.getCookie("pwd"));
        }else{
            $scope.password = "";
        }
    });
    // 向父级controller传递参数
    $scope.$emit("msg", "请登录");
    // 清空本地存储
    localStorage.clear();
    // 发送请求
    $http({
        method: "POST",
        url: "http://192.168.16.101:8000/user_manage/one_param/logout",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data:  "",
        withCredentials: true,
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
        console.log(response)
        console.log("login out");
    },function(response){
        console.log(response);
    });

    // 发送用户名密码
    var verifyCode = new GVerify("v_container");
    $scope.login = function(){
        // 判断验证码
        var res = verifyCode.validate(document.getElementById("code_input").value);
        if(res){

            console.log(myFactory.getLoginInfo($scope));
            // 保存cookie
            if(myFactory.checkUndef($scope.rememberPWD)){
                myFactory.setCookie("phone",$scope.phone,7);
                myFactory.setCookie("pwd",Base64.encode($scope.password),7);
            }else{
                myFactory.setCookie("phone",$scope.phone,-1);
                myFactory.setCookie("pwd",Base64.encode($scope.password),-1);
            }
            $http({
                method: "POST",
                url: "http://192.168.16.101:8000/user_manage/one_param/login",
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data:  myFactory.getLoginInfo($scope),
                withCredentials: true,
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
                console.log("response ",response);
                if(response.data.success){
                    console.log("登录 "+response.data.message);
                    console.log("用户信息"+$scope.rememberPWD);
                    // console.log('after', document.cookie);
                    // 本地存储用户信息
                    myFactory.setObjStorage("userInfo",response.data.data);

                    console.log("response",response);
                    console.log("本地储存",myFactory.getObjStorage("userInfo"));

                    $scope.$emit("isLog","success");

                    var peopleType = response.data.data.groupname;
                    // alert(peopleType);
                    switch(peopleType){
                        case　"管理员":
                            location.href = "#/index/yunSW/yunSWHome";
                            break;
                        case "客户": 
                            location.href = "#/index/customer/allProList";
                            break;
                        case "服务商":
                            location.href = "#/index/svProvider/homePage";
                            break;
                        default:
                            location.href = "#/index/svProvider/wuliuHome";
                            break;
                    }
                }else{
                    alert("用户名或者密码错误");
                }
            },function(response){
                console.log(response);
            });  
        }else{
            alert("验证码错误,请重新输入");
        } 
    }
}
// 忘记密码
function forgatPwd($scope,$http,myFactory){
    $scope.nextDetail = function(){
        // console.log($scope.email);
        $http({
            method: "POST",
            url: "http://192.168.16.101:8000/user_manage/one_param/create_random_code",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: {save: JSON.stringify({email: $scope.email})},
            withCredentials: true,
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
            alert("验证链接已经发送至邮箱，请注意查收!");
            location.href = "#";
        },function(response){
            console.log(response);
        });
    }
}

function yanzhengEmail($scope,$http,$stateParams,myFactory){
    $scope.email= $stateParams.email;
    $scope.code = $stateParams.code;
    console.log($scope.email +" "+ $scope.code); 
     $http({
        method: "GET",
        url: "http://192.168.16.101:8000/user_manage/one_param/get_reset_password_datas",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        params: {
            email: $scope.email,
            code: $scope.code
        },
        withCredentials: true,
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
        $scope.infos = response;
    },function(response){
        console.log(response);
    });

    // 确认修改
    $scope.resetPassword = function(){
        console.log($scope.infos);
        console.log(myFactory.resetPwdData($scope));
        if($scope.password == $scope.password2){
            $http({
                method: "POST",
                url: "http://192.168.16.101:8000/user_manage/one_param/reset_password",
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: myFactory.resetPwdData($scope),
                withCredentials: true,
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
                alert("密码已经重置!");
                location.href = "#";
            },function(response){
                console.log(response);
                alert("修改密码失败");
            });
        }else{
            alert("两次输入密码不一致");
        }
    }
}
angular
    .module('inspinia')
    .controller('MainCtrl', MainCtrl)
    .controller('UserMgrCtrl',UsermgrCtrl)
    .controller('createPro',createPro)
    .controller('createSimple',createSimple)
    .controller('allProList',allProList)
    .controller('proManage',proManage)
    .controller('personnalSetting',personnalSetting)
    .controller('changePwd',changePwd)
    .controller('svProvider',svProvider)
    .controller('svProMan',svProMan)
    .controller('svCreatePro',svCreatePro)
    .controller('svSubPro',svSubPro)
    .controller('svProFlow',svProFlow)
    .controller('svDetails',svDetails)
    .controller('yswHomePage',yswHomePage)
    .controller('yswCreateP',yswCreateP)
    .controller('yswProMan',yswProMan)
    .controller('yswSysSet',yswSysSet)
    .controller('yswUserMan',yswUserMan)
    .controller('yswUserInfo',yswUserInfo)
    .controller('yswCreateUser',yswCreateUser)
    .controller('register',register)
    .controller('login',login)
    .controller('demo1LC',demo1LC)
    .controller('demo1Xiang',demo1Xiang)
    .controller('demo1Create',demo1Create)
    .controller('proDetailsCon',proDetailsCon)
    .controller('systemSettingPerson',systemSettingPerson)
    .controller('downLoadReport',downLoadReport)
    .controller('proData',proData)
    .controller('changeEmail',changeEmail)
    .controller('forgatPwd',forgatPwd)
    .controller('yanzhengEmail',yanzhengEmail)




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
                    var val = $(".base64Test").val();
                    var result = Base64.encode(val);
                    console.log(result);
                }
                $scope.base64Jie = function(){
                    console.log("解密");
                    var val = $(".base64Test").val();
                    var result = Base64.decode(val);
                    console.log(result);
                }
           })
