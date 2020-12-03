import {
  queryExaminationInfo
} from "../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionStatus: ['全部', '正确', '扣分'],
    btnIndex: 0, //选中的id
    stuInfo: {}, //学生信息
    testInfo: {}, //题库详情
    tiku: [{
        da: "A",
        xsda: "B"
      }, {
        da: "c",
        xsda: "c"
      }, {
        da: "B",
        xsda: "A"
      }, {
        da: "C",
        xsda: "D"
      },
      {
        da: "A",
        xsda: "A"
      }, {
        da: "A",
        xsda: "B"
      }, {
        da: "A",
        xsda: "D"
      }, {
        da: "A",
        xsda: "B"
      }, {
        da: "A",
        xsda: "B"
      }, {
        da: "A",
        xsda: "A"
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      stuInfo: JSON.parse(options.queryObj)
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
    this.queryExaminationInfo()
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
  go_back() {
    wx.navigateBack();
  },
  activeBtn(e) { // 全部/正确/扣分切换
    this.setData({
      btnIndex: e.target.dataset.index
    })
  },
  goAnswerInfo() { // 查看单题解析跳转
    let testList = this.data.testInfo.list
    let id =this.data.stuInfo.id; 
    wx.navigateTo({
      url: '/pages/answerInfo/answerInfo'+'?id='+id,
    })
  },

  async queryExaminationInfo() { //查看题目
    let pamars = {
      id: this.data.stuInfo.id
    }
    let res = await queryExaminationInfo(pamars);
    if (res.code == 200) {
      res.data.list.forEach(item=>{
        let answer = item.answer.split("%&");
        if(!item.studentAnswer){
          item.isTrue=false
        }else{
          item.isTrue = answer.every(x=>{
            return item.studentAnswer.indexOf(x)!==-1
          })
        }
        
      })
      this.setData({
        testInfo: res.data,
      })
    }

  }


})