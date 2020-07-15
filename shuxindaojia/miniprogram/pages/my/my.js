// miniprogram/pages/my/my.js
Page({

  /**
   * Page initial data
   */
  data: {
    pwd: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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
  getpwd: function(e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  allorder: function(e) {
    var tmp = 'zsxdjxmcg';
    console.log(this.data.pwd);
    if (tmp==this.data.pwd){
      wx.navigateTo({
        url: '../allorder/allorder'
      })
    }
  }
})