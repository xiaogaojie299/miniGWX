// question/pages/answerInfo/answerInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionType: 2, //0--单选,1--填空,2--简答
    optionsList: [ //题目选项
      {right: 0,name: 'A',info:'答案一'},
      {right: 1,name: 'B',info:'答案二'},
      {right: 0,name: 'C',info:'答案三'}
  ],
    rightIndex: 0, //单选正确的选项
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
  rightOption(e){
    console.log(e.currentTarget.dataset.index);
  }
})