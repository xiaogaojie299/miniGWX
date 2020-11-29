// miniprogram/pages/homeWork/problem-detail/problem-detail.js
import {queryQuestionAnswerList,optAddAnswer,optDeleteAnswer} from "../../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    actions: [
      {
        name: '删除',
      }],
      queryInfo:{},  //问题答案详情页面
      current:1, //分页
      size:10,   //分页条数
      answerList:[], //回答列表
      answerValue:"",  //input输入框的值;
      answerId:""     //回答人的id
  },
  open1(event){
    console.log(event);
    let answerId=event.currentTarget.dataset.answerid;
    console.log("answerId=",answerId)

    this.setData({ show: true,answerId });
  },
  onClose() {
    this.setData({ show: false });
  },
  onSelect(event) {
    console.log(event.detail);
    //删除问题回答
    this.delAnswer()

  },
  //获取问答回答列表
  async getQuestionAnswerList(){
    let {current,size,queryInfo}=this.data;
    let pamars={
      current,
      size,
      questionId:queryInfo.id
    }
    let res = await queryQuestionAnswerList(pamars);
    console.log("res==>",res);
    if(res.code==200){
      this.setData({
        answerList:res.data
      })
    }

  },

  //回答问题操作
  async setAddAnswer(){
    let {queryInfo,answerValue} =this.data;
    let pamars={
      questionId:queryInfo.id,
      answer:answerValue
    }
    let res=await optAddAnswer(pamars);
    if (res.code==200){
      wx.showToast({
        title: '回答问题成功',
        icon:"none"
      });
      this.getQuestionAnswerList()
    }
    
  },
  //提交问题
  submit(){
    if(!this.data.answerValue){
      wx.showToast({
        title: '问题不能为空',
        icon:"none"
      })
      return 
    }
    this.setAddAnswer();
  },

  //删除问题问答操作
  async delAnswer(){
    let {queryInfo,answerId}=this.data;
    console.log("answerId",answerId);
    let pamars={
      questionId :queryInfo.id,
      answerId :answerId 
    }
    let res =await optDeleteAnswer(pamars);
    if(res.code==200){
      this.setData({ show: false });
      wx.showToast({
        title: '删除回答成功',
        icon:"none"
      })
      this.getQuestionAnswerList()
    }
  },
  //监听输入框
  inputAnswer(e){
    this.setData({
      answerValue:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      queryInfo:JSON.parse(options.queryObj)
    }),
    this.getQuestionAnswerList()
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