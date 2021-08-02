// pages/about/about.js
const fetch= require("../../utils/fetch.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,//左侧菜单滑动
    latitude: 26.557392,
    longitude: 107.972681,
    markers:[
      {id: 1,
        latitude: 26.557392,
        longitude: 107.972681,
        title: '凯里市游客集散中心',
        label:{
          content: '凯里市游客集散中心',  //文本
          color: '#fb0d0d',  //文本颜色
          anchorX:'-25',
          anchorY:'-3',
          padding: 5,  //文本边缘留白
          textAlign: 'center'  //文本对齐方式。
        },

      }
    ],
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
    this.mapCtx = wx.createMapContext('mapId')
    fetch("wxnotice","GET",{appid:app.globalData.appid}).then(res=>{
      if(res.data.code==1){
        res['data']['data']['appname']=app.globalData.appname
        wx.setStorageSync('commoninfo', res.data.data);
        this.setData({CommonInfo:res.data.data})//调用公共信息数据
      }
        });
    fetch("getworkslist","GET",).then(res=>{
      if(res.data.code==1){
        for(var i=0;i<res.data.data.length;i++){
          res['data']['data'][i]['mainphoto']=app.globalData.cdnurl+res['data']['data'][i]['mainphoto'];
        }
         this.setData({WorkPromotion:res.data.data})//调用作品数据
        // console.log(res.data.data)
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