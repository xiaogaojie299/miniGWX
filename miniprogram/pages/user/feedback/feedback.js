import {optFeedback} from "../../../utils/api"
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths:[],
    picList:[],
    opinionValue:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  chooseimage: function chooseimage() {
    var _this = this;
    wx.chooseImage({
      count: 3, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function success(res) {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        console.log(_this.data.tempFilePaths,'res=',res.tempFilePaths);
        var tempFiles=_this.data.tempFilePaths.concat(res.tempFilePaths);
        _this.setData({
          tempFilePaths: tempFiles
        });
        console.log("上传的图片",_this.data.tempFilePaths)
        app.uploadimg(res.tempFilePaths).then(res=>{
          _this.setData({
            picList:_this.data.picList.concat(res)
          })
        })
      }
    }); 
  },
  inputOpinion(event){//留言板输入的数据
      let {opinionValue} = this.data;
      this.setData({
        opinionValue:event.detail.value
      })
  },
  async setFeedback(){//提交问题反馈操作
    let {picList,opinionValue}=this.data;
    console.log("picList===>",picList.toString())
    console.log("opinionValue",opinionValue)
    if(opinionValue.trim().length==0){
      return wx.showToast({
        title: "请提出您的宝贵意见",
        duration: 2000,
        icon:'none'
       });
    }
    let pamars = {
      content:opinionValue,
      img:picList.toString()
    }
    let res =await optFeedback(pamars);
    console.log(res);
    if(res.code==200){
      app.Toast("提交问题成功");
      setTimeout(()=>{
        wx.switchTab({
          url: '/pages/user/index',
        })
      },1000)
      this.setData({
        tempFilePaths:[],
        picList:[],
        opinionValue:""
      })
    }else{
      app.Toast('问题反馈失败')
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

  }
})