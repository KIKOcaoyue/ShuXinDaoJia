// miniprogram/pages/recommand/recommand.js
Page({

  /**
   * Page initial data
   */
  data: {
    img1: '',
    img2: '',
    img3: '',
    img4: '',
    img5: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      img1: 'cloud://cywechatcloudbase-lfgts.6379-cywechatcloudbase-lfgts-1301325980/covers1.png',
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  gobulletin: function() {
    wx.navigateTo({
      url: '../bulletin/bulletin'
    })
  }
})