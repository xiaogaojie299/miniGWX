// miniprogram/pages/user/account-security/account-security.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    phone:wx.getStorageSync('userdata').phone
  },

  /**
   * 生命周期函数--监听页面加载
   */
  go_setUpwd(){
    wx.navigateTo({
      url: '/pages/forgetUpwd/index',
    })
  },
  go_chagePhone(){
    wx.navigateTo({
      url: '/pages/changePhone/index',
    })
  },
  typePhone(){
    let phone = this.data.phone.match(/(\d{3})(\d{4})(\d{4})/).slice(1).reduce(function(value, item, index) {
        //当index===1时，初始元素和当前元素累加并返回，value是初始值186，也是最终累加的返回值，item是当前索引下标是1的元素****。
        return index === 1 ? value + "****" : value + item;
      });
    
    this.setData({
      phone:phone
    })
  },
  onLoad: function (options) {
    this.typePhone()
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
    this.typePhone()
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