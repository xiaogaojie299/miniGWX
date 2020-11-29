import {queryQuestionSquareList} from "../../utils/api"
// miniprogram/pages/homeWork/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:1,
    size:10,
    questionSquareList:[],
    questionValue:""
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
    let queryObj=JSON.stringify(this.data.questionSquareList[index]);
    wx.navigateTo({
      url: './problem-detail/problem-detail?queryObj='+queryObj,
    }) 
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
     if(res.data.length>0){
        let Array=[];
        Array=res.data;
        res.data.forEach((item,idnex)=>{
        item.imgUrl=item.imgUrl.split(",")
        })
      this.setData({
        questionSquareList:this.data.questionSquareList.concat(Array)
      })
     }else{
       wx.showToast({
         title: '我是有底线的',
       })
     }
     
   }
  },
  //用户输入问题
  inputQuestion(e){
    console.log("e",e.detail.value);
    this.setData({
      questionValue:e.detail.value
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
    this.get_questionSquareList()
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
    this.setData({current:this.data.current+1});
    this.get_questionSquareList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})