function getTopic(){
    wx.request({
        url: 'http://651cb4c5.ngrok.io/nextTopic',
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
}

module.exports = getTopic