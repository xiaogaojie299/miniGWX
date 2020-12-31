//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    this.globalData = {}
  },
  Toast(msg){
    wx.showToast({
      title: msg,
      duration: 2000,
      icon:'none'
     });
  },
  //多张图片上传
 //多张上传

 uploadimg:function(data){
  var that = this;
  console.log(data);
  let promiseArr = [];
  let picList=[];
  for (var i = 0;i<data.length;i++){
    console.log("i=",i);
    promiseArr.push(new Promise((reslove,reject)=>{

      wx.uploadFile({
        url: 'https://gengwoxue.com:443/student/base/uploadImg',//
        filePath: data[i],
        name: 'file',
        header: {
          'content-type': 'multipart/form-data'
        },
        formData: null,
        success: function (res) {
          var data = JSON.parse(res.data);
          reslove(data.data);
        }
      })
    }))
    }
    return Promise.all(promiseArr);
  //  Promise.all(promiseArr).then(res => {
  //    console.log(res)
  //     picList=res;
  //     return picList
  //   })
    //等数组都做完后做then方法
},
})
