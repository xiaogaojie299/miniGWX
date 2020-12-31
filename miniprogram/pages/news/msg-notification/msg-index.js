import {queryMessageList,optSetRead} from "../../../utils/api"
const app = getApp()
var WxParse = require('../../../wxParse/wxParse');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,
    msgList:[]
  },
  
   // 获取我的消息
   async get_msg(){
    // type 1=系统通知  2=活动通知 3=所有
    let pamars={
      current:1,
      size:10,    
      read:3,       //1=未阅读 // 2 已阅读  //3 所有
      type:this.data.type
    };
    let res = await queryMessageList(pamars);
    if(res.code==200){
      console.log(res.data)
      for(let i=0;i<res.data.list.length;i++){
        WxParse.wxParse('info'+i, 'html',res.data.list[i].content, this); 
        if(i === res.data.list.length -1){
          WxParse.wxParseTemArray("infolist",'info', res.data.list.length, this);
          }
      }

      console.log(res.data);
      this.setData({
        msgList: res.data.list
      })
    }
    console.log("res===>",res)
  },
  async read(event){
    let index = event.currentTarget.dataset.index;
    console.log("read");
    let params={
      noticeUserId:this.data.msgList[index].noticeUserId
    }
    let {code,data,msg} =await optSetRead(params);
    if(code==200){
      app.Toast("标为已读成功") 
    }else{
      app.Toast("标为已读失败")
    }
  },

  onOpen(event) {
    const { position, name } = event.detail;
    switch (position) {
      case 'left':
        Notify({ 
          type: 'primary',
          message: `${name}${position}部分展示open事件被触发`,
        });
        break;
      case 'right':
        Notify({
          type: 'primary',
          message: `${name}${position}部分展示open事件被触发`,
        });
        break;
    }
  },
    // 自定义修改顶部导航栏
  setTopTitle: function () {
    const title = this.data.type==1?"系统通知":"活动通知";
    wx.setNavigationBarTitle({
      title 
    })
  },
  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    this.setData({
      type:options.type
    })
    this.get_msg();
    this.setTopTitle();


    // 富文本
   let  that = this
    WxParse.wxParse('content', 'html', that.data.list, that, 5); 
    // wxparse参数的含义
    // WxParse.wxParse(bindName , type, data, target,imagePadding)
    // 1.bindName绑定的数据名(必填)
    // 2.type可以为html或者md(必填)
    // 3.data为传入的具体数据(必填)
    // 4.target为Page对象,一般为this(必填)
    // 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
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