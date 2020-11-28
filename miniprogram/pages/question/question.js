// question/pages/question/question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionType: 3, //0--单选,1--填空,2--简答,3--判断
    radioOptionsList: [ //单选题选项
      {right: 0,name: 'A',info:'答案一'},
      {right: 1,name: 'B',info:'答案二'},
      {right: 0,name: 'C',info:'答案三'}
  ],
  judgeOptionsList: [ //单选题选项
    {right: 0,name: 'A',info:'答案一'},
    {right: 1,name: 'B',info:'答案二'}
],
  fileList:[],
  show: false
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
  showPopup(){ //选择题号弹框
      this.setData({ show: true });
  },
  onClose(){
    this.setData({ show: false });
  }
})