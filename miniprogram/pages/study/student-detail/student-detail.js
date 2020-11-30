// miniprogram/pages/study/student-detail/student-detail.js
import {queryEvaluationList} from "../../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lableList:[],
    studentInfo:{},
    current :1,
    size:10
  },
  go_lookAnswer(){
    console.log("跳转成功");
    wx.navigateTo({
      url: '/pages/lookAnswer/lookAnswer',
    })
  },

  //获取成长记录列表
  async getEvaluationList(){
    let pamars= {
      current:this.data.current,
      size:this.data.size,
      studentId:this.data.studentInfo.id
    }
    let res =await queryEvaluationList(pamars);
    console.log("res==>",res.data);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      studentInfo:JSON.parse(options.stuObj)
    })
    this.getEvaluationList()
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