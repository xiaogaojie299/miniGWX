import {queryMeAnswerList,queryMeQuestionList,queryQuestionSquareList} from "../../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:1,
    size:10,
    aswerquesList:[],
    questionValue:""  //输入框输入的值
  },
  go_myProDetail(){
    wx.navigateTo({
      url:"../my-problem-detail/my-problem-detail",
    })
  },
  //获取我的问题
  async getMeQuestionList(){
    let {current,size}=this.data;
    let pamars={
      current,
      size
    }
    return 
  },
  //获取我的问答操作
  get_ownAnswerQues(){
    var that=this;
    console.log(that.setData);
    let {current,size}=that.data;
    let pamars={
      current,
      size
    }
    Promise.all([queryMeAnswerList(pamars),queryMeQuestionList(pamars)]).then(res=>{
      let arr=[];
      res.forEach(item=>{
        item.data.forEach(item=>{
          item.imgUrl=item.imgUrl.split(",");
        })
        if(item.code==200){
          arr=arr.concat(item.data);
        }
      })
      console.log("arr==>",arr);
      that.setData({
        aswerquesList:arr
      });
    });
  },
  // //用户输入问题
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
        aswerquesList:[]
      })
      if(!that.data.questionValue){
        that.get_ownAnswerQues();
      }else{
      that.get_questionSquareList()
      }
      console.log('我点击了回车')
    },

    //查询问题
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
        aswerquesList:this.data.aswerquesList.concat(Array)
      })
     }else{
       wx.showToast({
         title: '我是有底线的',
       })
     }
     
   }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_ownAnswerQues();
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