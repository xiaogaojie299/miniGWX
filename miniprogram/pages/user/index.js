Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {title:"账号与安全",urlPath:"account-security/account-security"},
      {title:"合作招募",urlPath:"recruit/recruit"},
      {title:"平台客服",urlPath:"/images/right.png"},
      {title:"问题反馈",urlPath:"feedback/feedback"}
    ]
  },
  go_userDetail(){
    wx.navigateTo({
      url: './user-details/user-detail',
    })
  },
  quite(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  go_url(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/user/'+e.currentTarget.dataset.path,
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