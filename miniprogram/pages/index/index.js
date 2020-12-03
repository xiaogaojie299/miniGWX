//index.js
const app = getApp()
import {queryBannerListByType,queryTodayCourse,queryClassHourRand} from "../../utils/api"
Page({
  data: {
    imgUrls: [
      '/images/login_bg@2x.png',
      '/images/login_bg@2x.png',
      '/images/login_bg@2x.png'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 800,
    swiperCurrent: 0,
    isTop:false,
    nickname:wx.getStorageSync('nickName'),
    todayCaurse:[],      //今日课程
    hourRank:[]       //获取课时数排行
  },
  swiperChange(e) {
    let current = e.detail.current;
    let that = this;
    that.setData({
      swiperCurrent: current,
    })
  },
  go_top(){
    console.log("返回顶部");
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
  //初始化页面
  init(){
    this.get_banner()
    this.get_todarCaurse()
    this.get_rand()
  },
  //获取首页轮播图数据
  async get_banner(){
    let data={
      type:1
    }
   let res =await queryBannerListByType(data);
   if(res.code==200){
     this.setData({
      imgUrls:res.data
     })
   }else{
     app.Toast(res.msg);
   }
  },

  async get_todarCaurse(){  //获取今日课程
    let res =await queryTodayCourse();
    if(res.code==200){
      this.setData({
        todayCaurse:res.data
      })
    }
},
async get_rand(){//获取老师课时数排行
 let res = queryClassHourRand()
 if(res.code==200){
  this.setData({
    hourRank:res.data
  })
 }

},

onPageScroll: function(res) {
  if(res.scrollTop>300){
    this.setData({isTop:true})
  }else{
    this.setData({isTop:false})
  }
},
  onLoad: function() {
    this.init();

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  onShow: function(){
    this.setData({
      nickname:wx.getStorageSync('nickName')
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
