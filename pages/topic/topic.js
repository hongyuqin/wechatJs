const app = getApp()
// pages/index/wrongTopic.js
var getTopic = require('./get-topic.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topicId: 0,
        topic: {},
        photoUrl:'',
        items: [
            {name: 'A', value: ''},
            {name: 'B', value: ''},
            {name: 'C', value: ''},
            {name: 'D', value: ''},
        ],
        answer: '',
        hasPhoto:false,
        hasSubmit: false,
        checkAnalysis:false,
        result: {},
        operate: '',
        index: 0,
        isBegin:true,
        activeIndex: 0
    },
    swiperChange(e){
        console.log("swiperChange")
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        var changed = {}
        //发起网络请求
        console.log("currentIndex :"+this.data.index+" is_begin"+this.data.isBegin+" operate "+this.data.operate)
        wx.request({
            url: app.globalData.serverUrl+'/nextTopic',
            data: {
                accessToken: app.globalData.accessToken,
                operate: this.data.operate,
                current_index: this.data.index,
                is_begin:this.data.isBegin
            },
            success(resp) {
                if (resp.data.code == 200) {
                    var topic = resp.data.data
                    console.log("photo is :"+topic.photo)
                    changed['topicId'] = topic.topic_id
                    changed['items[0].value'] = topic.option_a
                    changed['items[1].value'] = topic.option_b
                    changed['items[2].value'] = topic.option_c
                    changed['items[3].value'] = topic.option_d
                    if(topic.photo != ''){
                        changed['hasPhoto'] = true
                        changed['photoUrl'] = topic.photo
                    }
                    that.setData({
                        topic: topic,
                        index: topic.index
                    })
                    that.setData(changed)
                }
            }
        })
    },
    getAnalysis: function () {
        var that = this
        if(!this.data.hasSubmit) {
            wx.request({
                url: app.globalData.serverUrl + '/getAnalysis',
                data: {
                    accessToken: app.globalData.accessToken,
                    topic_id: this.data.topicId
                },
                success(resp) {
                    var result = resp.data.data
                    if (resp.data.code == 200) {
                        that.setData({
                            result: result,
                            checkAnalysis: true
                        })
                    }
                }
            })
        }
    },
    selectLast: function () {
        console.log("selectLast")
        var that = this
        var changed = {}
        this.setData({operate: 'last',isBegin:false})
        console.log("currentIndex :"+this.data.index+" is_begin"+this.data.isBegin+" operate "+this.data.operate)
        wx.request({
            url: app.globalData.serverUrl+'/nextTopic',
            data: {
                accessToken: app.globalData.accessToken,
                operate: this.data.operate,
                current_index: this.data.index,
                is_begin:this.data.isBegin
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
    selectNext: function () {
        console.log("selectNext")
        var that = this
        var changed = {}
        this.setData({operate: 'next',isBegin:false})
        console.log("currentIndex :"+this.data.index+" is_begin"+this.data.isBegin+" operate "+this.data.operate)
        wx.request({
            url: app.globalData.serverUrl+'/nextTopic',
            data: {
                accessToken: app.globalData.accessToken,
                operate: this.data.operate,
                current_index: this.data.index,
                is_begin:this.data.isBegin
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
    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
        var that = this
        wx.request({
            url: app.globalData.serverUrl+'/answer',
            data: {
                accessToken: app.globalData.accessToken,
                topic_id: this.data.topicId,
                my_answer: e.detail.value,
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
    }
})