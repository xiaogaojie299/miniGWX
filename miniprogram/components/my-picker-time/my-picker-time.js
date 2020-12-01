// components/my-picker-time/my-picker-time.js
import {dateType} from "../../utils/filter"
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
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return `${value}日`;
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onInput(event) {
      this.setData({
        currentDate: event.detail,
      });
      // this.triggerEvent('selectTime',)
    },

    //用户点击完成

    confirm(event){
      let time =event.detail;
      time=dateType(new Date(time));
      console.log( time );
      this.triggerEvent('selectTime',time)
    },

    //用户点击取消
    cancel(event){
      
      this.triggerEvent('timeCancel',1)
    }
  }
})
