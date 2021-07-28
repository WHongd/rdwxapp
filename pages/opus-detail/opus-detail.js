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
    leftList: [],
    rightList: [],
    leftHight: 0,
    rightHight: 0,
  noramalData: [
    {
    "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190306144842/1001.png",
    "CoverHeight": 467,
    "CoverWidth": 350
    },
    {
      "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png",
      "CoverHeight": 871,
      "CoverWidth": 672
    },
    {
      "Cover": "https://img1.baidu.com/it/u=390347063,605554658&fm=26&fmt=auto&gp=0.jpg",
      "CoverHeight": 705,
      "CoverWidth": 396
    },
    {
      "Cover": "https://img0.baidu.com/it/u=1001230451,2954266246&fm=26&fmt=auto&gp=0.jpg",
      "CoverHeight": 906,
      "CoverWidth": 600
    },
],

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
        'video':res.data.data.video,
        'cdnurl':app.globalData.cdnurl
      }
      this.setData({Opusdata2:commdata})//调用作品数据
      // console.log(res.data.data);
  }
    });

fetch("wxnotice","GET",{appid:app.globalData.appid}).then(res=>{
  if(res.data.code==1){
    res['data']['data']['appname']=app.globalData.appname
    wx.setStorageSync('commoninfo', res.data.data);
    this.setData({CommonInfo:res.data.data})//调用公共信息数据
  }
    });

// 瀑布流
  var that = this;
  var allData = that.data.noramalData;
  //定义两个临时的变量来记录左右两栏的高度，避免频繁调用setData方法
  var leftH = that.data.leftHight;
  var rightH = that.data.rightHight;
  var leftData = [];
  var rightData = [];
  for (let i = 0; i < allData.length; i++) {
    var currentItemHeight = parseInt(Math.round(allData[i].CoverHeight * 345 / allData[i].CoverWidth));
    allData[i].CoverHeight = currentItemHeight + "rpx";//因为xml文件中直接引用的该值作为高度，所以添加对应单位
    if (leftH == rightH || leftH < rightH) {//判断左右两侧当前的累计高度，来确定item应该放置在左边还是右边
      leftData.push(allData[i]);
      leftH += currentItemHeight;
    }else{
      rightData.push(allData[i]);
      rightH += currentItemHeight;
    }
  }
  that.setData({
    leftHight: leftH,
    rightHight: rightH,
    leftList: leftData,
    rightList: rightData
  })
},

async isLeft() {
  const { list, leftList, rightList } = this.data;
  query = wx.createSelectorQuery();
  for (const item of list) {
   leftHeight <= rightHeight ? leftList.push(item) : rightList.push(item); //判断两边高度，来觉得添加到那边
   await this.getBoxHeight(leftList, rightList);
  }
 },
 getBoxHeight(leftList, rightList) { //获取左右两边高度
  return new Promise((resolve, reject) => {
   this.setData({ leftList, rightList }, () => {
    query.select('#left').boundingClientRect();
    query.select('#right').boundingClientRect();
    query.exec((res) => {
     leftHeight = res[0].height; //获取左边列表的高度
     rightHeight = res[1].height; //获取右边列表的高度
     resolve();
    });
   });
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

  }
})