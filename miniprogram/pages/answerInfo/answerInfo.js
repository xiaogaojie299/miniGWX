import {
  queryExaminationInfo
} from "../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionType: 2, //0--单选,1--填空,2--简答
    optionsList: [ //题目选项
      {right: 0,name: 'A',info:'答案一'},
      {right: 1,name: 'B',info:'答案二'},
      {right: 0,name: 'C',info:'答案三'}
  ],
    rightIndex: 0, //单选正确的选项
    testList:[],     //考试列表
    id:"",           //考试与关系ID
    i:0,             //控制下一题的或者上一题的下标
    player:false     //判断解析是否在播放    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    }),
    this.queryExaminationInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      // 使用 wx.createAudioContext 获取 audio 上下文 context
      this.audioCtx = wx.createAudioContext('myAudio')
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
  rightOption(e){
    console.log(e.currentTarget.dataset.index);
  },
  async queryExaminationInfo() { //查看题目
    //id: this.data.id
    let pamars = {
      id:this.data.id
    }
    let res = await queryExaminationInfo(pamars);
    if (res.code == 200) {
      let testObj1 = {
        //测试数据
        answer: "A%&C",
        audio: "",
        id: 0,
        img:
          "https://beixiaorui.obs.cn-southwest-2.myhuaweicloud.com/8b8d0d9e119f4566bc98ca02cc88c7e6.jpg",
        options: "A：测试多选A%&B：测试多选B%&C：测试多选C%&D：测试多选D",
        points: 10,
        prompt: "",
        studentAnswer: "",
        studentAnswerUrl: "",
        studentScore: 0,
        studentState: 0,
        teacherAudio: "",
        teacherImg: "",
        teacherRemark: "",
        title: "这是一道多选题",
        type: 3,
      };
      res.data.list.push(testObj1);
      let arr =[];  //单选题
      let pdArr=[]  //判断题
      res.data.list.forEach(item=>{
      if(item.type==2||item.type==3){
        arr = [];
        item.options = item.options.split("%&");
        item.options.forEach(x=>{
        let obj ={}
          obj.name= x.split('：')[0];
          obj.info = x.split('：')[1];
          obj.isCorrect = item.answer.includes(obj.name);
          arr.push(obj) 
        })
      item.options=arr
      } else if(item.type==4){
        item.options = item.options.split("%&");
        item.options.forEach((item,index)=>{
        let obj ={}
          obj.name=index==0?"A":"B";
          obj.info = item
          pdArr.push(obj)
        })

      item.options=pdArr
      }
      })
      this.setData({
        testList: res.data.list,
        dxAnswer:arr
      })
      console.log("testInfo",this.data.testList)
    }

  },
  next(){//下一题
    let {i,testList} = this.data;
    i<testList.length-1?i++:i;
    this.setData({
      i,
      player:false
    })
  },
  previde(){
    let {i,testList} = this.data;
    i<=0?i:i--;
    this.setData({
      i,
      player:false
    })
  },

  audioPlay: function () {
    let player = this.data.player;
    
    if(!this.data.testList[this.data.i].audio){
      wx.showToast({
        title: '暂无语音解析',
        icon:'none'
      })
      return 
    }
    this.setData({
      player:!player
    })
    console.log(player)
    if(player){ //暂停
      this.audioCtx.pause();
      console.log(player)
    }else{  //播放
      this.audioCtx.play()
    }
  },
  end:function(){
    this.setData({
      player:false
    })
  },
  audioPause: function () {
  },

})