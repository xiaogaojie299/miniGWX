// miniprogram/pages/study/teach-class/teach-class.js
import {queryMyAllClassList} from "../../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classValue:"",
    current:1,
    size:10,
    classList:[]
  },
  //跳转到班级详情
  go_clsScd(event){
    let index = event.currentTarget.dataset.index;
    let queryObj=this.data.classList[index];
    queryObj=JSON.stringify(queryObj);
    wx.navigateTo({
      url: '../class-schedule/class-schedule'+'?queryObj='+queryObj,
    })
  },
  //用户输入input框
  inputClass(e){
    console.log(e);
    this.setData({
      classValue:e.detail.value
    })
  },
   //监听用户点击回车
   confirmTap: function() {
    let that = this;
    that.setData({
      current:1,
      questionSquareList:[]
    })
    that.get_classList()
    console.log('我点击了回车')
  },

  //搜索班级
  async get_classList(){
    let {current,size,classValue} = this.data
    let pamars={
      current,
      size,
      name:classValue
    }
    let res =await queryMyAllClassList(pamars)
    console.log(res);
    if(res.code==200){
      this.setData({
        classList:res.data.list
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_classList()
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