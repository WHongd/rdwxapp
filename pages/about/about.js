// pages/about/about.js
const fetch= require("../../utils/fetch.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,//左侧菜单滑动
    MenuList:[
      {"id":1, "title":"主页","url":"/pages/index/index"},
      {"id":2,  "title":"作品","url":"/pages/opus/opus"},
      {"id":3, "title":"评价","url":"/pages/dashboard/index"},
      {"id":4,  "title":"关于","url":"/pages/dashboard/index"},
      {"id":5,  "title":"我的","url":"/pages/my/my"},
     ],
  },

   // 左侧滑出菜单
 showPopup() {
  this.setData({ show: true });
},


onClose() {
  this.setData({ show: false });
},

//  左侧滑出菜单 end

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch("wxnotice","GET",{appid:app.globalData.appid}).then(res=>{
      if(res.data.code==1){
        res['data']['data']['appname']=app.globalData.appname
        wx.setStorageSync('commoninfo', res.data.data);
        this.setData({CommonInfo:res.data.data})//调用公共信息数据
      }
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