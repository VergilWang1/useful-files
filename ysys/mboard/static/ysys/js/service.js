function myFactory($window){
    var service = {
        // 本地储存单个值
        setStorage: function(key, value){
            $window.localStorage[key] = value;
        },
        // 读取本地存储单个值
        getStorage: function(key){
            return  $window.localStorage[key];
        },
        // 本地存储对象
        setObjStorage: function(key,value){
            $window.localStorage[key] = JSON.stringify(value);
        },
        // 读取本地存储对象
        getObjStorage: function(key){
            return JSON.parse($window.localStorage[key] || '{}');
        },

        // 判断是否登录状态
        checkLogin: function($scope){
            if(service.getObjStorage("userInfo").username){
                var personName = service.getObjStorage("userInfo").username;
                if(service.getObjStorage("userInfo").name){
                    personName = service.getObjStorage("userInfo").name;
                }
                $scope.$emit("msg", personName + "，您好！");
            }else{
                console.log("userInfo",service.getObjStorage("userInfo"));
                history.go(0);
                location.href = "#/index/customer/login";
            }
        },

        // 判断是否是管理员
        isManage: function(){
            if(service.getObjStorage("userInfo").groupname == "管理员"){
                return true;
            }else{
                return false;
            }
        },

        isLoginIN: function($scope){
            if(service.getObjStorage("userInfo").groupname){
                var type = service.getObjStorage("userInfo").groupname;
                switch(type){
                    case　"管理员":
                        $scope.YSone = true;
                        $scope.SVProvider = false;
                        $scope.logProvider = false;
                        $scope.customer = false;
                        break;
                    case "服务商": 
                        $scope.YSone = false;
                        $scope.SVProvider = true;
                        $scope.logProvider = false;
                        $scope.customer = false;
                        break;
                    case "物流商":
                        $scope.YSone = false;
                        $scope.SVProvider = false;
                        $scope.logProvider = true;
                        $scope.customer = false;
                        break;
                    default:  //客户
                        $scope.YSone = false;
                        $scope.SVProvider = false;
                        $scope.logProvider = false;
                        $scope.customer = true;
                        break;
                }
            }else{
                console.log("未登录 userInfo",service.getObjStorage("userInfo"));
            }
        },

        // 判断要跳转的页面
        toHomePage: function($scope){
            if(service.getObjStorage("userInfo").groupname == "管理员"){
                location.href = "#/index/yunSW/yunSWHome";
            }else if(service.getObjStorage("userInfo").groupname == "客户"){
                location.href = "#/index/customer/allProList";
            }else if(service.getObjStorage("userInfo").groupname == "服务商"){
                location.href = "#/index/svProvider/homePage";
            }else{
                location.href = "#/index/svProvider/wuliuHome";
            }
        },
        // cookie
        setCookie: function(cname,cvalue,exdays){
            var d = new Date();
            d.setTime(d.getTime()+(exdays*24*60*60*1000));
            var expires = "expires="+d.toGMTString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        },

        getCookie: function(cname){
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) 
            {
                var c = ca[i].trim();
                if (c.indexOf(name)==0) return c.substring(name.length,c.length);
            }
            return "";
        },

        checkCookie: function(){
            var user=getCookie("username");
            if (user!="")
            {
                alert("Welcome again " + user);
            }else{
                user = prompt("Please enter your name:","");
                if (user!="" && user!=null)
                {
                setCookie("username",user,365);
                }
            }
        },
        // 重置密码
        resetPwdData: function($scope){
            return {
                info: JSON.stringify({
                    email: $scope.email,
                    password: $scope.password,
                    code: $scope.code
                })
            }
        },
        // 不同控制器之间传递参数
        saveProData: function(){
            return {};
        },

        // 用于检查是否为undefined
        checkUndef: function(obj){
            return obj?1:0;
        },

        // 注册用户获取验证码
        getRegisterPhone: function($scope){
            return {
                info: JSON.stringify({
                    username: $scope.phone
                })
            }
        },
        // 格式化后台传过来的时间  response.data.creation_time:2017-09-11T09:36:07.305778Z
        formatTime: function(dateTime){
            dateTime = dateTime.substr(0,10) + " " + dateTime.substr(11,8);

            return dateTime;
        },

        // 注册用户信息
        getRegisterData: function($scope){
            return {
                save: JSON.stringify([
                    {
                        username: $scope.phone,
                        name: $scope.name,
                        addr: $scope.addr,
                        company: $scope.company,
                        password: $scope.password,
                        email: $scope.email
                    }
                ]),
                info: JSON.stringify({
                    username: $scope.phone,
                    code: $scope.code,
                    group: $scope.group || "8"
                })
            }
        },


        // 登录信息
        getLoginInfo: function($scope){
            return {
                info: JSON.stringify(
                    {
                        username: $scope.phone,
                        password: $scope.password
                    }
                )
            }
        },

        // 个人设置发送数据
        getComUserInfo: function($scope){
            var obj = {
                save: JSON.stringify([
                    {
                        name: $scope.userInfo.name,
                        company: $scope.userInfo.company,
                        addr: $scope.userInfo.addr
                    }
                ])
            }
            for(var i in service.formatFils($scope)){
                obj[i] = service.formatFils($scope)[i];
            }
            return obj; 
        },
        // 设置个人邮箱
        setComUserEmail: function($scope){
            return {
                save: JSON.stringify(
                    {
                        email: $scope.email
                    }
                )
            }
        },

        // 修改密码
        getComUserPwd: function($scope){
            return {
                info: JSON.stringify(
                    {
                        username: service.getStorage("phone") || "1",
                        old_password: $scope.oldPwd,
                        new_password: $scope.newPwd
                    }
                )
            }
        },

        
        // 客户创建项目
        getData: function(scope){
            return {
                save: JSON.stringify([
                    {
                        content: scope.proContent.name
                    }
                ])
            }
        },

        // 创建样本信息
        getSimpleData: function(scope){
            var obj = {
                save: JSON.stringify([
                    {
                        test_index: scope.simleInfos.test_index,
                        name: scope.simleInfos.name,
                        content: scope.content.name,
                        species: scope.simleInfos.species,
                        sample_size: scope.simleInfos.sample_size,
                        homogenization: scope.homegenization
                    }
                ])
            }
            
            return obj;
        },
        // 创建样本信息
        getSimpleData2: function(scope){
            var obj = {
                save: JSON.stringify([
                    {
                        sampling_address: scope.simleInfos.sampling_address,
                        take_sample_date: $(".demo-input").val()
                    }
                ])
            }
            
            return obj;
        },

        getSimpleData3: function(scope){
            var obj = {
                save: JSON.stringify([
                    {
                        index: scope.test_index || "",
                        name: scope.name || "",
                        species: scope.species || "",
                        size: scope.sample_size || "",
                        homogenization: scope.homegenization
                    }
                ])
            }
            
            return obj;
        },

        // 客户项目管理
        getProManData: function($scope){
            return {
                save:JSON.stringify([
                    {
                        date: $scope.date,
                        proNum: $scope.proNum,
                        proContent: $scope.proContent,
                        sampling_address: $scope.sampling_address,
                        sampling_date: $scope.sampling_date
                    }
                ])
            }
        },
        // 客户项目管理下载EXIL
        formatFils: function($scope){
            var arr = [];
            var obj = {};
            var tem_file = $scope.upload_files;
            for(var i in  tem_file){
                arr.push(tem_file[i]); 
            }
            arr.splice(arr.length-2);
            for(var n = 0;n < arr.length;n++){
                obj["files"+n] = arr[n];
            }
            return obj;
        },

        // 客户项目进展弹框
        getTKProData: function($scope){
            return {
                save: JSON.stringify([
                    {
                        id: $(".TKHiddenID").find("span").html(),
                        proNum: $(".KTproNum").find("span").html(),
                        createDate: $(".KTcreateDate").find("span").html(),
                        proProgress: $scope.proProgress,
                        sampling_date: $scope.sampling_date,
                        sampling_address: $scope.sampling_address,
                        beizhu: $scope.beizhu
                    }
                ]),
                info: JSON.stringify({
                    key: "1"
                })
            }
        },

        // 确认弹框
        getTKConfirmData: function($scope){
            return {
                save: JSON.stringify([]),
                admin_confirm: true
            }
        },

        // 服务商评价
        getSvEvaData: function($scope){
            return {
                save: JSON.stringify([
                    {
                        stars: $scope.service_star,
                        time_limit: $scope.service_speed?true:false,
                        Professional: $scope.service_specialitys?true:false,
                        attitude: $scope.service_attitude?true:false,
                        comment: $scope.service_comment
                    }
                ])
            }
        },
        // 物流评价
        getWlEvaData: function($scope){
            return {
                save: JSON.stringify([
                    {
                        stars: $scope.logistics_star,
                        time_limit: $scope.logistics_speed?true:false,
                        Professional: $scope.logistics_specialitys?true:false,
                        attitude: $scope.logistics_attitude?true:false,
                        comment: $scope.logistics_comment
                    }
                ])
            }
        },
        // 服务商项目管理数据
        getSvProManData: function($scope){
            return {
                save: JSON.stringify([
                    {
                       create_date: $scope.create_date,
                       proNum: $scope.proNum,
                       sample_size: $scope.sample_size,
                       species: $scope.species,
                       name: $scope.name,
                       sampling_address: $scope.sampling_address,
                       sampling_date: $scope.sampling_date
                    }
                ])
            }
        },

        // 服务商项目进展弹框
        getTKSvProData: function($scope){
            return {
                save: JSON.stringify([
                    {
                        proNum: $(".KTproNum").find("span").html(),
                        createDate: $(".KTcreateDate").find("span").html(),
                        proProgress: $scope.proProgress,
                        overDate: $scope.overDate,
                        overDays: $scope.overDays,
                        beizhu: $scope.beizhu
                    }
                ])
            }
        },

        // 服务商确认项目报告
        getSvTKConfirmPro: function($scope){
            var obj = {
                info: JSON.stringify(
                    {
                        // report_key: "1",
                        remark: $scope.testReport || "",
                        // proNum: $(".KTproNum").find("span").html(),
                        // createDate: $(".KTcreateDate").find("span").html(),
                        // testReport: $scope.testReport,

                    }
                )
            };
            for(var i in service.formatFils($scope)){
                obj[i] = service.formatFils($scope)[i];
            }
            if(!obj.files0){
                
            }
            return obj;
        },

        // 服务商上传图标
        getUpLoadConfirmData: function($scope){
            return {
                save: JSON.stringify([
                    {
                        proNum: $(".KTproNum").find("span").html(),
                        createDate: $(".KTcreateDate").find("span").html(),
                        selectProLC: $scope.selectProLC
                    }
                ])
            }
        },

        // 服务商创建项目流程
        getSvCreateProData: function($scope){
            return {
                save: JSON.stringify([
                    {
                        content: $scope.content,
                        name: $scope.name,
                        responsible: $scope.responsible,
                        phone: $scope.phone,
                        email: $scope.email
                    }
                ])
            }
        },

        // 云生物用户信息详情
        getYswUserInfo: function($scope){
            return {
                save: JSON.stringify({
                    group: $scope.group,
                    username: $scope.username,
                    password: $scope.password,
                    email: $scope.email,
                    phone: $scope.phone,
                    company: $scope.company,
                    address: $scope.address
                }),
                info: {

                }
            }
        },
        getSvSubPro: function($scope){
            return {
                save: JSON.stringify([
                    {
                        name: $scope.name,
                        start_state: $scope.start_state,
                        stop_state: $scope.stop_state,
                        update_state: $scope.update_state,
                        cycle: $scope.cycle,
                        responsible: $scope.responsible,
                        phone: $scope.phone,
                        email: $scope.email
                    }
                ])
            }
        },
        // 云生物进展弹框
        getYswTKProGress: function($scope){
             var obj = {
                save: JSON.stringify([
                    {
                        proNum: $(".KTproNum").find("span").html(),
                        createDate: $(".KTcreateDate").find("span").html(),
                        proProgress: $scope.proProgress,
                        overTime: $scope.overTime,
                        overDays: $scope.overDays,
                        remark: $scope.remark
                    }
                ])
            };
            for(var i in service.formatFils($scope)){
                obj[i] = service.formatFils($scope)[i];
            }
            return obj;
        },

        // 云生物查核弹框、上传报告等
        getYswTKCehckedData: function($scope){
            var obj = {
                save: JSON.stringify([
                    {
                        // proNum: $(".KTproNum").find("span").html(),
                        // createDate: $(".KTcreateDate").find("span").html(),
                        remark: $scope.remark
                    }
                ])
            };
            for(var i in service.formatFils($scope)){
                obj[i] = service.formatFils($scope)[i];
            }
            return obj;
        },
        //上传项目等
        getTKUploadData: function($scope){
            var obj = {
                save: JSON.stringify(
                    {
                        remark: $scope.remark
                    }
                )
            };
            for(var i in service.formatFils($scope)){
                obj[i] = service.formatFils($scope)[i];
            }
            return obj;
        },
        // 云生物确认收样弹框
        getTKpConfirmData: function($scope){
            return {
                save: JSON.stringify([
                    {
                        accept_sample_date: $scope.sampling_date,
                        accept_sample_time: $scope.sampling_time2,
                        accept_sample_complete: true
                    }
                ])
            }
        },
        // 云生物删除项目
        getTKpDeleteProData: function($scope){
            return {
                save: JSON.stringify([
                    {
                        active: false,
                        id: $scope.deleteProId
                    }
                ])
            }
        },
        // 分派物流商弹框
        getTKYswLogisData: function($scope){
            return {
                save: JSON.stringify([
                    {
                        // proNum: $(".KTproNum").find("span").html(),
                        // createDate: $(".KTcreateDate").find("span").html(),
                        shipment_enterprise_id: $scope.selectLogis,
                        take_sample_date: $scope.sampling_date,
                        take_sample_time: $scope.sampling_time1,
                        accept_sample_date: $scope.sampling_date,
                        accept_sample_time: $scope.sampling_time2,
                        remark: $scope.remark,
                        take_sample_time_confirm : true
                    }
                ])
            }
        },
        // 分派服务弹框
        getTKLogisAlloData: function($scope){
            return {
                save: JSON.stringify([
                    {
                        // proNum: $(".KTproNum").find("span").html(),
                        // createDate: $(".KTcreateDate").find("span").html(),
                        service_provider_id: $scope.logisticsPro,
                        // logisticsSh: $scope.logisticsSh
                    }
                ])
            }
        },
        // 分派流程弹框
        getTKProgressData: function($scope){
            return {
                save: JSON.stringify([
                    {
                        // proNum: $(".KTproNum").find("span").html(),
                        // createDate: $(".KTcreateDate").find("span").html(),
                        new_process_id: $scope.logisticsSh
                    }
                ])
            }
        },
        //分派客户弹框
        getTKKehuAlloData: function($scope){
            return {
                save: JSON.stringify([
                    {
                        // proNum: $(".KTproNum").find("span").html(),
                        // createDate: $(".KTcreateDate").find("span").html(),
                        customer_id: $scope.logisticsPro,
                        // logisticsSh: $scope.logisticsSh
                    }
                ])
            }
        },

        // 修改周期
        getChangeCycleData: function($scope){
            return {
                save: JSON.stringify([
                    {
                        id: $scope.cycleData.id,
                        cycle: $scope.cycle,
                        half_cycle_message_status: false,
                        start_date: $("#dataInput6").val(),
                        start_time: $scope.start_time
                    }
                ])
            }
        },
        // 云生物系统设置
        getSysTemInfo: function($scope){
            return {
               save: JSON.stringify($scope.sysTableInfos)
            }
        },
        getCreateUserData: function($scope){
            return {
                save: JSON.stringify([
                    {
                        username: $scope.username,
                        pwd: $scope.pwd,
                        email: $scope.email,
                        phone: $scope.phone,
                        company: $scope.company,
                        address: $scope.address
                    }
                ])
            }
        },

        // 接受后台数据进行转换
        showData: function($scope,data){
            var arr = JSON.parse(data['projects_info']);
            var arr2 = [];
            for(var i = 0;i < arr.length;i++){
                arr2[i] = {
                    id: arr[i]['id'],
                    create_date: arr[i]['create_date'],
                    proNum: arr[i]['name'],
                    proContent: arr[i]['name'],
                    num: arr[i]['sample_size'],
                    progress: {width: "30%"}
                }
            }
            return arr2;
        },

        getNowFormatDate: function(timeD) {
            var date = new Date() || timeD;
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + date.getHours() + seperator2 + date.getMinutes()
                    + seperator2 + date.getSeconds();
            return currentdate;
        } 
    }

    return service;
}

angular
    .module('inspinia')
    .factory('myFactory',myFactory)
    .factory('timestampMarker', ["$rootScope", function ($rootScope) {
        var timestampMarker = {
        request: function (config) {
        $rootScope.loading = true;
        config.requestTimestamp = new Date().getTime();
        return config;
        },
        response: function (response) {
        $rootScope.loading = false;
        response.config.responseTimestamp = new Date().getTime();
        return response;
        }
        };
        return timestampMarker;
    }]);