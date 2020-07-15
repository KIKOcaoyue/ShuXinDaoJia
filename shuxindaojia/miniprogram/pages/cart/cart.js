// miniprogram/pages/cart/cart.js
var base = getApp();
var app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    plist: [],
    total: 0,
    his: ""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(app.globalData.glist);
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
    var sum = 0;
    app.globalData.glist.forEach(item=>{
      sum = sum + item.num*item.price;
    })
    this.setData({
      plist:app.globalData.glist,
      total: sum
    });
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
  clearCart: function () {
    var _this = this;
    if (this.data.total > 0) {
      base.modal({
        title: "确认清空所有商品？", confirmText: "清空", success: function (res) {
          if (res.confirm) {
            _this.setData({ plist: [], total: 0 });
            base.cart.clear();
          }
        }
      })
    }
  },
  changeNum: function (e) {
    var _this = this;
    var sum = this.data.total;
    var t = e.currentTarget.dataset.type;
    var now = e.currentTarget.dataset.pname;
    var index = -1;
    for(var i=0;i<app.globalData.glist.length;i++){
      if(app.globalData.glist[i].name==now){
        index = i;
        break;
      }
    }
    app.globalData.glist[index].num += parseInt(t);
    sum += parseInt(t) * app.globalData.glist[index].price;
    if (app.globalData.glist[index].num<=0){
      app.globalData.glist.splice(index, 1);
    }
    this.setData({
      plist: app.globalData.glist,
      total: sum
    })
  },
  clearCart: function () {
    var _this = this;
    if (this.data.total > 0) {
      base.modal({
        title: "确认清空所有商品？", confirmText: "清空", success: function (res) {
          if (res.confirm) {
            _this.setData({ plist: [], total: 0 });
            app.globalData.glist = [];
          }
        }
      })
    }
  },
  goOrder: function(){
    wx.navigateTo({
      url: '../order/order?total=' + this.data.total
    })
  }
})