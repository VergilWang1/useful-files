// pages/makePlan/makePlan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		makePlanBg: "../../images/container-bg.png",
		contentImgUrl: "../../images/makePlan/file-bag.png",
		hiddenBox1: "block",
		hiddenBox2: "none",
		indexPage: 1,
		allPage: 10,
		planItem: [
			{
				id: 1,
				title: "你开始打算何时戒烟"
			}
		],
		items: [
			{
				id: 1,
				txt: "你已经开始戒烟"
			}, {
				id: 2,
				txt: "我的打算未来30天内开始戒烟"
			}, {
				id: 3,
				txt: "我打算未来6个月内开始戒烟"
			}, {
				id: 4,
				txt: "我还没决定"
			}
		]
  },
	beginMakePlan: function(event){
		this.setData({ hiddenBox1: "none" });
		this.setData({ hiddenBox2: "block"});
	},
	groupRadio: function(event){
		console.log(event);
	},
	nextPage: function(event){
		
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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