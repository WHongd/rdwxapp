// pages/opus-detail/opus-detail.js
const fetch= require("../../utils/fetch.js");
const app = getApp();
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
 // 接收post.js传进来的postid值。
  var postId = options.id;


  // this.setData({Opusdata:r})
 // 拿到数据文件对应id的数据元素
//  var postData = postsData.postList[postId];
 // console.log(postData)
 fetch("getwork","GET",{workid:postId}).then(res=>{
  if(res.data.code==1){
    // console.log(app.globalData.cdnurl)
 
    var j=0;
    for(var i in res.data.data){
      if(res.data.data.hasOwnProperty(i)) j++;
    }
    console.log(res.data.data);
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
    //console.log(imglist);
     this.setData({Opusdata:imglist});
      var commdata={
        'liketimes':res.data.data.liketimes,
        'looktimes':res.data.data.looktimes,
        'video':res.data.data.video,
        'cdnurl':app.globalData.cdnurl
      }
      this.setData({Opusdata2:commdata})//调用作品数据
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