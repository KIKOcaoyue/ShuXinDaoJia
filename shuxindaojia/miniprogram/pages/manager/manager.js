const db = wx.cloud.database();
const vegeset = db.collection('VegeSet');
Page({

  /**
   * Page initial data
   */
  data: {
    list: [],
    focus: false,
    inputValue: ''
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
    this.getAllvege();
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
  //below is what I coded//
  //getAllvege(), return all the data from database
  getAllvege: function () {
    var _this = this;
    db.collection('VegeSet').get({
      success: function (res) {
        //console.log(res.data);
        _this.setData({
          "list": res.data
        });
      }
    })
  },
  //getVegebyName(e), return all the data which the vegetable name is e
  getVegebyName: function (e) {
    db.collection('VegeSet').where({
      vegeName: e
    })
      .get({
        success: function (res) {
          return res.data;
        }
      })
  },
  viewVege: function (e) {
    var nowname = e.currentTarget.dataset.vname;
    if (nowname) {
      wx.navigateTo({
        url: '../managevege/managevege'
      })
    }
  },

})