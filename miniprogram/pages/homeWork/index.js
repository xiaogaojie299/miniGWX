import {queryQuestionSquareList,queryMeQuestionList,queryMeAnswerList} from "../../utils/api"
// miniprogram/pages/homeWork/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:1,
    size:10,
    questionSquareList:[],
    questionValue:"",
    option1: [
      { text: '全部问答', value: 0 },
      { text: '我的回答', value: 1 },
      { text: '我的问题', value: 2 },
    ],
    value1: 0,    //下拉框选中的值
    nickname:wx.getStorageSync('nickName')
  },
  
  go_myProblem(){
    wx.navigateTo({
      // url: 'pages/homeWork/my-problem/my-problem',
      url: './my-problem/my-problem',
     })
  },
  go_detail(e){
    let index= e.currentTarget.dataset.index;
    console.log("index==>",index);
    let queryObj=this.data.questionSquareList[index]; //判断当前选择的是不是我的问题  0:全部回答 1:我的回答 2:我的问题
    queryObj.value=this.data.value1;
    queryObj=JSON.stringify(queryObj);
    queryObj = encodeURIComponent(queryObj);
    wx.navigateTo({
      url: './problem-detail/problem-detail?queryObj='+queryObj,
    }) 
  }, 
  //下拉菜单框选中
  changeValue({detail}){
    this.setData({
      value1:detail,
      current:1,
      questionSquareList:[]
    })
    console.log(detail);
    switch(detail){
      case 0:
      this.get_questionSquareList();
      break;
      case 1:
        this.getMeAnswerList();
        break;
        default:
          this.getMeQuestionList();
          break;
    }
  }, 

  //获取问答广场数据
  async get_questionSquareList(){
    let {size,current,questionValue} = this.data;
    let pamars={
      size:size,
      current:current,
      conditions:questionValue
    }
   let res =await queryQuestionSquareList(pamars);
   if(res.code==200){
     if(res.data.list.length>0){
        let Array=[];
        Array=res.data.list;
        console.log("Array==>",Array)
        res.data.list.forEach((item,idnex)=>{
          if(item.imgUrl.length>0){
            item.imgUrl=item.imgUrl.indexOf(",")==-1?[item.imgUrl]:item.imgUrl.split(",")
          }
        })
      this.setData({
        questionSquareList:this.data.questionSquareList.concat(Array)
      })
      console.log("questionSquareList==>",this.data.questionSquareList)
     }else{
       wx.showToast({
         title: '我是有底线的',
       })
     }
     
   }
  },
  //获取我的问题
  async getMeQuestionList(){
    let {current,size}=this.data;
    let pamars={
      current,
      size
    }
    let res =await queryMeQuestionList(pamars);
    if(res.code==200){
      let Array=[];
      Array=res.data.list;
      res.data.list.forEach((item,idnex)=>{
      item.imgUrl=item.imgUrl.split(",")
      })
      this.setData({
        questionSquareList:this.data.questionSquareList.concat(Array)
      })
    }
  },
  // 获取我的回答
  async getMeAnswerList(){
    let {current,size}=this.data;
    let pamars={
      current,
      size
    }
    let res = await queryMeAnswerList(pamars);
    if(res.code==200){
      let Array=[];
      Array=res.data.list;
      res.data.list.forEach((item,idnex)=>{
      item.imgUrl=item.imgUrl.split(",")
      })
      this.setData({
        questionSquareList:this.data.questionSquareList.concat(Array)
      })
    }
  },
  //用户输入问题
  inputQuestion(e){
    console.log("e",e.detail.value);
    this.setData({
      questionValue:e.detail.value
    })
  },
  // 清空数据
  clearData(){
    this.setData({
      current:1,
    size:10,
    questionSquareList:[],
    questionValue:"",
    option1: [
      { text: '全部问答', value: 0 },
      { text: '我的回答', value: 1 },
      { text: '我的问题', value: 2 },
    ],
    value1: 0,    //下拉框选中的值
    })
  },
  //监听用户点击回车
  confirmTap: function() {
    let that = this;
    that.setData({
      current:1,
      questionSquareList:[]
    })
    that.get_questionSquareList()
    console.log('我点击了回车')
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
    // this.clearData()    //清空数据
    this.get_questionSquareList();
    this.setData({
      nickname:wx.getStorageSync('nickName')
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("离开了");
    // console.log(wx.pageScrollTo);
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
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
    this.setData({current:this.data.current+1});
    let {value1}=this.data;
    console.log('value1==',value1);
    switch(value1){
      case 0:
      this.get_questionSquareList();
      break;
      case 1:
        this.getMeAnswerList();
        break;
        default:
          this.getMeQuestionList();
          break;
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})