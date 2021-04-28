// components/calendar/calendar.js
import * as utils from "../../utils/getData";
import {timeType} from "../../utils/filter";
import {queryTeacherSchedule} from "../../utils/api"
let {year,month,day} = utils.getYearMonthDay(new Date());
let now=utils.getYearMonthDay(new Date());

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classId:{
      type:String
    },
    studentId:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    week: ["日", "一", "二", "三", "四", "五", "六"],
    time:{year,month,day},  //当前时间  用来存储用户点击下一个月时候的更改
    dayArrs:[],           //7*5的日历表当前是多少号 [30,31,1,2,3]
    timeArr:[],  //为转换成的时间格式,类似于new Date()时间格式  格式[2020/11/12]
    isMonth:"", //判断是否是当前月
    today:new Date().getDate(), //当前时间
    currentMonth:new Date().getMonth(), //当前月
    currenYear:new Date().getFullYear(), //当前年份
    now:now,  //现在的年月日    不会改变  
    ischeckDay:'', //用户点击日历时 把点击的年月日传过来 用来判断用户点击的样式
    isShowMonth:true, //用户点击月显示月  点击周显示周 的开关
    todayIndex:"",   //获取当前几号的下标
    MonthCourse:[],   //这个月哪几天有课
  },
  // handelClici(){},
  // app.watch(this.han)
  // 监听  应该放在全局
  watch(method) {
    var obj = this.globalData;
    Object.defineProperty(obj, "resData", {
        configurable: true,
        enumerable: true,
        set: function(value) {
          // console.log("ischeckDay=",ischeckDay);
            this._resData = value;
            method(value);
        },
        get: function() {
            // 可以在这里打印一些东西，然后在其他界面调用getApp().globalData.name的时候，这里就会执行。
            console.log(this._resData)
            return this._resData;
        },
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 首页获取5*7日历的日历表
    visible(){
      //调用获取月中那天有课
      this.get_TeacherSchedule();
      let that=this;
    let arr=[];//把new Date()格式化成 .getDate() [30,31,1...]
    let arr1=[];//把new Date()格式化成[2020/11/12,...]
      // 获取当前年月
    // let {year,month}=utils.getYearMonthDay(new Date());
    let {year,month}=that.data.time; 
    let currrentfirstDay=utils.getDate(year,month,1); //new Date(2020,11,1);
    let week = currrentfirstDay.getDay(); //这个月当前天是星期几；
    let startDay=currrentfirstDay - week*60*60*1000*24; //获取第一天是多少号
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
    this.getTodayIndex();
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
          time:utils.getYearMonthDay(d),
        })
        // this.time=utils.getYearMonthDay(d);
        this.visible();
    },
    // 下一个月
    nextMonth(){
      var d= utils.getDate(this.data.time.year,this.data.time.month,1);
      console.log(d);
      d.setMonth(d.getMonth()+1);
      this.setData({
        time:utils.getYearMonthDay(d)
      })
      console.log("肖高杰",this.data.time);
      this.visible();
  },
  // 点击选择当前天数
  checkDay(e){
    let index=e.currentTarget.dataset.in;
    console.log(index);
   console.log(timeType(index));
    this.triggerEvent("checkDay", timeType(index),)
    this.setData({ischeckDay:index}) 
  },
  // 点击选择周
  checkout_week(){
    console.log('周')
    this.setData({
      isShowMonth:false
    })
  },
  // 点击选择月
  checkout_month(){
    this.setData({
      isShowMonth:true
    })
    console.log('月')
  },
  // 获取当前日的下标
  getTodayIndex(){
    let todayIndex="";
    let {now,timeArr}=this.data;
    let nowType=now.year+"/"+now.month+"/"+now.day
    timeArr.forEach((item,index)=>{
      if(item==nowType){
        todayIndex=index
      }
    })
    this.setData({todayIndex});
    console.log("todayIndex=",todayIndex);

  },
  addZero(num){
    if(num<10){
      return "0"+num
    }else{
      return num
    }
  },
  // 按月查询哪天有课（教师/学生/班级）
  async get_TeacherSchedule(){
    let {classId,studentId,time} = this.data;
    
    // let _time=timeType(time.year+"/"+time.month)   //这是给服务器上传的时间参数（2020-09）
    let _time=time.year+"-"+this.addZero(time.month+1) 
    console.log("_time==>",_time);
    let pamars={
      classId,
      studentId,
      time:_time
    }
    let res = await queryTeacherSchedule(pamars)
    res.data.forEach(item=>{
      item.strTime=timeType(item.strTime);
    })
    console.log("肖高杰二号=",res.data);
     this.setData({
        MonthCourse:res.data
      })

    /*        ------测试数据------
    let testArr = [{number:1,strTime:"2020-12-20"},{number:2,strTime:"2020-12-28"}];
    testArr.forEach(item=>{
      item.strTime=timeType(item.strTime);
    })
    console.log("testArr==",testArr);
    this.setData({
      MonthCourse:testArr
    })
      */

  },
  async test(){
    let pamars={
      classId:this.data.classId,
      studentId:this.data.studentId,
      time:'2020-11'
    }
    let res = await queryTeacherSchedule(pamars)
    res.data.forEach(item=>{
      item.strTime=timeType(item.strTime);
    })
    this.setData({
      MonthCourse:res.data
    })
    console.log(res.data);
  },


  //按周显示滑动多少米
  scrollLeft(){
    console.log('左滑动') 
    this.setAction({
      scrollLeft: 44
    })
  },
  scroll(e) {
    // this.scrollLeft();
    let todayIndex=this.data.todayIndex;
    todayIndex=(todayIndex-todayIndex % 7) * 55;  //首次切换周的时候滚动到当前天数
    console.log("todayIndex=",todayIndex);
    //一个距离是48;
    console.log(e)
    todayIndex > 6 ? todayIndex=todayIndex % 7 : todayIndex;
    console.log(todayIndex);
  },
  },
  options: {
    addGlobalClass: true
  }
})
