// pages/index/wrongTopic.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topicId: 0,
        topic: {},
        items: [
            {name: 'A', value: '', checked: 'true'},
            {name: 'B', value: ''},
            {name: 'C', value: ''},
            {name: 'D', value: ''},
        ],
        answer: '',
        hasSubmit: false,
        result: {},
        operate: '',
        index: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        var changed = {}
        //发起网络请求
        wx.request({
            url: 'http://a93e3501.ngrok.io/nextTopic',
            data: {
                accessToken: app.globalData.accessToken,
                operate: this.data.operate,
                index: this.data.index
            },
            success(resp) {
                if (resp.data.code == 200) {
                    var topic = resp.data.data
                    changed['topicId'] = topic.topic_id
                    changed['items[0].value'] = topic.option_a
                    changed['items[1].value'] = topic.option_b
                    changed['items[2].value'] = topic.option_c
                    changed['items[3].value'] = topic.option_d
                    that.setData({
                        topic: topic,
                        index: topic.index
                    })
                    that.setData(changed)
                }
            }
        })
    },
    submit: function () {
        var that = this
        var changed = {}
        wx.request({
            url: 'http://a93e3501.ngrok.io/answer',
            data: {
                accessToken: app.globalData.accessToken,
                topic_id: this.data.topicId,
                my_answer: this.data.answer
            },
            success(resp) {
                console.log("submit resp :" + resp)
                var result = resp.data.data
                if (resp.data.code == 200) {
                    that.setData({
                        result: result,
                        hasSubmit: true
                    })
                }
            }
        })
    },
    selectLast: function () {
        this.setData({operate: 'last'})
    },
    selectNext: function () {
        this.setData({operate: 'next'})
    },
    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
        this.setData({answer: e.detail.value})
    }
})