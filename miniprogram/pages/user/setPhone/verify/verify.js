// miniprogram/pages/user/setPhone/verify/verify.js
import {passwordAuthentication,checkCaptcha,optChangePhone,queryCaptcha} from "../../../../utils/api"
import {
  validatePhoneNumber
} from "../../../../utils/regular"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwd:null,
    phone:null,
    code:null,
    isPhone:false,
    isvisib_:false,
    codeText:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断验证手机还是密码
    this.setData({
      option: options.type,
      phone: wx.getStorageSync('userdata').phone
    })
    if(this.data.option === 'phone') {
      this.setData({
        isPhone: true
      })
      this.sendSms()
    } else {
      this.setData({
        isPhone: false
      })
    }
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

  },

  changePwdIpt(e){
    this.setData({
      pwd:e.detail
    })
  },
  changeCodeIpt(e){
    this.setData({
      code:e.detail
    })
  },
  sendSms(){
    let phone=this.data.phone;
     let that = this;
     // 获取验证码
     let data = {
       phone: phone,
       type: 3
     }
     queryCaptcha(data).then(res => {
       console.log("获取验证码成功", res)
       that.phone = res.data;
       if (res.code == 200) {
         that.phone = res.data;
         that.setData({
           isvisib_: true
         });
         that.startTime_();
       } else {
         app.Toast(res.msg);
       }
     })
   },
   startTime_() {
    let i_ = 59;
    this.setData({
      codeText:`${i_}秒后重新发送`
    })
    let timer = null;
    timer = setInterval(() => {
      if (i_ > 1) {
        i_--;
        this.setData({
          codeText:`${i_}秒后重新发送`
        })
      } else {
        this.setData({
          i_: 60
        })
        clearInterval(timer);
        this.setData({
          isvisib_: false
        });
      }
    }, 1000)
  },
   
  gochangePhone(type){
    wx.navigateTo({
      url: '/pages/changePhone/index'+'?type='+type,
    })
  },
  async checkPassword(){
    let {pwd} = this.data;
    let resp =await passwordAuthentication({password:pwd});
    if(resp.code==200){
      this.gochangePhone(2)
    }else{
        wx.showToast({
            title: resp.msg,
            icon:"none"
        })
      }
  },
  async checkPhone(){
    let resp =await checkCaptcha({
      phone:this.data.phone,
      code:this.data.code
    })
    if(resp.code==200){
      console.log("resp手机",resp)
      this.gochangePhone(1)
    }else{
      wx.showToast({
        title: resp.data.msg,
        icon:"none"
      })
    }
  },
  setNewPhone(){ //跳到设置新手机号页面
    if(this.data.option === 'phone') {
      this.checkPhone()
    }else {
      this.checkPassword()
    }
  }
})