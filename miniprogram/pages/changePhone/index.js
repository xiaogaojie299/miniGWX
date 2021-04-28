// miniprogram/pages/changePhone/index.js
import {
  forgetPassword,
  queryCaptcha,
  checkCaptcha,
  optChangePhone,
  updataPhone
} from "../../utils/api"
import {
  validatePhoneNumber
} from "../../utils/regular"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPhone:"",
    oldCode:"",
    newPhone:"",
    newCode:"",

    // 开关控制显示隐藏
    isvisib: false,
    i: 60, //计时器
    timer: null, //定时器

    // 开关控制显示隐藏
    isvisib_: false,
    i_: 60, //计时器
    timer_: null, //定时器
    methodType:1 // 1= 验证码修改  2 = 密码修改
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 输入原手机
  inputOldPhone(e){
    this.setData({
      oldPhone:e.detail.value
    })
  },
  // 输入原手机号验证码
  inputOldCode(e){
    console.log(e)
    this.setData({
      oldCode:e.detail.value
    })
  },
  // 输入新手机
  inputNewPhone(e){
    this.setData({
      newPhone:e.detail
    })
  },
  // 这个获取不了值
  // inputNewCode(e){
  //   console.log(e);
  //   this.setData({
  //     newCode:e.detail.value
  //   })
  // },
  inputNewCode(e){
    console.log(e)
    this.setData({
          newCode:e.detail
        })
  },
  // 提交操作
  async submit() {
    let {
      oldPhone,
      oldCode,
      newPhone,
      newCode,
      methodType
    } = this.data;
    let storePhone = wx.getStorageSync('userdata').phone;
    console.log(storePhone);
    if (!newPhone) {
      app.Toast("新手机号码不能为空");
      return
    }
    if (!newCode) {
      app.Toast("验证码不能为空");
      return
    }
    if (!validatePhoneNumber(newPhone)) {
      app.Toast("请输入正确的手机格式");
      return
    }
    console.log(optChangePhone);
    // 把用户输入验证码发送到后端进行校验
    let newResult=await this.verify_code(newPhone,newCode);
    if(newResult.code==200){
      let data = {
        code:newCode,
        phone :newPhone,
        type :methodType
        }
        let result = await updataPhone(data);
        console.log("result123==>",result.code);
        if (result.code == 200) {
          app.Toast("修改成功");
          setTimeout(()=>{
            wx.redirectTo({
              url: '/pages/login/login',
            })
          },1000)
        } else {
          app.Toast(result.msg);
        }
    }else{
      app.Toast(newResult.msg);
    }
  },
  // 校验用户填写的验证码
  verify_code(phone,code){
    let data={phone,code};
    return checkCaptcha(data)
  },
   // 获取原手机验证码
   get_code() {
   let phone=this.data.oldPhone;
    if (!phone) {
      app.Toast("请输入手机号码")
      return
    }
    if (!validatePhoneNumber(phone)) {
      app.Toast("请输入正确手机号")
      return
    }
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
          isvisib: true
        });
        that.startTime();
      } else {
        app.Toast(res.msg);
      }
    })
  },
  startTime() {
    let {
      i
    } = this.data;
    let timer = null;
    timer = setInterval(() => {
      if (i > 1) {
        i--;
        this.setData({
          i
        })
      } else {
        this.setData({
          i: 60
        })
        clearInterval(timer);
        this.setData({
          isvisib: false
        });
      }
    }, 1000)
  },
  // 获取新手机
  get_code_() {
    let phone=this.data.newPhone;
     if (!phone) {
       app.Toast("请输入手机号码")
       return
     }
     if (!validatePhoneNumber(phone)) {
       app.Toast("请输入正确手机号")
       return
     }
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
     let {
       i_
     } = this.data;
     let timer = null;
     timer = setInterval(() => {
       if (i_ > 1) {
         i_--;
         this.setData({
           i_
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
  onLoad: function (options) {
    console.log(options)
    this.setData({
      methodType:options.type
    })
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