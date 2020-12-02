// components/top-content/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isTitle:{
      type:Boolean,
      value:true,
      observer(newVal,oldVa){
            console.log(newVal,oldVa)
      },
    },
    nickname:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // nickname:wx.getStorageSync('nickName')
  },

  /**
   * 组件的方法列表
   */
  methods: {
    test(){
      let name=wx.getStorageSync('userInfo').nickname;
      this.setData({
        nickname:name
      })
    }
  },
  onLoad(){
    this.test()
  },
  onshow(){
    this.setData({
      nickname:wx.getStorageSync('nickName')
    })
  },
  lifetimes:{
    created(){
      this.test()
    },
  },

  options: {
    addGlobalClass: true
  }
})
