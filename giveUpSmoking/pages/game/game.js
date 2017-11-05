Page({
  data: {
		bgImgUrl: "../../images/game/bgImg.png",
		topText: "连成一句话，并阅读其内容完成挑战",
		dropdownTop: "77rpx",
		rightArr: [2,5,6,9,12,11],
		dropdownPageY: 0,
		pageY: 0,
		// 滑动过的id
		saveIdArr: [0],
		// 间距
		spacing: 100,
		textArr: [{
				id: 1,
				txt: "戒",
				chioce: false,
				hideBox: true,
				contentImgUrl: "../../images/game/gameTip.png",
				imgTxt: "123",
				x: 138,
				y: 236
			},{
				id: 2,
				txt: "我",
				chioce: false,
				hideBox: true,
				contentImgUrl: "../../images/game/gameTip.png",
				imgTxt: "123",
				x: 372,
				y: 236
			}, {
				id: 3,
				txt: "感",
				chioce: false,
				hideBox: true,
				contentImgUrl: "../../images/game/gameTip.png",
				imgTxt: "123",
				x: 604,
				y: 236
			}, {
				id: 4,
				txt: "建",
				chioce: false,
				hideBox: true,
				contentImgUrl: "../../images/game/gameTip.png",
				imgTxt: "123",
				x: 138,
				y: 470
			}, {
				id: 5,
				txt: "要",
				chioce: false,
				hideBox: true,
				contentImgUrl: "../../images/game/gameTip.png",
				imgTxt: "123",
				x: 372,
				y: 470
			}, {
				id: 6,
				txt: "开",
				chioce: false,
				hideBox: true,
				contentImgUrl: "../../images/game/gameTip.png",
				imgTxt: "123",
				x: 604,
				y: 470
			}, {
				id: 7,
				txt: "康",
				chioce: false,
				hideBox: true,
				contentImgUrl: "../../images/game/gameTip.png",
				imgTxt: "123",
				x: 138,
				y: 706
			}, {
				id: 8,
				txt: "烟",
				chioce: false,
				hideBox: true,
				contentImgUrl: "../../images/game/gameTip.png",
				imgTxt: "123",
				x: 372,
				y: 706
			}, {
				id: 9,
				txt: "始",
				chioce: false,
				hideBox: true,
				contentImgUrl: "../../images/game/gameTip.png",
				imgTxt: "123",
				x: 604,
				y: 706
			}, {
				id: 10,
				txt: "工",
				chioce: false,
				hideBox: true,
				contentImgUrl: "../../images/game/gameTip.png",
				imgTxt: "123",
				x: 138,
				y: 940
			}, {
				id: 11,
				txt: "烟",
				chioce: false,
				hideBox: true,
				contentImgUrl: "../../images/game/gameTip.png",
				imgTxt: "123",
				x: 372,
				y: 940
			}, {
				id: 12,
				txt: "戒",
				chioce: false,
				hideBox: true,
				contentImgUrl: "../../images/game/gameTip.png",
				imgTxt: "123",
				x: 604,
				y: 940
		}]
  },
	dropdownStart: function(event){
		this.setData({dropdownPageY: event.changedTouches[0].pageY});
		this.setData({ pageY: 0 });
	},
	dropdownMove: function(event){
		this.setData({ pageY: event.changedTouches[0].pageY - this.data.dropdownPageY });
		// if (this.data.pageY < 27){
			this.setData({ dropdownTop: 77 + this.data.pageY + "rpx" });	
		// }
	},
	dropdownEnd: function (event) {
		this.setData({ dropdownTop: "77rpx" });
		if(this.data.pageY > 0){
			var param = {};
			for (var i = 0; i < this.data.textArr.length;i++){
				var string = "textArr[" + i + "].hideBox";
				param[string] = !this.data.textArr[i].hideBox;
				this.setData(param);
			}
		}
	},
	contentMove: function(event){
		var num = 0;
		var idArr = this.data.saveIdArr;
		var pagex = event.touches[0].pageX
		var pagey = event.touches[0].pageY;
		var textArr = this.data.textArr;
		for (var i = 0; i < textArr.length;i++){
			if (pagex >= ((textArr[i].x - 100) / 750) * this.winWidth && pagex <= ((textArr[i].x + 100) / 750) * this.winWidth && pagey >= ((textArr[i].y - 100) / 1206) * this.winHeight && pagey <= ((textArr[i].y + 100) / 1206) * this.winHeight){
				for (var j = 0; j < idArr.length; j++) {
					if (idArr[j] == textArr[i].id) {
						num++;
					} 
				}
				if(num <= 0){
					if(idArr[0] == 0){
						idArr.shift();
					}
					idArr.push(textArr[i].id);
					var up = "textArr[" + i + "].chioce";
					this.setData({
						saveIdArr: idArr,
						[up]: true
					})
				}
			}
		}
	},
	contentEnd: function(e){
		var idArr = this.data.saveIdArr;
		var rightArr = this.data.rightArr;
		var num = 0;
		console.log(idArr);
		if(idArr.length == rightArr.length){
			for (var i = 0; i < idArr.length; i++) {
				if (idArr[i] == rightArr[i]){
					num++;
				}
			}
		}
		if(num == rightArr.length){
				console.log("匹配正确");
				for(var i = 0;i < rightArr.length;i++){
					var id = rightArr[i];
					var param = {};
					var hideBox = "textArr[" + (id - 1) + "].hideBox";
					this.setData({
						[hideBox]: false 
					});
				}
		}
		// 清除被选中状态样式
		for (var i = 0; i < idArr.length; i++) {
			var num = idArr[i] - 1;
			if(num >= 0){
				var chioce = "textArr[" + num + "].chioce";
				this.setData({
					[chioce]: false
				})
			}
		}
		// 初始化id数组
		this.setData({
			saveIdArr: [0]
		})
	},
	touchedTxt: function(e){
		console.log(e.currentTarget.dataset.id);
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var that = this;
		wx.getSystemInfo({
			success: function (res) {
				console.log(res.windowWidth)
				console.log(res.windowHeight)
				that.winWidth = res.windowWidth;
				that.winHeight = res.windowHeight;
			}
		}) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})