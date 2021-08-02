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
      {"id":1, "title":"主页","url":"/pages/index/index"},
      {"id":2,  "title":"作品","url":"/pages/opus/opus"},
      {"id":3, "title":"评价","url":"/pages/evaluate/evaluate"},
      {"id":4,  "title":"关于","url":"/pages/about/about"},
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
        this.setData({CommonInfo:res.data.data})//调用轮播图数据
      }
        });

    fetch("getworkslist","GET",).then(res=>{
      if(res.data.code==1){
        for(var i=0;i<res.data.data.length;i++){
          res['data']['data'][i]['mainphoto']=app.globalData.cdnurl+res['data']['data'][i]['mainphoto'];
        }
        this.setData({list:res.data.data})
      }
    });
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration:600
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  //拨号
  callphone(){
    try{
      var info=wx.getStorageSync("commoninfo");
      if(info){
        wx.makePhoneCall({
          phoneNumber: info.phone,
          fail:(err)=>{
            console.log("用户拒绝拨打电话");
          }
         })
      }
    }catch(e){
      console.log("获取号码出错:"+e);
    }
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