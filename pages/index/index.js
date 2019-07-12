//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  onLoad: function () {
    wx.login({
      success (res) {
        console.log("trying to login")
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://0a50bbee.ngrok.io/getAccessToken',
            data: {
              code: res.code
            },
            success (resp) {
              console.log(resp.data["data"]["accessToken"])
              app.globalData.accessToken = resp.data["data"]["accessToken"]
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })



  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  }
})
