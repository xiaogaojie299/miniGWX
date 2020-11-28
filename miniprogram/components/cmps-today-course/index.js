// components/cmps-today-course/index.js
import {queryClassHourRand} from "../../utils/api"
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    async get_ClassHourRand(){
      console.log(queryClassHourRand);
      let {code,data} = await queryClassHourRand();
      if(code==200){
        this.setData({rankList:data})
        console.log("数据==》",this.data.rankList);
      }
    },
  },
  created(){
    this.get_ClassHourRand()
  }
})
