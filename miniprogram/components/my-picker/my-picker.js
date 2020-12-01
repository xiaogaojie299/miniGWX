// components/my-picker/my-picker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    columns:{
      type:Array,
      value:[],
      observer(val,oldval){
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow:false,
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    open_pop(){
      this.setData({ isShow: true });
    },
    onClose() {
      this.setData({ isShow: false });
    },
    onChange(event) {
      const { picker, value, index } = event.detail;
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onConfirm(event) {
      const { picker, value, index } = event.detail;
      console.log(picker,value,index)
      this.triggerEvent('selectEducation',value)
      this.setData({
        isShow:false
      })
    },
    onCancel() {
      console.log('取消');
      this.setData({
        isShow:false
      })
    },
  }
})
