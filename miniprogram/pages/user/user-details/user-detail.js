import {
  queryAllSubjects,optPersonalData,queryPersonalData
} from "../../../utils/api"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userdata:{}, 
    picPaths:"",

    birthday:"",  
    subjects:"",      //选中的课程
    subjectIds:"",    //  选中的课程id
    imgShow:true,    //用户上传成功切换图片显示
    isgoodSubject:false,  //选择科目弹框开关  
    subjectList:[],          //课程列表
    isShow:false,           //控制出生日期
    qualificationImg:[]     //教师资格证书
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllSubjects();
    setTimeout(()=>{
    this.getPersonalData();
    },500)
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
  // 用户输入昵称
  inputNickname(e){
    let {userdata}=this.data;
    userdata.nickname=e.detail.value
    this.setData({
      userdata
    })
  },

  // 用户选择性别
  checkoutSex(event){
    let {userdata}=this.data;
    console.log(event)
    userdata.sex=event.currentTarget.dataset.sex;
    this.setData({
      userdata
    })
  },

  selectSex(e){
    console.log(e.detail)
    let {userdata}=this.data;
    userdata.sex=e.detail;
    this.setData({
      userdata
    })
  },

  //用户输入个人签名
  inputIntroduction(e){
    let {userdata}=this.data;
    userdata.introduction=e.detail.value
    this.setData({
      userdata
    })
  },

  //控制时间选择器
  onClose() {
    this.setData({
      isShow: false
    });
  },

   //时间组件传过来的值
   selectTime(time) {
     let {userdata} = this.data;
     userdata.birthday=time.detail
    this.setData({
      isShow: false,
      userdata: userdata
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
    console.log("获取课程详情");
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

    //点击空白关闭选择科目遮罩层
    onCloseGoodSub() {
      this.setData({
        isgoodSubject: false
      });
    },

    //删除资质图片
    delImage(event){
        let index = event.currentTarget.dataset.index;
        let arr= this.data.qualificationImg;
        arr.splice(index,1);
        console.log("arr=",arr);
        this.setData({
          qualificationImg:arr
        })
    },

    // 图片上传
    chooseimage: function chooseimage(event) {
      console.log(event.currentTarget);
      let type = event.currentTarget.dataset.type||1;
      var _this = this;
      wx.chooseImage({
        count:type==1?1:3, // 默认9  
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: function success(res) {
          wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            mask: true,
            duration: 1000
          });
          console.log("type",type);
          console.log(res.tempFilePaths);
          type==1?_this.upImgs(res.tempFilePaths[0]):_this.uploadimg(res.tempFilePaths);
        }
      });
      
    },
    upImgs: function (imgurl, index) {
      var that = this;
        wx.uploadFile({
          url: 'https://gengwoxue.com:443/student/base/uploadImg',//
          filePath: imgurl,
          name: 'file',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: null,
          success: function (res) {
            console.log(JSON.parse(res.data)['data']) //接口返回网络路径
              const picPaths=JSON.parse(res.data)['data'];
              let {userdata} = that.data;
              userdata.avatar=picPaths;
              that.setData({
                userdata: userdata,
                imgShow:false
              })
              console.log(that.data.userdata.avatar)
          }
        })

    },

    //多张上传

    uploadimg:function(data){
      var that = this;
      console.log(data);
      let promiseArr = [];
      for (var i = 0;i<data.length;i++){
        console.log("i=",i);
        promiseArr.push(new Promise((reslove,reject)=>{

          wx.uploadFile({
            url: 'https://gengwoxue.com:443/student/base/uploadImg',//
            filePath: data[i],
            name: 'file',
            header: {
              'content-type': 'multipart/form-data'
            },
            formData: null,
            success: function (res) {
              var data = JSON.parse(res.data);
              reslove(data.data);
            }
          })
        }))
        }
        console.log(promiseArr[0].then(res=>{res}));
        Promise.all(promiseArr).then(res => {
          that.setData({
            qualificationImg:that.data.qualificationImg.concat(res)
          })
          console.log("qualificationImg==>",that.data.qualificationImg)
        })//等数组都做完后做then方法

    },

    //上传FORM表单
    async submit(){
      let pamars=this.data.userdata;
      let subjectIds=this.data.subjectIds;
      pamars.qualificationImg=this.data.qualificationImg.toString();
      pamars.coursesubjectsIds=subjectIds;
      console.log("pamars==>",pamars);
      if(!pamars.nickname){
          app.Toast("昵称不能为空")
         return
        }
        if(!pamars.coursesubjectsIds){
          app.Toast("请选择擅长课程")
          return
      }
      if(!pamars.qualificationImg){
        app.Toast("请上传资格证书")
        return
      }

      let res = await optPersonalData(pamars);
      if(res.code==200){
        wx.showToast({
          title: '修改信息成功',
        })
        setTimeout(()=>{
          // 跳转到我的页面
          wx.switchTab({
            url: '/pages/user/index',
          })
        },1000)
      }
    },

  // 获取个人资料
    async getPersonalData(){
      let res =await queryPersonalData();
      if(res.code==200){
        // 将用户名字存储
        wx.setStorageSync('nickName', res.data.nickname);
        wx.setStorageSync('userdata',res.data);
        res.data.birthday=res.data.birthday.split(" ")[0];
        let subjectName=res.data.coursesubjectsIds.split(",");
        let transition="";
        let subjectId = [];
        let qualificationImg=[];
        if(res.data.qualificationImg.length>0){
          qualificationImg=res.data.qualificationImg.includes(",")?res.data.qualificationImg.split(","):[res.data.qualificationImg];
        } else{
          qualificationImg=[]
        }
     
        this.data.subjectList.forEach(item=>{
          for (var i = 0;i<subjectName.length;i++){
            if(subjectName[i]==item.id){
              transition+=item.name+"/"; 
              subjectId.push(item.id);
            }
          }
        })
        console.log("qualificationImg==",qualificationImg);
        console.log("transition=",transition);
        transition=transition.slice(0,-1);
        this.setData({
          userdata:res.data,
          subjects:transition,
          subjectIds:subjectId.toString(),
          qualificationImg:qualificationImg
        })
      }else{
        app.Toast("网络错误")
      }
    }
})
