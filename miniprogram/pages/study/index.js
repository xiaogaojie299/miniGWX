// miniprogram/pages/study/index.js
import {queryMyAllClassList,queryAllMyStudent,queryDaySchedule,queryTodayCourse} from "../../utils/api"
import {getTimeType} from "../../utils/getData"
import {timeType} from "../../utils/filter"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classNum:"",  //班级总数
    studentNum:"", //授课学生
    current:1,   //页码
    size:10 ,     //分页数据
    timer:getTimeType(),      //默认的时间
    curseList:[],  //获取今日课程列表     
    nickname:wx.getStorageSync('nickName')
  },
  clearData(){
    this.setData({
      classNum:"",  //班级总数
    studentNum:"", //授课学生
    current:1,   //页码
    size:10 ,     //分页数据
    timer:getTimeType(),      //默认的时间
    curseList:[],  //获取今日课程列表     
    })
  },
  go_student(){
    wx.navigateTo({
      url: '../study/student/student',
    })
  },
  go_teachClass(){
    wx.navigateTo({
      url: './teach-class/teach-class',
    }) 
  },
 
  //获取我的班级
  get_myClass(){
    let pamars={
      current:1,
      size:10
    }
    queryMyAllClassList(pamars).then(res=>{
      if(res.code==200){
        this.setData({
          classNum:res.data.total
        })
      }
    })
  },

  //获取我的学生
  get_myStudent(){
    let pamars={
      current:1,
      size:10
    }
    queryAllMyStudent(pamars).then(res=>{
      if(res.code==200){
        this.setData({
          studentNum:res.data.total
        })
      }
    })
  },

  //获取日历组件传过来的时间
  checkDay(e){
    this.setData({timer:e.detail});
    this.get_TimeCurse();
  },

  //按时间查询课程表
  async get_TimeCurse(){
    let {current,size,timer} = this.data;
    console.log("timer==>",timer);
    let pamars={
      current,
      size,
      day:timer 
    }
   let res =await queryDaySchedule(pamars);
    console.log(res.data);
    if(res.code==200){
      this.setData({
        curseList:res.data.list
      })
    }
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
    this.clearData();
    this.get_myClass();
    this.get_myStudent();
    this.get_TimeCurse();
    this.selectComponent("#calendar").visible()
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