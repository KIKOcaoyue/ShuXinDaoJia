// miniprogram/pages/vegedetail/vegedetail.js
const db = wx.cloud.database();
const vegeset = db.collection('VegeSet');
var base = getApp();
var app = getApp();
var cart = require('../cart/cart.js');
Page({

  /**
   * Page initial data
   */
  data: {
    vegename: '',
    vegedes: '',
    vegeweight: '',
    vegeprice: '',
    vegeimg: '',
    cartnum: 0,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var _this = this;
    vegeset.where({
      vegeName: options.vname
    })
      .get({
        success: function (res) {
          console.log(res.data);
          _this.setData({
            vegename: res.data[0].vegeName,
            vegedes: res.data[0].vegeDes,
            vegeweight: res.data[0].vegeWeight,
            vegeprice: res.data[0].vegePrice,
            vegeimg: res.data[0].vegeImg
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
  getprice: function(e){
    if (e.detail.curson != 0) {
      this.setData({
        vegeprice: e.detail.value
      })
    }
  },
  getweight: function(e){
    if (e.detail.curson != 0) {
      this.setData({
        vegeweight: e.detail.value
      })
    }
  },
  getdes: function(e){
    if (e.detail.curson != 0) {
      this.setData({
        vegedes: e.detail.value
      })
    }
  },
  confirm: function () {
    console.log(this.data);
    wx.cloud.callFunction({
      name: 'openapi',
      data: {
        action: 'updateall',
        name: this.data.vegename,
        des: this.data.vegedes,
        price: this.data.vegeprice,
        weight: this.data.vegeweight
      },
      success: res => {
        base.modal({
          title: "修改成功", confirmText: "确定", success: function (res) {
            wx.navigateTo({
              url: '../manager/manager'
            })
          }
        })
      },
      fail: err => {
        base.modal({
          title: "修改失败，请重试", confirmText: "确定", success: function (res) {
          }
        })
      },
    })
  }
})