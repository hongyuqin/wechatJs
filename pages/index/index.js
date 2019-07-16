//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      userInfo: {},
      home:{},
      hasUserInfo: false,
      hasLogin: false
  },
  onLoad: function () {
    var that = this
    wx.login({
      success (res) {
        console.log("trying to login")
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.serverUrl+'/getAccessToken',
            data: {
              code: res.code
            },
            success (resp) {
              app.globalData.hasLogin = true
              console.log(resp.data.data.accessToken)
              app.globalData.accessToken = resp.data.data.accessToken
                _getHome()
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 查看是否授权
    wx.getSetting({
        success (res){
            if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                    success: function(res) {
                        console.log(res.userInfo)
                        app.hasUserInfo = true
                        app.userInfo = res.userInfo
                    }
                })
            }
        }
    })
    function _getHome() {
      wx.request({
          url: app.globalData.serverUrl+'/home',
          data: {
              accessToken: app.globalData.accessToken
          },
          success(resp) {
              if (resp.data.code == 200) {
                  that.setData({
                      home:resp.data.data
                  })
              }
          }
      })
    }
  },

  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  bindGetUserInfo (e) {
      console.log(e.detail.userInfo)
  }
})
