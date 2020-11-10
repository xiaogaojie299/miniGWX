// components/calendar/calendar.js
import * as utils from "../../utils/getData";
let {year,month,day} = utils.getYearMonthDay(new Date());
console.log(year,month,day);
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
    week: ["日", "一", "二", "三", "四", "五", "六"],
    time:{year,month,day},
    dayArrs:[],
    timeArr:[],  //为转换成的时间格式,类似于new Date()时间格式
    isMonth:"" //判断是否是当前月
  },
  /**
   * 组件的方法列表
   */
  methods: {
    visible(){
    let that=this;
    let arr=[];
    let arr1=[];
      // 获取当前年月
    // let {year,month}=utils.getYearMonthDay(new Date());
    let {year,month}=that.data.time;
    console.log(year,month);
    let currrentfirstDay=utils.getDate(year,month,1);
    // 获取当前月份的第一周是星期几
    let week = currrentfirstDay.getDay();
    // 获取第一天是多少号
    let startDay=currrentfirstDay - week*60*60*1000*24;
    console.log(startDay);
    console.log("week=");
     // 开始循环
    for(let i=0;i<35;i++){
      arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24));
      arr1.push(utils.getTimer(new Date(startDay + i * 60 * 60 * 1000 * 24)))
    }
    // let arr1=[...arr];
    this.setData({timeArr:arr1})
    console.log('timeArr=',this.data.timeArr);
    arr.forEach((item,index,arr)=>{
      arr[index]=item.getDate()
    });
    this.setData({dayArrs:arr})
    console.log("dayArrs=",that.data.dayArrs)
    },
    // 判断是否是当前月
    isMoney(e){
      // 将当前月转换成new Date()时间格式
      let index=e.currentTarget.dataset.in;
      console.log(this.data.timeArr[index]);
      let {year,month}=this.data.time;
      let {year:y,month:m}=utils.getYearMonthDay(this.data.timeArr[index]);
      console.log('year=',y,"month=",m)
      console.log(year==y&&month==m);
      this.setData({
        isMonth :  year==y&&month==m
      })
    },
    // 上一月
    previousMonth(){
      var d= utils.getDate(this.data.time.year,this.data.time.month,1);
        console.log(d);
        d.setMonth(d.getMonth()-1);
        this.setData({
          time:utils.getYearMonthDay(d)
        })
        // this.time=utils.getYearMonthDay(d);
        this.visible();
    },
    nextMonth(){
      var d= utils.getDate(this.data.time.year,this.data.time.month,1);
      console.log(d);
      d.setMonth(d.getMonth()+1);
      this.setData({
        time:utils.getYearMonthDay(d)
      })
      this.visible();
  }
  },
  options: {
    addGlobalClass: true
  }
})
