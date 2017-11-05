var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		mineBg: "../../images/mine/mine-bg.png",
		mineHeaderImg: "../../images/mine/mine-header.png",
		mineName: "孤独的吸烟者",
		details: [
			{
				url: "../../images/mine/money.png",
				text: "戒烟开始",
				viewTxt: "已开始戒烟",
				num: "02:30"
			}, {
				url: "../../images/mine/money.png",
				text: "戒烟开始",
				viewTxt: "已开始戒烟",
				num: "02:30"
			}, {
				url: "../../images/mine/money.png",
				text: "戒烟开始",
				viewTxt: "已开始戒烟",
				num: "02:30"
			}, {
				url: "../../images/mine/money.png",
				text: "戒烟开始",
				viewTxt: "已开始戒烟",
				num: "02:30"
			}, {
				url: "../../images/mine/money.png",
				text: "戒烟开始",
				viewTxt: "已开始戒烟",
				num: "02:30"
			}, {
				url: "../../images/mine/money.png",
				text: "戒烟开始",
				viewTxt: "已开始戒烟",
				num: "02:30"
			}
		]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var userInfo = app.globalData.userInfo;
		console.log(userInfo);
		this.setData({
			mineHeaderImg: userInfo.avatarUrl,
			mineName: userInfo.nickName
		});
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