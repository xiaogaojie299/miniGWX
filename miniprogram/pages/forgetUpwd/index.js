// miniprogram/pages/forgetUpwd/index.js
import {
  forgetPassword,
  queryCaptcha,
  checkCaptcha,
} from "../../utils/api"
import {
  validatePhoneNumber,
  validatePassword
} from "../../utils/regular"
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        placeholder: "请输入手机号"
      },
      {
        placeholder: "请输入验证码",
        title: "获取验证码"
      },
      {
        placeholder: "输入新密码 (6-20位字母加数字组合，区分大小写)",
      },
      {
        placeholder: "再次输入密码",
      }
    ],
    phone: "", //输入手机号
    code: "", //用户输入的验证码
    newPwd: "", //用户输入新密码
    redoPwd: "", //重复输入

    // 开关控制显示隐藏
    isvisib: false,
    i: 60, //计时器
    timer: null, //定时器
  },
  inputValue(e) {
    console.log(e);
    switch (e.target.dataset.i) {
      case 0:
        this.setData({
          phone: e.detail.value
        });
        break;
      case 1:
        this.setData({
          code: e.detail.value
        });
        break;
      case 2:
        this.setData({
          newPwd: e.detail.value
        });
        break;
      default: {
        this.setData({
          redoPwd: e.detail.value
        });
      }
    }
  },

  async submit() {
    console.log("执行成功");
    let {
      phone,
      code,
      newPwd,
      redoPwd
    } = this.data;
    console.log(this.data);
    if (!phone) {
      app.Toast("手机号码不能为空");
      return
    }
    if (!code) {
      app.Toast("验证码不能为空");
      return
    }
    if (!newPwd) {
      app.Toast("新密码不能为空");
      return
    }
    if (!redoPwd) {
      app.Toast("请重复输入密码");
      return
    }
    if(newPwd.length<6){
      app.Toast("新密码长度不能低于6位");
      return
    }
    if(newPwd.length>20){
      app.Toast("新密码长度不能大于20位");
      return
    }
    console.log("validatePassword==>",validatePassword(newPwd));
    if(!validatePassword(newPwd)){
      app.Toast("新密码包含数字 + 字母");
      return
    }
    if (redoPwd !== newPwd) {
      app.Toast("请保证两次输入的密码一致");
      return
    }
    if (!validatePhoneNumber(phone)) {
      app.Toast("请输入正确的手机格式");
      return
    }

    // 把用户输入验证码发送到后端进行校验
    let pamars = {
      phone,
      code
    };
    let res = await checkCaptcha(pamars)
    if (res.code == 200) {
      let data = {
        code,
        phone,
        password: newPwd,
      }
      let result = await forgetPassword(data);
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
    } else {
      app.Toast(res.msg)
    }


    console.log(res);
  },

  // 获取验证码
  get_code() {
    let {
      phone
    } = this.data;
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
      type: 2
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: options.name })
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