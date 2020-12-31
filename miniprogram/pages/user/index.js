import {queryPersonalData,querySystemSetByType} from "../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {title:"账号与安全",urlPath:"account-security/account-security",isIcon:true},
      {title:"平台客服",urlPath:"/images/right.png",isIcon:false},
      {title:"问题反馈",urlPath:"feedback/feedback",isIcon:true}
    ],
    kfPhone:"",
    userdata:[]
  },
  go_userDetail(){
    wx.navigateTo({
      url: './user-details/user-detail',
    })
  },
  quite(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  go_url(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/user/'+e.currentTarget.dataset.path,
    })
  },
    // 获取个人资料
    async getPersonalData(){
      let res =await queryPersonalData();
      if(res.code==200){
        // 将用户名字存储
        wx.setStorageSync('nickName', res.data.nickname);
        wx.setStorageSync('userdata',res.data);
        this.setData({
          userdata:res.data,
        })
      }else{
        app.Toast("网络错误")
      }
    },

    async getKf(){  //获取客服电话
      let params = {
        type:1
      }
    let {code,data} =await querySystemSetByType(params);
    if(code ==200){
      this.setData({
        kfPhone:data.content
      })
    }
    },
 
// 拨打电话
    callPhone(){
      let {kfPhone} = this.data;
      wx.makePhoneCall({
        phoneNumber: kfPhone, //此号码并非真实电话号码，仅用于测试
        success: function () {
          console.log("拨打电话成功！")
        },
        fail: function () {
          console.log("拨打电话失败！")
        }
      })
  
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
    this.getPersonalData()
    this.getKf()
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