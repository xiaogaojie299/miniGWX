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
  uploadimg:function(data){
  var that=this,
  i=data.i?data.i:0,
  success=data.success?data.success:0,
  fail=data.fail?data.fail:0;
  wx.uploadFile({
  url: data.url, 
  filePath: data.path[i],
  name: 'fileData',
  formData:null,
  success: (resp) => {
  success++;
  console.log(resp)
  console.log(i);
  //这里可能有BUG，失败也会执行这里
  },
  fail: (res) => {
  fail++;
  console.log('fail:'+i+"fail:"+fail);
  },
  complete: () => {
  console.log(i);
  i++;
  if(i==data.path.length){ //当图片传完时，停止调用 
  console.log('执行完毕');
  console.log('成功：'+success+" 失败："+fail);
  }else{//若图片还没有传完，则继续调用函数
  console.log(i);
  data.i=i;
  data.success=success;
  data.fail=fail;
  that.uploadimg(data);
  }
   
  }
  });
  }
})
