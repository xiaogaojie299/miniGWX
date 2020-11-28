// miniprogram/pages/login/login.js
import {captchaLogin,queryCaptcha,checkCaptcha,passwordLogin} from "../../utils/api"
import {validatePhoneNumber} from "../../utils/regular"
const app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {title:"密码登录"},
      {title:"验证码登录"}
    ],
    isFouce:false,//获取焦点时的样式
    currentIndex:0,
    // 开关控制显示隐藏
    isvisib:false,  
    i:60,   //计时器
    timer:null, //定时器
    codePhone:"", //用户输入的手机号码
    code:"",   //用户输入的验证码
    phoneCaptcha:"",//服务端返回来的手机验证码
    pwd:"",    //用户输入的密码
    pwdPhone:"" //密码登录用户输入的手机
  },
  inputFocus(){
    this.setData({isFouce:true})
  },
  inputBlur(){
    console.log('获取焦点失败');
  },
  // 验证码登录时输入手机input
  inputCodePhone(e){
    this.setData({
      codePhone:e.detail.value
    }) 
  },
  //验证码登录时输入验证码input
  inputCode(e){
    this.setData({
      code:e.detail.value
    })
  },
  inputPwdPhone(e){
    this.setData({
      pwdPhone:e.detail.value
    })
  },
  inputPwd(e){
    this.setData({
      pwd:e.detail.value
    })
  },
  // 获取验证码
  get_code(){
    let {codePhone}=this.data;
   if(!codePhone){
    app.Toast("请输入手机号码")
     return
   }
   if(!validatePhoneNumber(codePhone)){
   app.Toast("请输入正确手机号")
     return
   }
    let that=this;
    // 获取验证码
    let data={
      phone:codePhone,
      type:2
    }
    queryCaptcha(data).then(res=>{
      console.log("获取验证码成功",res)
      that.phoneCaptcha=res.data;
      if(res.code==200){
        that.phoneCaptcha=res.data;
      that.setData({isvisib:true});
      that.startTime();
      }else{
        app.Toast(res.msg);
      }
    })
  },
  startTime(){
    let {i}=this.data;
    let timer=null;
    timer=setInterval(()=>{
        if(i>1){
          i--;
          this.setData({i})
        }else{
          this.setData({i:60})
          clearInterval(timer);
          this.setData({isvisib:false});
        }
      },1000)
  },
  defindType(event){
    return event.currentTarget.dataset
  },
  isactive(event){
    this.setData({
      // currentIndex:this.defindType(event).index
      currentIndex:this.defindType(event).index
    })
  },
  go_forUpwd(){
    wx.navigateTo({
      url: '../forgetUpwd/index',
     })
  },
  
  //手机验证码登录
 async get_captchaLogin(){
   let {codePhone,code}=this.data;
   let data={phone:codePhone,code:code};
   let res =await captchaLogin(data)
   console.log(res);
   if(res.code==200){
   wx.setStorageSync('userInfo',res.data);
   wx.switchTab({
    url: '/pages/index/index',
  })
   }else{
     app.$Toast(msg)
   }
  },
  // 密码登录
  async get_passwordLogin(){
    let {pwdPhone,pwd}=this.data
    let data={
      password:pwd,
      phone:pwdPhone
    };
   let res =await passwordLogin(data);
   console.log(res);
   if(res.code==200){
    wx.setStorageSync('userInfo',res.data);
    wx.switchTab({
      url: '/pages/index/index',
    })
    }else{
      app.Toast(msg)
    }
  },
  submit(){
    let that=this;
    let {codePhone,code,pwdPhone,pwd}=that.data;
    if(that.data.currentIndex==0){
      // 用户密码登录
      if(!pwdPhone){
        app.Toast("请输入手机号码")
         return
       }
       if(!validatePhoneNumber(pwdPhone)){
        app.Toast("请输入正确手机号码")
         return
       }
       if(!pwd){
          app.Toast("请输入密码");
         return
       }
      that.get_passwordLogin()
    }else{
      if(!codePhone){
        app.Toast("请输入手机号码")
         return
       }
       if(!validatePhoneNumber(codePhone)){
        app.Toast("请输入正确手机号码")
         return
       }
       if(!code){
          app.Toast("请输入手机验证码")
         return
       }
      // 把用户输入验证码发送到后端进行校验
      let pamars={code};
      checkCaptcha(pamars).then(res=>{
        if(res.code==200){
          // 进行登录操作,调用登录接口 get_captchaLogin（）
          that.get_captchaLogin();
        }else{
          app.Toast(res.msg)
        }
      })
    }
    // wx.switchTab({
    //   url: '/pages/index/index',
    // })
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