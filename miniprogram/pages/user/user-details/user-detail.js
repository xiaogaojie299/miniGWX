import {
  queryAllSubjects,optTeacherApply,queryPersonalData
} from "../../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userdata:{},
    picPaths:[],
    imgShow:true,    //用户上传成功切换图片显示
    isgoodSubject:false,  //选择科目弹框开关  
    subjectList:[],          //课程列表
    isShow:false,           //控制出生日期
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPersonalData();
    this.getAllSubjects();
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
  //控制时间选择器
  onClose() {
    this.setData({
      isShow: false
    });
  },

   //时间组件传过来的值
   selectTime(time) {
    this.setData({
      isShow: false,
      birthday: time.detail
    })
  },

   //选择时间点击取消 关闭遮罩层
   timeCancel(event) {
    console.log("1");
    this.setData({
      isShow: false,
    })
  },

    // 弹出生日时间选择器
    birthday_pop() {
      this.setData({
        isShow: true
      });
    },

  handle_subject() {
    this.setData({
      isgoodSubject: true
    });
  },

  //获取所有课程详情
  async getAllSubjects() {
    let res = await queryAllSubjects();
    if (res.code == 200) {
      res.data.forEach(item => {
        item.checkout = false
      })
      this.setData({
        subjectList: res.data
      })
    } else {
      wx.showToast({
        title: '网络错误',
        icon: "none"
      })
    }

  },

    // 选择科目
    select_sub(e) {
      let i = e.currentTarget.dataset.index;
      // arr[i].checkout  = !arr[i].checkout; 
      this.setData({
        subjectList: this.data.subjectList.map(x => {
          if (x.id == i) {
            x.checkout = !x.checkout;
            if (this.data.subjectList.filter(y => y.checkout != false).length > 3) {
              wx.showToast({
                title: '最多只能选择三科噢',
                icon:"none"
              })
              x.checkout = false
            }
          }
          return x
        }),
      })
      console.log(this.data.subjectList)
      //selectSubject:selectArr
    },
  
    //选择科目确定
    confirm(event) {
      let {subjectList} = this.data;
      let subjectName ="";
      let subjectId=[]
      subjectList.forEach(item=>{
        if(item.checkout){
          subjectName+=item.name+"/";
          subjectId.push(item.id);
        }
      })
      subjectName=subjectName.slice(0,-1);
      this.setData({
        subjects: subjectName,
        subjectIds:subjectId.toString(),
        isgoodSubject:false
      })
    },
  
    // 选择科目取消
    cancel(){
      this.setData({
        isgoodSubject:false
      })
    },

    // 图片上传
    chooseimage: function chooseimage() {
      var _this = this;
      wx.chooseImage({
        count: 1, // 默认9  
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: function success(res) {
          wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            mask: true,
            duration: 1000
          });
          _this.upImgs(res.tempFilePaths[0], 0);
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
          // console.log(_this.data.tempFilePaths, 'res=', res.tempFilePaths);
          // var tempFiles = _this.data.tempFilePaths.concat(res.tempFilePaths);
          // _this.setData({
          //   tempFilePaths: tempFiles
          // });
          // console.log(_this.data.tempFilePaths);
        }
      });
      
    },
    // 图片本地路径
    chooseWxImage: function (type) {
      var that = this;
      var imgsPaths = that.data.imgs;
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: [type],
        success: function (res) {
          console.log(res);
          console.log(res.tempFilePaths[0]);
          that.upImgs(res.tempFilePaths[0], 0) //调用上传方法
        }
      }) 
    },
    upImgs: function (imgurl, index) {
      var that = this;
      wx.uploadFile({
        url: 'http://139.9.154.145/student/base/uploadImg',//
        filePath: imgurl,
        name: 'file',
        header: {
          'content-type': 'multipart/form-data'
        },
        formData: null,
        success: function (res) {
          console.log(res) //接口返回网络路径
          var data = JSON.parse(res.data)
            that.data.picPaths.push(data['data'])
            that.setData({
              picPaths: that.data.picPaths,
              imgShow:false
            })
            console.log(that.data.picPaths)
        }
      })
    },


  // 获取个人资料
    async getPersonalData(){
      let res =await queryPersonalData();
      if(res.code==200){
        res.data.birthday=res.data.birthday.split(" ")[0]
        this.setData({
          userdata:res.data
        })
      }
    }
})
