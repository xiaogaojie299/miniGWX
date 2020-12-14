const app=getApp()
import {validatePhoneNumber} from "../../../utils/regular"
import {
  queryAllSubjects,optTeacherApply
} from "../../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],
    isShow: false,
    isgoodSubject: false,
    columns: ["博士", "硕士", "本科", "专科"],
    subjectList: [], //课程列表
    selectSubject: [], //选中的数据
    name: "", //输入的姓名
    sex:1,    //性别
    phone: "", //电话
    address: "", //联系地址
    resume: "", //个人简历
    birthday: "", //生日   
    school: "", //毕业院校
    education: "", //最高学历
    major: "", //所学专业
    subjectIds:"",   //选择的课程ID 
    picPaths:[]       //上传的路径     
  },
  //输入姓名
  inputName(e) {
    this.setData({
      name: e.detail.value
    })
  },

  // 选择性别
  selectSex(event){
    this.setData({
      sex:event.currentTarget.dataset.sex
    })
    console.log(this.data.sex);
  },

  //输入手机号
  inputPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  //  联系地址
  inputAddress(e) {
    this.setData({
      address: e.detail.value
    })
  },

  // 个人简历
  inputResume(e) {
    this.setData({
      resume: e.detail.value
    })
  },

  // 毕业院校
  inputSchool(e) {
    this.setData({
      school: e.detail.value
    })
  },

  // 所学专业
  inputMajor(e) {
    this.setData({
      major: e.detail.value
    })
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

  // 弹出生日时间选择器
  birthday_pop() {
    this.setData({
      isShow: true
    });
  },

  //时间组件传过来的值
  selectTime(time) {
    this.setData({
      isShow: false,
      birthday: time.detail
    })
    console.log("time==", time)
  },
  //选择时间点击取消 关闭遮罩层
  timeCancel(event) {
    console.log("1");
    this.setData({
      isShow: false,
    })
  },

  //选择最高学历
  selectEducation(event) {
    this.setData({
      education: event.detail
    })
  },
  
  //提交
  async submit(){
    let {name,sex,phone,address,resume,birthday,school,education,major,subjectIds,picPaths}=this.data;
    if(!name){
      app.Toast("姓名不能为空")
      return 
    }
    if(!phone){
      app.Toast("请输入联系电话")
      return 
    }
    if(!validatePhoneNumber(phone)){
      app.Toast("请输入正确的电话")
      return 
    }
    if(!address){
      app.Toast("请输入联系地址")
      return 
    }
    if(!birthday){
      app.Toast("请输入您的生日")
      return 
    }
    if(!school){
      app.Toast("请输入您的毕业院校")
      return 
    }

    if(!education){
      app.Toast("请输入您的最高学历")
      return 
    }

    if(!major){
      app.Toast("请输入您所学专业")
      return 
    }

    if(picPaths.length==0){
      app.Toast("请输入您擅长课程")
      return 
    }
    if(picPaths.length==0){
      app.Toast("请上传宁的资质证书")
    }
    
    let pamars = {
      name :name, //姓名
      sex:sex,   //性别
      phone:phone,  //联系电话
      address:address, //联系地址
      introduction :resume,     //个人简历
      birthday:birthday,         //生日
      graduatedSchool : school,  //毕业院校
      highestEducation :education, //最高学历
      major:major,               //所学专业
      subjectIds:subjectIds,     //选择班级
      qualificationImg:picPaths.toString()     //上传的图片
    }
    console.log(pamars);
  let res =await optTeacherApply(pamars);
  if(res.code==200){
    wx.showToast({
      title: '申请成功',
    }) 
    setTimeout(()=>{
      wx.navigateTo({
        url: '/pages/login/login',
      })
    },1500) 
  }
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
       app.uploadimg(res.tempFilePaths).then(res=>{
         console.log("res==>",res);
         _this.setData({
          picPaths: _this.data.picPaths.concat(res)
        })
          // picPaths
        // _this.setData({
        //   tempFilePaths: tempFiles
        // });
       });
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
            picPaths: that.data.picPaths
          })
          console.log(that.data.picPaths)
      }
    })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllSubjects()
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