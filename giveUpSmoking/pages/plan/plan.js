Page({
  data: {
		indexImg: 2,
		allImg: 30,
		imgContentMarginLeft: "-525rpx",
		marginX: -600,
		planImg: [{
			flag: true,
			url: "../../images/plan/group1.png"
		}, {
			flag: false,
			url: "../../images/plan/group2.png"
		}, {
			flag: true,
			url: "../../images/plan/group1.png"
		}]
  },
	imageTouchStart: function(event){
		this.setData({ pageX: event.changedTouches[0].pageX});
		this.setData({ marginLeft: this.data.imgContentMarginLeft });
	},
	imageTouchMove: function (event) {
		var x = event.changedTouches[0].pageX;
		var marginX = this.data.marginX;
		// console.log(event);
		this.setData({ 
			imgContentMarginLeft: x - this.data.pageX + marginX +  "rpx",
			planImg: [{
				flag: true,
				url: "../../images/plan/group1.png"
			}, {
				flag: true,
				url: "../../images/plan/group2.png"
			}, {
				flag: true,
				url: "../../images/plan/group1.png"
			}]
		});

	},
	imageTouchEnd: function (event) {
		var pageX = event.changedTouches[0].pageX;
		var num = parseInt(this.data.marginLeft);
		var indexImg = this.data.indexImg;
		if (pageX < this.data.pageX) {
			if (indexImg < this.data.allImg){
				this.setData({
					imgContentMarginLeft: num - 525 + "rpx",
					indexImg: indexImg + 1,
					marginX: num - 525
				});
			}else{
				this.setData({
					imgContentMarginLeft: num + "rpx",
				});
			}
		} else if (pageX > this.data.pageX) {
			if (indexImg > 1){
				this.setData({
					imgContentMarginLeft: num + 525 + "rpx",
					indexImg: indexImg - 1,
					marginX: num + 525
				});
			}else{
				this.setData({
					imgContentMarginLeft: num + "rpx",
					marginX: 1
				});
			}
		}
		var up = "planImg[" + (this.data.indexImg - 1) + "].flag";
		this.setData({
			[up]: false
		})
	},
	wantToStopTap: function(event){
		console.log("想戒烟");
	},
	goTraining: function(e){
		console.log(e);
		switch (e.currentTarget.dataset.id){
			case 0: 
				console.log("0");
				wx.navigateTo({
					url: '../video/video'
				});
				break;
			case 1:
				console.log("1");
				break;
			default: 
				console.log("2");
				break;
		}
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		console.log(this.data.planImg.length);
		var that = this;
		wx.getSystemInfo({
			success: function (res) {
				console.log(res.windowWidth)
				console.log(res.windowHeight)
				that.winWidth = res.windowWidth;
				that.winHeight = res.windowHeight;
			}
		}) 
		this.setData({
			allImg: this.data.planImg.length
		});
		console.log(this.data.imgContentWidth);
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