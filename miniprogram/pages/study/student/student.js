// miniprogram/pages/study/student/student.js
import {queryMyAllClassList,queryAllMyStudent} from "../../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option1: [
      { text: '', value: 0 },
      { text: '我的回答', value: 1 },
      { text: '我的问题', value: 2 },
    ],
    current:1,
    size:10,
    value1: 0,    //下拉框选中的值
    className:"",    //班级名称
    studentName:"",    //学生名称
    studentList:[]    //学生列表
  },
  go_stuDetail(event){
    let index= event.currentTarget.dataset.index;
    let stuObj =JSON.stringify(this.data.studentList[index]);
    wx.navigateTo({
      url: '../student-detail/student-detail'+"?stuObj="+stuObj,
    })
  },
  //获取我的班级列表
    async get_classList(){
      let {current,size} = this.data
      let pamars={
        current,
        size,
      }
      let res =await queryMyAllClassList(pamars)
      console.log(res);
      if(res.code==200){
        this.setData({
          option1:res.data.list
        })
      }
    },

    //获取我的学生列表
    async get_ClassStudent(){
      let {size,current,studentName,className} = this.data;
      let pamars={
        size,
        current,
        studentName,
        className
      }
      let res =await queryAllMyStudent(pamars);
      console.log('学生列表',res.data);
      if(res.code==200){
        this.setData({
          studentList:res.data.list
        })
      }
    },
    
    //点击确定搜索
    confim(){
    },

    //监听输入框
    inputStudent(e){
      this.setData({
        studentName:e.detail.value
      })
    },

    //下拉菜单框选中
    changeValue({detail}){
      console.log(detail);
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_classList();
    this.get_ClassStudent();
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