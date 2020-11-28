// question/pages/lookAnswer/lookAnswer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionStatus: ['全部','正确','扣分'],
    btnIndex: 0
    
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

  },
  go_back(){
    wx.navigateBack();
  },
  activeBtn(e){ // 全部/正确/扣分切换
    this.setData({
      btnIndex: e.target.dataset.index
    })
  },
  goAnswerInfo(){ // 查看单题解析跳转
    wx.navigateTo({
      url: '/pages/answerInfo/answerInfo',
    })
  }
})