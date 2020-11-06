// miniprogram/pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {title:"账号与安全",imgPath:"/images/right.png"},
      {title:"合作招募",imgPath:"/images/right.png"},
      {title:"平台客服",imgPath:"/images/right.png"},
      {title:"问题反馈",imgPath:"/images/right.png"}
    ]
  },
  go_userDetail(){
    wx.navigateTo({
      url: './user-details/user-detail',
    })
  },
  go_recruit(){
    wx.navigateTo({
      url: '/pages/user/recruit/recruit',
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