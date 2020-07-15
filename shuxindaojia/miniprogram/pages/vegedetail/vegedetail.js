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
      success: function(res){
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
  
  addCart: function(){
    var _this = this;
    if(isok(this.data.vegename)){
      app.globalData.glist.push({
        name: this.data.vegename,
        weight: this.data.vegeweight,
        price: this.data.vegeprice,
        img: this.data.vegeimg,
        num: 1
      })
      this.setData({
        cartnum: this.data.cartnum + 1
      })
    }else{
      app.globalData.glist.forEach(item=>{
        if(item.name==this.data.vegename){
          item.num = item.num + 1
        }
      })
      this.setData({
        cartnum: this.data.cartnum + 1
      })
    }
  }
})

function isok(e) {
  var found = false;
  app.globalData.glist.forEach(item => {
    if (item.name == e) {
      found = true;
    }
  })
  if (found == true) {
    return false;
  } else {
    return true;
  }
}