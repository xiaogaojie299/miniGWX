// components/calendar/calendar.js
import * as utils from "../../utils/getData";
let {year,month,day} = utils.getYearMonthDay(new Date());
let now=utils.getYearMonthDay(new Date());
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
    todayIndex:""   //获取当前几号的下标
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
      this.visible();
  },
  // 点击选择当前天数
  checkDay(e){
    let index=e.currentTarget.dataset.in;
    console.log(index);
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
