// pages/opus/opus.js
const fetch= require("../../utils/fetch.js");

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,//左侧菜单滑动
    list:[],
    MenuList:[
      {"id":1, "title":"主页","url":"/pages/dashboard/index"},
      {"id":2,  "title":"作品","url":"/pages/opus/opus"},
      {"id":3,  "title":"套系","url":"/pages/dashboard/index"},
      {"id":4, "title":"评价","url":"/pages/dashboard/index"},
      {"id":5,  "title":"关于","url":"/pages/dashboard/index"},
      {"id":6,  "title":"我的","url":"/pages/dashboard/index"},
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
    fetch("getworkslist","GET",).then(res=>{
            for(var i=0;i<res.data.data.length;i++){
              res['data']['data'][i]['mainphoto']=app.globalData.cdnurl+res['data']['data'][i]['mainphoto'];
            }
            this.setData({list:res.data.data})//调用轮播图数据
            if(res.data.code==1){
              console.log(res.data.data);
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