class Ajax {
  //定义baseURL
  constructor(parms) {
      this.baseURL = parms.baseURL
  }

  // get 请求
  get(url, data) {
      return this.ajax('GET', url, data)
  }

  // post 请求
  post(url, data,type) {
      return this.ajax('POST', url, data,type)
  }
  // 公共请求方法
  ajax(method, url, data,type) {
      wx.showLoading({
          title: '加载中',
          mask: false
      })
      return new Promise((resolve, reject) => {
          wx.request({
              url: this.baseURL + url,
              data,
              header: {
              "Authorization": "Bearer " + wx.getStorageSync('userInfo').token,
                "content-type": type||"application/x-www-form-urlencoded",
              },
              method,
              dataType: 'json',
              responseType: 'text',
              success: res => {
                  resolve(res.data)
              },
              fail: err => {
                  wx.showToast({
                    title: '网络错误',
                    icon:"none"
                  })
                  reject(err)
              },
              complete: res => {
                  wx.hideLoading()
              }
          })
      })
  }
}

const ajax = new Ajax({
    baseURL:"http://139.9.154.145:80/teacher"
})

/**
*  全部导出  ajax.get() 调用
*/
export default ajax

/**
*  单个导出 解构赋值 { getBanner } 调用
*/