// pages/jieYou/jieYou.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		topImgUrl: "../../images/jieYou/top-img.png",
		bottomTxt: "话题讨论",
		contentBox: [
			{
				url: "../../images/jieYou/doctor.png",
				txt: "专家咨询"
			},{
				url: "../../images/jieYou/help.png",
				txt: "戒烟帮助"
			}
		],
		imgUrls: [
			{
				img: [
					{
						id: 1,
						url: "../../images/jieYou/img.png",
						title: "文章",
						txt: "你有多久没有仰望星空了"
					}, {
						id: 2,
						url: "../../images/jieYou/img.png",
						title: "漫画",
						txt: "你有多久没有仰望星空了"
					}, {
						id: 3,
						url: "../../images/jieYou/img.png",
						title: "音频",
						txt: "你有多久没有仰望星空了"
					}
				]
			}, {
				img: [
					{
						id: 1,
						url: "../../images/jieYou/img.png",
						title: "文章",
						txt: "你有多久没有仰望星空了"
					}, {
						id: 5,
						url: "../../images/jieYou/img.png",
						title: "漫画",
						txt: "你有多久没有仰望星空了"
					}, {
						id: 6,
						url: "../../images/jieYou/img.png",
						title: "音频",
						txt: "你有多久没有仰望星空了"
					}
				]
			}, {
				img: [
					{
						id: 7,
						url: "../../images/jieYou/img.png",
						title: "文章",
						txt: "你有多久没有仰望星空了"
					}, {
						id: 8,
						url: "../../images/jieYou/img.png",
						title: "漫画",
						txt: "你有多久没有仰望星空了"
					}, {
						id: 9,
						url: "../../images/jieYou/img.png",
						title: "音频",
						txt: "你有多久没有仰望星空了"
					}
				]
			}
		],
		indicatorDots: true,
		autoplay: false,
		interval: 500,
		duration: 100
  },
	bindContentTap: function(event){
		console.log(event);
	},
	swiperItemTap: function(event){
		var num = event.currentTarget.dataset.id;
		var that = this;
		console.log(num);
		wx.navigateTo({
			url: "../jieYouCon/jieYouCon?id=" + num
		});
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