function getRandomColor() {
	let rgb = []
	for (let i = 0; i < 3; ++i) {
		let color = Math.floor(Math.random() * 256).toString(16)
		color = color.length == 1 ? '0' + color : color
		rgb.push(color)
	}
	return '#' + rgb.join('')
}
Page({
	inputValue: '',
  data: {
		src: '',
		videoHidden: false,
		topBg: "../../images/video/top-img.png",
		videoUrl: "http://www.w3school.com.cn//i/movie.mp4",
		timeMinute: "30min",
		peopleNum: 3,
		allPeopleNum: 15236,
		activeNum: 3,
		zhActIveName: "瑜伽舒缓训练",
		enActIveName: "Soothing yoga training",
		trainingSteps: [{
			url: "../../images/video/con-img.png",
			stepName: "金刚坐",
			stepSecond: "1",
			xiuxiNum: "休息  '0'"
		}, {
			url: "../../images/video/con-img2.png",
			stepName: "金刚坐",
			stepSecond: "1",
			xiuxiNum: "休息  '0'"
			}, {
				url: "../../images/video/con-img.png",
				stepName: "金刚坐",
				stepSecond: "1",
				xiuxiNum: "休息  '0'"
			}],
		headeImgs: [{
				url: "../../images/video/header-img.png"
			},{
				url: "../../images/video/header-img.png"
			}, {
				url: "../../images/video/header-img.png"
			}, {
				url: "../../images/video/header-img.png"
			}, {
				url: "../../images/video/header-img.png"
		}]
  },
	bindInputBlur: function (e) {
		this.inputValue = e.detail.value
	},
	bindButtonTap: function () { //视频下载
		var that = this
		wx.chooseVideo({
			sourceType: ['album', 'camera'],
			maxDuration: 60,
			camera: ['front', 'back'],
			success: function (res) {
				that.setData({
					src: res.tempFilePath
				})
			}
		})
	},
	videoErrorCallback: function (e) {
		console.log('视频错误信息:');
		console.log(e.detail.errMsg);
	},
	beginTrain: function(e){
		this.setData({
			videoHidden: true
		})
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
		this.videoContext = wx.createVideoContext('myVideo')
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