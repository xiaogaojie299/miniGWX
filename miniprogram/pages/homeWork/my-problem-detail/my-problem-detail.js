// miniprogram/pages/homeWork/problem-detail/problem-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    actions: [
      {
        name: '采纳该回答',
      }
      // { name: '选项', color: '#07c160' },
      // { name: '取消', disabled: true }
    ]
  },
  open1(){
    console.log('打印成功');
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  onSelect(event) {
    console.log(event.detail);
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