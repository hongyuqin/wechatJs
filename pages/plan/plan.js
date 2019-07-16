// pages/index/wrongTopic.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        region: "",
        examType: "",
        dailyNeedNum: 0,
        regionItems: [
            {name: 'REGION_SZ', value: '深圳'},
            {name: 'REGION_COUNTRY', value: '国家'}
        ],
        examItems: [
            {name: 'EXAM_TYPE_CIVIL', value: '公务员考'},
            {name: 'EXAM_TYPE_INSTITUTION', value: '事业单位考'}
        ],
        region:"",
        examType:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        //发起网络请求
        wx.request({
            url: app.globalData.serverUrl+'getPlan',
            data: {
                accessToken: app.globalData.accessToken
            },
            success(resp) {
                if (resp.data.code == 200) {
                    var plan = resp.data.data
                    var changed = {}
                    that.setData({
                        region: plan.region,
                        examType: plan.exam_type,
                        dailyNeedNum: plan.daily_need_num
                    })
                    for(var i = 0; i < that.data.regionItems.length; ++i) {
                        if (plan.region == that.data.regionItems[i].name){
                            changed['regionItems['+i+'].checked'] = true
                            changed['region'] = that.data.regionItems[i].value
                            break
                        }
                    }
                    for(var i = 0; i < that.data.examItems.length; ++i) {
                        if (plan.exam_type == that.data.examItems[i].name){
                            changed['examItems['+i+'].checked'] = true
                            changed['examType'] = that.data.examItems[i].value
                            break
                        }
                    }
                    that.setData(changed)
                }
            }
        })

    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    }
})