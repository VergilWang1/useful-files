Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		topUrl: "../../images/index/top-img.png",
		allItems: [
			{
				id: 1,
				url: "../../images/index/help.png",
				txt: "知识库"
			}, {
				id: 2,
				url: "../../images/index/help.png",
				txt: "计划"
			}, {
				id: 3,
				url: "../../images/index/help.png",
				txt: "戒烟计划"
			}, {
				id: 4,
				url: "../../images/index/help.png",
				txt: "咨询医生"
			}
		]
	},
	allItemsTap: function(event){
		var app = getApp();
		console.log("app",app);
		console.log(event.currentTarget.dataset.id);
		switch (event.currentTarget.dataset.id){
			case 1: 
				wx.navigateTo({
					url: '../knowledge/knowledge'
				});
				break;
			case 2: 
				wx.navigateTo({
					url: '../plan/plan'
				});
				break;
			case 3:
				wx.navigateTo({
					url: '../makePlan/makePlan'
				});
				break;
			default: 
				wx.navigateTo({
					url: '../makePlan/makePlan'
				});
				break;
		}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// wx.request({
		// 	url: '', 
		// 	data: {
		// 		x: '',
		// 		y: ''
		// 	},
		// 	header: {
		// 		'content-type': 'application/json'
		// 	},
		// 	success: function (res) {
		// 		console.log(res.data)
		// 	}
		// })
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
