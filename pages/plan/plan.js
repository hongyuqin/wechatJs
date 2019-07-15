// pages/index/wrongTopic.js
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
            url: app.serverUrl+'getPlan',
            data: {
                accessToken: app.globalData.accessToken
            },
            success(resp) {
                if (resp.data.code == 200) {
                    var plan = resp.data.data
                    that.setData({
                        region: plan.region,
                        examType: plan.exam_type,
                        dailyNeedNum: plan.daily_need_num
                    })
                }
            }
        })

    },
})