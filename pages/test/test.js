// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxDate: new Date().setFullYear(new Date().getFullYear() + 2),
    show: false,
    taskStartTime: '',
    time: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  /////////
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
    data.taskStartTime = this.data.taskStartTime
    console.log("选择的日期为："+ this.data.taskStartTime)
  },

})