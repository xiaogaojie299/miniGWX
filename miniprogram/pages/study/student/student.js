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
    value1: "",    //下拉框选中的值
    className:"",    //班级名称
    classList:[],
    studentName:"",    //学生名称
    studentList:[],    //学生列表
    isShow:true,         //下拉选择框默认开启
    grade:""
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
      }
      let res =await queryMyAllClassList(pamars)
      console.log(res);
      if(res.code==200){
        let arr = []
        res.data.list.forEach((item,index,)=>{
            let obj = {};
            obj.text = item.name;
            obj.value =item.name;
              arr = arr.concat(obj);
        })
        arr.unshift({
          text:"全部",
          value:""
        })
        console.log("arr==>",arr);
        this.setData({
          option1:arr
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
          studentList:this.data.studentList.concat(res.data.list)
        })
      }
    },
    
    //点击确定搜索
    confim(){
      // if(!this.data.studentName){
      //   wx.showToast({
      //     title: '请输入学生姓名',
      //   })
      //   return
      // }
      this.setData({
        current:1,
        studentList:[]
      })
      this.get_ClassStudent()
    }, 
    search(){
      this.setData({
        current:1,
        studentList:[]
      })
      this.get_ClassStudent()
    },
    //监听输入框
    inputStudent(e){
      this.setData({
        studentName:e.detail.value
      })
    },

    //下拉菜单框选中
    changeValue({detail}){
      console.log("点击搜索成功")
      this.setData({
        className:detail,
        current:1,
        studentList:[]
      })
      this.get_ClassStudent()
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options==>",options);
    if(options.className){
      this.setData({
        className:options.className,
        grade:options.grade,
        isShow:false
      })
    }
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
    this.setData({
      current:this.data.current+1
    })
    this.get_ClassStudent()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})