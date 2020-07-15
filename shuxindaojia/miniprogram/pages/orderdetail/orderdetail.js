// miniprogram/pages/orderdetail/orderdetail.js
const db = wx.cloud.database();
const allorder = db.collection('AllOrder');
Page({

  /**
   * Page initial data
   */
  data: {
    _id: '',
    orderitem: '',
    orderaddr: '',
    ordertel: '',
    ordertime: '',
    serial: -1,
    total: 0,
    finish: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var _this = this;
    allorder.where({
      serial: parseInt(options.vid)
    })
      .get({
        success: function (res) {
          console.log(res.data);
          _this.setData({
            _id: res.data[0]._id,
            orderitem: res.data[0].orderitem,
            orderaddr: res.data[0].orderaddr,
            ordertel: res.data[0].ordertel,
            ordertime: res.data[0].ordertime,
            serial: res.data[0].serial,
            total: res.data[0].total,
            finish: res.data[0].finished
          })
        }
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
  isok: function(e){
    wx.cloud.callFunction({
      name: 'openapi',
      data: {
        action: 'updateDB',
        serial: this.data.serial
      }
    })
    this.setData({
      finish: true
    })
  }
})