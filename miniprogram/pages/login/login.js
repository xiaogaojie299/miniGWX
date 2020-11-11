// miniprogram/pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {title:"密码登录"},
      {title:"验证码登录"}
    ],
    isFouce:false,//获取焦点时的样式
    currentIndex:0,
    // 开关控制显示隐藏
    isvisib:false,
    i:10
  },
  inputFocus(){
    console.log('获取焦点成功');
    this.setData({isFouce:true})
  },
  inputBlur(){
    this.setData({isFouce:false})
    console.log('获取焦点失败');
  },
  // 获取验证码
  get_code(){
    let i=10;
    let that=this;
    that.setData({isvisib:true});
    console.log(i);
  },
  defindType(event){
    return event.currentTarget.dataset
  },
  isactive(event){
    this.setData({
      // currentIndex:this.defindType(event).index
      currentIndex:this.defindType(event).index
    })
  },
  go_forUpwd(){
    wx.navigateTo({
      url: '../forgetUpwd/index',
     })
  },
  submit(){
    wx.switchTab({
      url: '/pages/index/index',
    })
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