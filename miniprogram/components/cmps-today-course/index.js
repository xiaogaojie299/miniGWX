// components/cmps-today-course/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    curseItem:{
      type:Object
    }
  },
  onLoad(){
    console.log("todayCaurse",this.data.curseItem);
  },
  /**
   * 组件的初始数据
   */
  data: {
    rankList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    submit(){
      console.log("你好",this.data.curseItem)
    }
  },
  created(){
  }
})
