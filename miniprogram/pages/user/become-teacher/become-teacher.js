// miniprogram/pages/user/become-teacher/become-teacher.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],
    isShow: false,
    isgoodSubject: false,
    columns: ["博士", "硕士", "本科", "专科"],
    subjectList: [{
      title: "语文",
      checkout: false
    }, {
      title: "数学",
      checkout: false
    }, {
      title: "英语",
      checkout: false
    }, {
      title: "生物",
      checkout: false
    }, {
      title: "物理",
      checkout: false
    }, {
      title: "化学",
      checkout: false
    }, {
      title: "地理",
      checkout: false
    }, {
      title: "政治",
      checkout: false
    }, {
      title: "历史",
      checkout: false
    }, {
      title: "其他",
      checkout: false
    }]
  },
  select_sub(e){
    let arr=[...this.data.subjectList];
    let i=e.currentTarget.dataset.index;
      console.log(e.currentTarget.dataset.index);
      arr[i].checkout=!arr[i].checkout;
      this.setData({
        subjectList:arr
      })
  },
  // 弹出生日时间选择器
  birthdar_pop() {
    this.setData({
      isShow: true
    });
  },
  onClose() {
    this.setData({
      isShow: false
    });
  },
  handle_subject() {
    this.setData({
      isgoodSubject: true
    });
  },
  onCloseGoodSub() {
    this.setData({
      isgoodSubject: false
    });
  },
  handle_education() {
    this.selectComponent("#myeducation").open_pop()
  },
  // 图片上传
  onLoad: function onLoad() {},
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
        console.log(_this.data.tempFilePaths, 'res=', res.tempFilePaths);
        var tempFiles = _this.data.tempFilePaths.concat(res.tempFilePaths);
        _this.setData({
          tempFilePaths: tempFiles
        });
        console.log(_this.data.tempFilePaths);
      }
    });
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