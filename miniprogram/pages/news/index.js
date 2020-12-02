import {queryMessageList} from "../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listOrder:[
      {
        title:"消息通知",
        imgPath:"/images/activity.png",
        msgList:5
      },
      {
        title:"活动",
        imgPath:"/images/notice.png",
        msgList:0
      }
    ],
    nickname:wx.getStorageSync('nickName')
  },
  go_msgNot(event){
    let index =Number(event.currentTarget.dataset.index)+1;

    wx.navigateTo({
      url: '/pages/news/msg-notification/msg-index'+"?type="+index,
    })
  },

  // 获取我的消息
  async get_msg(type=1,read=1){
    // type 1=系统通知  2=活动通知 3=所有
    let pamars={
      current:1,
      size:10,    
      read,       //1=未阅读 // 2 已阅读  //3 所有
      type
    };
    let res = await queryMessageList(pamars);
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
    this.get_msg(1,1);
    this.get_msg(2,2)
    this.setData({
      nickname:wx.getStorageSync('nickName')
    })
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