// miniprogram/pages/user/user.js
Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: '',
    loaded: true,
    phone: '',
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
  onGotUserInfo: function (e) {//授权登陆
    const { userInfo } = e.detail
    console.log(e)
    this.setData({
      userInfo: userInfo
    })
  },
  cfsubscribe: function (e) {
    console.log("按下订阅按钮");
    wx.requestSubscribeMessage({
      tmplIds: ['G6pf-ZO8zhc6-NqEq8XfNf2NpDdawS1azPvyTW_iIdM'],
      success(res) { 
        console.log("已接受订阅信息");
      }
    })
  }
})