// miniprogram/pages/user/become-teacher/become-teacher.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths:[]
  },
  // 图片上传
  onLoad: function onLoad() {},
  chooseimage: function chooseimage() {
    var _this = this;
    wx.chooseImage({
      count: 3, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function success(res) {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        console.log(_this.data.tempFilePaths,'res=',res.tempFilePaths);
        var tempFiles=_this.data.tempFilePaths.concat(res.tempFilePaths);
        _this.setData({
          tempFilePaths: tempFiles
        });
        console.log(_this.data.tempFilePaths);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})