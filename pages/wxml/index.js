//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        openId:"",
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        APIItem:{
            zhName: '进入答题',
            enName: 'enter question',
            url: '../logs/logs'
        }
    },
    onLoad: function () {
        var that = this
        wx.login({
            success (res) {
                if (res.code) {
                    //发起网络请求
                    wx.request({
                        url: 'http://25c894c0.ngrok.io/getAccessToken',
                        data: {
                            code: res.code
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
        if (app.globalData.hasLogin === false) {
            wx.login({
                success: _getUserInfo
            })
        } else {
            _getUserInfo()
        }

        function _getUserInfo() {
            wx.getUserInfo({
                success: function (res) {
                    that.setData({
                        hasUserInfo: true,
                        userInfo: res.userInfo
                    })
                    that.update()
                }
            })
        }
    },
    radioChange: function(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
    }
})
