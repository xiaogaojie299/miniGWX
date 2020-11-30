// miniprogram/pages/study/class-schedule/class-schedule.js
import {queryDaySchedule} from "../../../utils/api"
import {getTimeType} from "../../../utils/getData"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classDetail:{},
    current:1,
    size:10,
    timer:getTimeType(),      //默认的时间
    classCurse:[]             //班级课表
  },
    //获取日历组件传过来的时间
    checkDay(e){
      this.setData({timer:e.detail});
      this.setData({
        current:1
      })
      this.get_TimeCurse();
    },
      //按时间查询课程表
  async get_TimeCurse(){
    let {current,size,timer,classDetail} = this.data;
    let pamars={
      classId:classDetail.id,
      current:current,
      size,
      day:timer 
    }
   let res =await queryDaySchedule(pamars);
    console.log(res.data);
    if(res.code==200){
      if(res.data.length==0&&current==1){
        this.setData({
          classCurse:[],
        })
      }else{
        this.setData({
          classCurse:this.data.classCurse.concat(res.data[0].list),
        })
      }
    }else{
      wx.showToast({
        title: '网络错误',
        icon:"none"
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      classDetail:JSON.parse(options.queryObj)
    })
    this.get_TimeCurse()
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
    this.selectComponent("#calendar").visible()
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
    this.setData({
      current:this.data.current+1
    })  
    this.get_TimeCurse()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})