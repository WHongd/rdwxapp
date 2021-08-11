// pages/Reservation/Reservation.js
const app = getApp();
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     // 判断是否为iPhoneX
    var isIphoneX = app.globalData.isIphoneX;
    console.log(isIphoneX ? '是iPhoneX' : '不是iPhoneX')
    this.setData({
      isIphoneX: isIphoneX
    })
  },
  CancelReservation:function(){
    Dialog.confirm({
      title:'预约',
      confirmButtonText:'确认取消',
      cancelButtonText:'再想想',
      message: '是否取消当前预约',
    })
      .then(() => {
         //on confirm
        console.log("确认取消") 
      })
      .catch(() => {
        // on cancel
        console.log("再想想") 

      });
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

  }
})