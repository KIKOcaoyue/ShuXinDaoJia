// miniprogram/pages/allorder/allorder.js
const db = wx.cloud.database();
Page({

  /**
   * Page initial data
   */
  data: {
    plist: []
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
    this.getAllorder();
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
  getAllorder: function () {
    var _this = this;
    db.collection('AllOrder').get({
      success: function (res) {
        console.log(res.data);
        var tmp = res.data;
        var cmp = function(a,b){
          if(a.serial<b.serial){
            return 1;
          }else if(a.serial>b.serial){
            return -1;
          }else{
            return 0;
          }
        }
        tmp.sort(cmp);
        _this.setData({
          plist: tmp
        });
      }
    })
  },
  viewdetail: function(e){
    var now = e.currentTarget.dataset.vid;
    console.log(now);
    if(now){
      wx.navigateTo({
        url: '../orderdetail/orderdetail?vid=' + now
      })
    }
  },
  subscribe: function(e){
    wx.requestSubscribeMessage({
      tmplIds: ['G6pf-ZO8zhc6-NqEq8XfNf2NpDdawS1azPvyTW_iIdM'],
      success(res) {
        console.log("已接受订阅信息");
      }
    })
  },
  manage: function(e){
    wx.navigateTo({
      url: '../manager/manager'
    })
  }
})