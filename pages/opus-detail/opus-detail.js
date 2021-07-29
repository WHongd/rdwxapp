// pages/opus-detail/opus-detail.js
const fetch= require("../../utils/fetch.js");
const app = getApp();

let leftHeight = 0, rightHeight = 0; 
let query;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:true,
    videoSrc:'https://file.51zzsc.cn/uploads/20210725/lrtzwLhNSwxlfAPn9sWmsF4CJQpu.mp4',   // 视频
    videoCoverImg:'http://img5.imgtn.bdimg.com/it/u=1672477765,2527992874&fm=26&gp=0.jpg',   // 视频封面图
    videoPlayIcon:'https://img2.baidu.com/it/u=3239379307,1847963789&fm=26&fmt=auto&gp=0.png',  // 视频播放icon
  },
 
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 // 接收post.js传进来的postid值。
  var postId = options.id;
 fetch("getwork","GET",{workid:postId}).then(res=>{
  if(res.data.code==1){
    var j=0;
    for(var i in res.data.data){
      if(res.data.data.hasOwnProperty(i)) j++;
    }
    // console.log(res.data.data);
    try{
      var imglist={};
      for(var i=0;i<j;i++){
        if(typeof(res['data']['data'][i]['filepath'])!=undefined){
          res['data']['data'][i]['filepath']=app.globalData.cdnurl+res['data']['data'][i]['filepath'];
          //抽离不是图片的元素
         imglist[i]=res['data']['data'][i];
        }
      }
    }catch(e){
      i=j;
    }
    // console.log(imglist);
     this.setData({Opusdata:imglist});
      var commdata={
        'liketimes':res.data.data.liketimes,
        'looktimes':res.data.data.looktimes,
        'video':res['data']['data']['video'][0],
        'cdnurl':app.globalData.cdnurl
      }
      this.setData({Opusdata2:commdata})//调用作品数据
      // console.log(commdata.video);
  }
    });

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
    this.videoContext = wx.createVideoContext('myVideo')
  },
  bindplay() {
    this.setData({
      isShow:false
    })
    this.videoContext.play();
    console.log('play')
  },
   // 监听播放到末尾时触发
   bindended(){
    console.log('bindended')
    this.setData({
      isShow: true
    })
    this.videoContext.ended();
  },
  // 监听暂停播放时触发
  bindpause(){
    console.log('pause')
  },
  binLike(){
    
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