// pages/opus-detail/opus-detail.js
const fetch= require("../../utils/fetch.js");
const app = getApp();

var moNiData = [
  {id:'0',image:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1133375469,702564064&fm=26&gp=0.jpg'},
  {id:'1',image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595048329096&di=3924f6904e9eabe31a020134dbc5ee8c&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn16%2F240%2Fw640h400%2F20181119%2F22df-hmivixn3889803.jpg'},
  {id:'2',image:'http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png'},
  {id:'3',image:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2126590754,116561686&fm=26&gp=0.jpg'},
  {id:'4',image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=128144883,1495567763&fm=26&gp=0.jpg'},
  {id:'5',image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2223828760,2771029196&fm=26&gp=0.jpg'},
  {id:'6',image:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3600861892,4082801463&fm=26&gp=0.jpg'},
];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageInfo:[],
    pageData:[],
    analogData:[],
    middleGap:'5px',
    isShow:true,
    Imgshow:true,
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
  let detId = options.id;//点赞
  let _this = this;//点赞
  _this.setData({//点赞
    collectData : detId//把获取的id存到data中，当作一个变量供下边调用
  })
  _this.getCollected();//此方法是：页面加载时，获取缓存中的状态

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
          moNiData[{
            'id':app.globalData.cdnurl+res['data']['data'][i]['id'],
            'image':app.globalData.cdnurl+res['data']['data'][i]['filepath']
          }]
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
      // console.log(commdata.liketimes);
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
 // 获取模拟数据
 var arr1 = [],arr2 = [];
 moNiData.forEach((ele,i) => {
   ele.id = i + '-' + new Date().getTime(); // 模拟获取随机ID
   arr1.push(ele);
   arr2.push(ele);
 });
 this.setData({
   pageInfo: arr1,
   pageData: arr2,
 })

},

// 获取点击事件
test(data){
  console.log(data)
},
// 增加数据
addPageInfo(){
  var arr = this.data.pageInfo; // 总数据集合（节点ID使用）
  var arr2 = [];    // 新增数据集合（避免图片重复加载，导致速度过慢）
  var data=moNiData;
  var data = [
    {id:'0',image:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1133375469,702564064&fm=26&gp=0.jpg'},
    {id:'1',image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595048329096&di=3924f6904e9eabe31a020134dbc5ee8c&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn16%2F240%2Fw640h400%2F20181119%2F22df-hmivixn3889803.jpg'},
    {id:'2',image:'http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png'},
    {id:'3',image:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2126590754,116561686&fm=26&gp=0.jpg'},
    {id:'4',image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=128144883,1495567763&fm=26&gp=0.jpg'},
    {id:'5',image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2223828760,2771029196&fm=26&gp=0.jpg'},
    {id:'6',image:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3600861892,4082801463&fm=26&gp=0.jpg'},
  ];
  data.forEach((ele,i) => {
    ele.id = i + '-' + new Date().getTime(); // 模拟获取随机ID
    arr.push(ele);
    arr2.push(ele);
  });
  this.setData({
    pageInfo: arr,
    pageData: arr2
  })
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
  //获取点赞缓存
  getCollected(){
    let CollectState = wx.getStorageSync("_collect");//获取全部文章缓存状态
    //这里我们做一个判断，如果缓存中有这个值，取到id对应在缓存中的状态，存到data中，
    //如果没有这个值，把id对应在缓存中的状态设置为false
    if(CollectState){// 判断如果缓存中有这个值 
      // 获取当前文章对应在缓存中的状态
      let collcetState = CollectState[this.data.collectData];
      this.setData({
        Imgshow:collcetState//把这个状态存到data中
      })
    }else{
      let CollectState= {};
      CollectState[this.data.collectData] = false;//没有这个值，默认把点赞的这个状态设置为false，
      // 当然不设置false，它默认也是false，未选中的状态
      wx.setStorageSync("_collect",CollectState);
   
    }
  },

  handleClickShow:function(){
     // 获取当前缓存中的所有状态
     let getSecCollect = wx.getStorageSync("_collect");
     // 获取当前页面的收藏按钮的状态  this.data.collectData就是当前的页面的id，在data中存储的
     let getSecCollectState = getSecCollect[this.data.collectData];
     // 然后当前收藏按钮的状态取反
     getSecCollectState = !getSecCollectState;
     // 把取反的值的状态 在赋给 当前按钮的状态
     getSecCollect[this.data.collectData] = getSecCollectState;
     wx.setStorageSync("_collect",getSecCollect)//在缓存中设置改变之后的状态
     this.setData({
      Imgshow:getSecCollectState//把更新过的收藏按钮的状态赋值给Imgshow
     })

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
    console.log('小程序触底，触发加载数据')
    this.addPageInfo();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})