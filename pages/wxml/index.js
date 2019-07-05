var initData = 'this is first line\nthis is second line'
var extraLine = [];
Page({
    data: {
        text: initData,
        items: [
            {name: 'USA', value: '美国'},
            {name: 'CHN', value: '中国', checked: 'true'},
            {name: 'BRA', value: '巴西'},
            {name: 'JPN', value: '日本'},
            {name: 'ENG', value: '英国'},
            {name: 'TUR', value: '法国'},
        ]
    },
    radioChange: function(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
    },
    add: function(e) {
        extraLine.push('other line')
        this.setData({
            text: initData + '\n' + extraLine.join('\n')
        })
    },
    remove: function(e) {
        if (extraLine.length > 0) {
            extraLine.pop()
            this.setData({
                text: initData + '\n' + extraLine.join('\n')
            })
        }
    }
})
