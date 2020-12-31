// myB/pages/cooperation/pages/organization/organization.js
// import WxValidate from '../../../../../utils/WxValidate'
// import area from '../../../../../utils/area'
// import ajax from '../../../../../utils/request'
// import {optMechanismApply,getCityJson} from '../../../../../utils/api
const app = getApp()
import area from '../../../utils/area'
import {optMechanismApply} from "../../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
      contactPerson: '',
      contactNumber : '',
      city:'',
      addVal: '',
      remarkVal: '',
      areaList: [],
      show: false,
      provinceName: '', //省名
      provinceCode: null, //省code
      cityName: '', //市名
      cityCode: null, //市code
      districtName: '', //区县名
      districtCode: null, //区县code
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      areaList: area
    })
    console.log('this.setData',this.data.areaList);
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
  async getoptMechanismApply(){ //申请操作
    try{
      let params = {
        address: this.data.addVal,
        city: this.data.cityName,
        cityCode: this.data.cityCode, //市code
        contactNumber: this.data.contactNumber ,
        contactPerson: this.data.contactPerson,
        district: this.data.districtName,
        districtCode: this.data.districtCode, //区县code
        province: this.data.provinceName,
        provinceCode: this.data.provinceCode, //省code
        remark: this.data.remarkVal
      }
      let res = await optMechanismApply(params);
      console.log(res);
      if(code === 200) {
        return wx.showToast({
          title: '提交成功',
        })
      }else {
        return wx.showToast({
          title: msg,
          icon: 'none'
        })
      }
      
    }catch(err){

    }
  },
  async getcityJson(){ //获取省市区
    try{
      let {data} = await ajax.post(getCityJson,{
        parentId: 0
      })
      console.log(data);
      if(data.code === 200) {
        this.setData({
          areaList: data.data
        })
      }
    }catch(err) {
      return wx.showToast({
        title: '获取省市区失败',
        icon: 'none'
      })
    }
  },
  showPop(){ //打开地图弹框
    this.setData({
      show: true
    })
  },
  onClose(){
    this.setData({
      show: false
    })
  },
  confirmCity(e){//选择城市--确认
    console.log(e.detail.values);
    this.setData({
      provinceCode: e.detail.values[0].code,
      provinceName: e.detail.values[0].name,
      cityCode: e.detail.values[1].code,
      cityName: e.detail.values[1].name,
      districtCode: e.detail.values[2].code,
      districtName: e.detail.values[2].name,
      city: e.detail.values[0].name + '-' + e.detail.values[1].name + '-' + e.detail.values[2].name,
      show: false
    })
    console.log(this.data);
  },
  cancelCity(){//选择城市--取消
    return this.setData({
      show: false
    })
  },
  async send(e){
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    let {provinceName,provinceCode,cityName,cityCode,districtName,districtCode} = this.data;
    const data = {
      province :provinceName,
      provinceCode:provinceCode,
      city:cityName,
      cityCode:cityCode,
      district:districtName,
      districtCode:districtCode
    }
    if(!params.contactPerson){
      app.Toast("请输入联系人");
      return 
    }
    if(!params.contactNumber){
      app.Toast("请输入联系电话");
      return 
    }
    if(!params.address){
      app.Toast("请输入联系地址");
      return 
    }
    if(!this.data.provinceCode){
      app.Toast("请选择省市区")
      return 
    }
     //params data
     console.log(Object.assign(params,data));
    let result =await optMechanismApply(Object.assign(params,data));
    console.log(result);
    if(result.code === 200) {
     wx.showToast({
        title: '提交成功',
      })
      setTimeout(()=>{
        wx.navigateTo({
          url: '../../login/login',
        })
      },2000)
    }else {
      return wx.showToast({
        title:result.msg,
        icon: 'none'
      })
    }
  }
})