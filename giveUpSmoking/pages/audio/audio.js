// pages/audio/audio.js
const myAudio = wx.getBackgroundAudioManager()
Page({
  data: {
		containerBg: "../../images/container-bg.png",
		songName: "Call_Me_Baby",
		playImg: '../../images/jieYou/img-circle.png',
		playImglittle: 'http://159.203.250.111/five1.png',
		playPauseBtn: '../../images/jieYou/play.png',
		currentTime: "00:00",
		durationTime: "00:00",
		songLyrics: ["Call_Me_Baby", "Good_Time"],
		percentWidth: 0,
		song: [{
			musicid: 1,
			poster: 'http://159.203.250.111/five1.png',
			name: 'Good_Time',
			id: 436514312,
			author: 'Carly_Rae_Jepsen',
			src: 'http://159.203.250.111/Good_Time.mp3'
		}, {
			musicid: 2,
			poster: 'http://159.203.250.111/carly.png',
			name: 'Good_Time',
			author: 'Carly_Rae_Jepsen',
			src: 'http://159.203.250.111/Good_Time.mp3'
			},{
				musicid: 3,
				poster: 'http://159.203.250.111/five1.png',
				name: 'Maps',
				author: 'Marron 5',
				src: 'http://159.203.250.111/maps.mp3'
			}],
		count: 1,
		imgUrls: [
			'http://159.203.250.111/banner1.png',
			'http://159.203.250.111/banner2.png',
			'http://159.203.250.111/banner3.png',
		]
  },
	progressTouchStart: function(event){
		var percent = Math.floor((event.changedTouches[0].pageX / this.data.screenWidth) * myAudio.duration)
		myAudio.seek(percent)
	},
	progressTouchMove: function (event) {
		var percent = Math.floor((event.changedTouches[0].pageX / this.data.screenWidth) * myAudio.duration)
		console.log("percent",percent);
		myAudio.seek(percent)
	},
	progressTouchEnd: function (event) {
	},
	playPauseTap: function(e){
		if (myAudio.paused){
			myAudio.play();
			this.setData({
				playPauseBtn: '../../images/jieYou/play.png',
			})
		}else{
			myAudio.pause();
			this.setData({
				playPauseBtn: '../../images/jieYou/pause.png',
			})
		}
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var that = this;
		
		myAudio.src = this.data.song[0].src;
		console.log(myAudio.duration);
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					screenWidth: res.windowWidth
				})
			}
		});
		setInterval(function(){
			getlyric(that.data.song[0].id, function (getlyricData){
				if (getlyricData) {
					for (var i = 0; i < getlyricData.length; i++) {
						if (getlyricData[i].key == Math.floor(myAudio.currentTime)) {
							console.log("getlyricData[i].key", myAudio.currentTime);
							that.setData({
								songLyrics: getlyricData[i].value
							})
						}
					}
				}
				console.log("getlyricData", getlyricData);
			})
			
			that.setData({
				currentTime: formatTimeZero(Math.floor(myAudio.currentTime / 60)) + ":" + formatTimeZero(Math.floor(myAudio.currentTime % 60)),
				durationTime: formatTimeZero(Math.floor(myAudio.duration / 60)) + ":" + formatTimeZero(Math.floor(myAudio.duration % 60)),
				percentWidth: Math.floor((myAudio.currentTime / myAudio.duration) * 100),
			});
			console.log("currentTime",that.data.percentWidth);
			console.log("durationTime",that.data.percentWidth);
			console.log("percentWidth",that.data.percentWidth);
		},1000)



		function formatTimeZero(num) {
			num = "00" + num;
			return num.substr(num.length - 2, 2);
		}
		function getlyric(id,fun){
			let url = 'http://neteasemusic.leanapp.cn/lyric'
			wx.request({
				url: url,
				data: {
					id: id
				},
				method: 'GET',
				success: function(res){
					if (!res.data.lrc.lyric) return false;
					let lyric = res.data.lrc.lyric
					let timearr = lyric.split('[')
					let obj = {}
					let lyricArr = []
					timearr.forEach((item) => {
						let key = parseInt(item.split(']')[0].split(':')[0]) * 60 + parseInt(item.split(']')[0].split(':')[1])
						let val = item.split(']')[1]
						lyricArr.push({
							key: key,
							value: val
						})
					})
					fun(lyricArr);
				}
			})
		}
		
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
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
		return {
			title: '欢迎使用音乐播放器',
			desc: '将你正在听的歌分享到~~~',
			path: '/page/audio/audio.js'
		}
  }
})