// pages/index/plan.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        region: "",
        examType: "",
        dailyNeedNum: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        //发起网络请求
        wx.request({
            url: 'http://0a50bbee.ngrok.io/getPlan',
            data: {
                accessToken: app.globalData.accessToken
            },
            success(resp) {
                console.log(resp)
                if (resp.data["data"]["code"] == 200) {
                    var plan = resp.data["data"]["data"]
                    console.log("region is :" + plan["region"])
                    that.setData({
                        region: plan["region"],
                        examType: plan["exam_type"],
                        dailyNeedNum: plan["daily_need_num"]
                    })
                    that.update()
                }
            }
        })

    },
})