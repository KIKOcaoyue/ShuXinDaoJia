// miniprogram/pages/order/order.js
var app = getApp();
var base = getApp();
const db = wx.cloud.database();
const allorder = db.collection('AllOrder');
Page({

  /**
   * Page initial data
   */
  data: {
    region: '',
    addr: '',
    tme: '',
    tel: '',
    total: 0,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      total: options.total
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
  getregion: function(e){
    if(e.detail.curson!=0){
      this.setData({
        region: e.detail.value
      })
    }
  },
  getaddr: function (e) {
    if(e.detail.curson!=0){
      this.setData({
        addr: e.detail.value
      })
    }
  },
  gettime: function (e) {
    if(e.detail.curson!=0){
      this.setData({
        tme: e.detail.value
      })
    }
  },
  gettel: function (e) {
    if(e.detail.curson!=0){
      this.setData({
        tel: e.detail.value
      })
    }
  },
  submit(e){
    var allok1 = false;
    var allok2 = false;
    var goods = '';
    var nownum = 0;
    app.globalData.glist.forEach(item=>{
      var tmp = item.weight*item.num;
      goods += item.name + tmp + 'g,';
    })
    db.collection('AllOrder').get({
      success: function(res){
        nownum = res.data.length+1;
      }
    })
    wx.cloud.callFunction({
      name: 'openapi',
      data:{
        action: 'insertDB',
        norderitem: goods,
        norderaddr: this.data.region+this.data.addr,
        nordertel: this.data.tel,
        nordertime: this.data.tme,
        nserial: nownum,
        ntotal: this.data.total,
        nfinished: false
      },
      success: res=>{
        wx.cloud.callFunction({
          name: 'openapi',
          data: {
            action: 'sendSubscribeMessage',
            templateId: 'G6pf-ZO8zhc6-NqEq8XfNf2NpDdawS1azPvyTW_iIdM',
            region: this.data.region + this.data.addr,
            tme: this.data.tme,
            tel: this.data.tel,
            good: goods
          },
          success: res => {
            base.modal({
              title: "下单成功", confirmText: "确定", success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../mainterface/mainterface'
                  })
                }
              }
            })
          },
          fail:err=>{
            base.modal({
              title: "发送订阅错误，请务必截图并联系商家", confirmText: "确定", success: function (res) {
                if (res.confirm) {
                }
              }
            })
          }
        })
      },
      fail:err=>{
        base.modal({
          title: "生成订单信息错误，请务必截图并联系商家", confirmText: "确定", success: function (res) {
            if (res.confirm) {
            }
          }
        })
      }
    })
  }
})