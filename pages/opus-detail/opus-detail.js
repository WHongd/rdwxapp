// pages/opus-detail/opus-detail.js
const fetch= require("../../utils/fetch.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: false,
    loadImgStatus:0,//图片预加载状态
    nowLoadImgNum:0,//当前加载到的图片数
    allowLoadnum:4,//允许一次加载几张
    workid:0,//作品id
    moNiData:[],
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
// 判断是否为iPhoneX
var isIphoneX = app.globalData.isIphoneX;
console.log(isIphoneX ? '是iPhoneX' : '不是iPhoneX')
this.setData({
  isIphoneX: isIphoneX
})

 // 接收post.js传进来的postid值。
  var postId = options.id;
 // var title=JSON.parse(decodeURIComponent(options.title));
  this.data.workid=options.id;
  let detId = options.id;//点赞
  let _this = this;//点赞
  _this.setData({//点赞
    collectData : detId//把获取的id存到data中，当作一个变量供下边调用
  })
  _this.getCollected();//此方法是：页面加载时，获取缓存中的状态

  fetch("addlooknum","POST",{appid:app.globalData.appid,workid:postId}).then(res=>{
    if(res.data.code==1){ 
      console.log(res.data.msg);
    }
  });
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
          this.data.moNiData.push({
            'id':app.globalData.cdnurl+res['data']['data'][i]['id'],
            'image':res['data']['data'][i]['filepath']
          });
          //抽离不是图片的元素
         imglist[i]=res['data']['data'][i];
        }
      }
    }catch(e){
      i=j;
    }
     this.setData({Opusdata:imglist});
      var commdata={
        'liketimes':res.data.data.liketimes,
        'looktimes':res.data.data.looktimes,
        'video':res['data']['data']['video'][0],
        'cdnurl':app.globalData.cdnurl,
        'mainphoto':app.globalData.cdnurl+res.data.data.mainphoto,
        'title':res.data.data.title
      }
      this.setData({Opusdata2:commdata})//调用作品数据
        // 瀑布流
        // 获取模拟数据
        var arr1 = [],arr2 = [];
        var imagedata=[];
        for(var i=0;i<this.data.allowLoadnum;i++){
          imagedata.push(this.data.moNiData[i]);
        }
        this.data.nowLoadImgNum=this.data.allowLoadnum;

        //如果初次显示图片等于图片的总数
        if( this.data.allowLoadnum == this.data.moNiData.length) this.data.loadImgStatus=1;
        imagedata.forEach((ele,i) => {
          ele.id =i;//+ '-' + new Date().getTime(); // 模拟获取随机ID
          arr1.push(ele);
          arr2.push(ele);
        });
        this.setData({
          pageInfo: arr1,
          pageData: arr2,
        })
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

// 显示预览图
showpreview(event){
  var imgList=[];
  for(var i=0;i<this.data.moNiData.length;i++){
    imgList.push(this.data.moNiData[i].image);
  }
  wx.previewImage({
    current: event.detail.image, // 当前显示图片的http链接
    urls: imgList // 需要预览的图片http链接列表
  })
},


// 增加数据
addPageInfo(){
    var arr = this.data.pageInfo; // 总数据集合（节点ID使用）
    var arr2 = [];    // 新增数据集合（避免图片重复加载，导致速度过慢）
    var imgdata=[];
    var keep=this.data.moNiData.length-this.data.nowLoadImgNum;// 当前剩余没加载完的图片
    if(this.data.loadImgStatus==1) return false;//判断是否全部加载完图片
    var index=0;//记录循环次数
    for(var i=this.data.nowLoadImgNum;i<parseInt(this.data.nowLoadImgNum+this.data.allowLoadnum);i++){
      this.data.nowLoadImgNum=i;
      index+=1;
      keep-=1;
      if(index>=this.data.allowLoadnum){
        break;
      }
      if(this.data.nowLoadImgNum>=this.data.moNiData.length || keep<0 ){
        this.data.loadImgStatus=1;
        break;
      }
      imgdata.push(this.data.moNiData[i]);
    }
    console.log(imgdata);
    imgdata.forEach((ele,i) => {
      ele.id =i;//+ '-' + new Date().getTime(); // 模拟获取随机ID
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
  //点赞
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
    console.log(getSecCollectState);
     if(!getSecCollectState){//
      console.log("点赞操作");
      fetch("addlikenum","POST",{'appid':app.globalData.appid,'workid':this.data.workid}).then(res=>{
        if(res.data.code==1){
          console.log(res.data.msg);
        }else{
          console.log(res.data.msg);
        }
          });
     }else{
      console.log("取消操作");
      fetch("cutdownlikenum","POST",{'appid':app.globalData.appid,'workid':this.data.workid}).then(res=>{
        if(res.data.code==1){
          console.log(res.data.msg);
        }else{
          console.log(res.data.msg);
        }
          });
     }
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