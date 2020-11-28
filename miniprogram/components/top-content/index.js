// components/top-content/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isTitle:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    nickname:"1"
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
      console.log("nickname=",name);
    }
  },
  onLoad(){
    this.test()
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
