// pages/test/test.js
// import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
// import Toast from '../../node_modules/@vant/weapp/dist/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
      columns: ["选片(￥1.00)","拍片(￥9999.00)"],
      choiceIndex:'请选择你的服务项目',
      maxDate: new Date().setFullYear(new Date().getFullYear() + 2),
      taskStartTime: '',
      time: '',
      Timeshow:false,
      show:false,
      autoSize: {
        maxHeight: 60,
        minHeight: 40
      },
      nickname: '',
      canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 预约服务
  choiceChange:function(e){
    this.setData({
      choiceIndex:e.detail.value,
    });
    console.log('picker发送选择改变，携带值为'+this.data.columns[e.detail.value])
  },
 //服务时间
 showCalendar() {
  this.setData({ show: true })
},
onClose() {
  this.setData({ show: false })
},
formatDate(date) {
  let taskStartTime
  if (date.getMonth() < 9) {
    taskStartTime = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-"
  } else {
    taskStartTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
  }
  if (date.getDate() < 10) {
    taskStartTime += "0" + date.getDate()
  } else {
    taskStartTime += date.getDate()
  }
  this.setData({
    taskStartTime: taskStartTime,
  })
  return taskStartTime;
},
onConfirm(e) {
  this.setData({
    time: this.formatDate(e.detail),
    show: false
  })
},
confirmPublish: function () {
  const data = {}
  data.taskStartTime = this.data.taskStartTime;
  console.log("选择的日期为："+ this.data.taskStartTime);
},
  
onPopup(event) {
  this.setData({ Timeshow: true })
},
TimeCancel() {
  this.setData({ Timeshow: false })
},
onChange(event) {
  const { picker, value, index } = event.detail;
  console.log(`当前值：${value}, 当前索引：${index}`)
},
onCancel() {
  // Toast('取消');
  console.log('取消')
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      nickname:options.nicknameData,
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

//appid:wx0c4ab61db98ac5bf  
btnLogin:function(event){
 
    },



})

