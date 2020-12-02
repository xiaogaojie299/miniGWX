// components/radio-button/radio-button.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true
  },
  properties: {
    currentActive:{
      type:Number,
      value:1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 默认选中的单选框
    // 选中icon
    selected:"/images/icon_radiobutton_selected.png",
    // 未选中icon
    unselect:"/images/icon_radiobutton.png"
  },
  /**
   * 组件的方法列表
   */
  methods: {
    checkoutBtn(e){
      console.log(e);
      // this.currentActive=i;
      this.triggerEvent("selectSex",e.currentTarget.dataset.index)
      this.setData({
         
        currentActive:e.currentTarget.dataset.index,

      })
      console.log("this.currentActive",this.data.currentActive)
  }
  }
})
