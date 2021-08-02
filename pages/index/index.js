// index.js
// 获取应用实例
// import { Swipe, SwipeItem } from 'vant';
const fetch=require('../../utils/fetch');
const app = getApp()
Page({
  data: {
    loading:true,
    container: null,
    show:false,//左侧菜单滑动
    autoplay:true,
    interval: 3000,
    duration: 600,
    indicatorColor:'grey',
    indicatorActivecolor:'white',
    nickname: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    SuspensionShow:false,
    BannerUrl:[],
    img:[],
    WorkPromotion:[],
    MenuList:[
     {"id":1, "title":"主页","url":"/pages/index/index"},
     {"id":2,  "title":"作品","url":"/pages/opus/opus"},
     {"id":3, "title":"评价","url":"/pages/dashboard/index"},
     {"id":4,  "title":"关于","url":"/pages/dashboard/index"},
     {"id":5,  "title":"我的","url":"/pages/my/my"},
    ],

  },

  onLoad() {
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration:600
  });

  fetch("orderplay","GET",).then(res=>{
      if(res.data.code==1){
        var arr=[];
        for(var i=0;i<res.data.data.length;i++){
          res['data']['data'][i]['imgurl']=app.globalData.cdnurl+res['data']['data'][i]['filepath'];
          arr.push(res['data']['data'][i]['imgurl']);
      }
      res['data']['data']['Allimgurl']=arr;
      this.setData({img:res['data']['data']['Allimgurl']});
      this.setData({BannerUrl:res.data.data})//调用轮播图数据
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

    if (wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton()
    }
  },
 Gobook:function(){
  wx.navigateTo({
    url: '../book/book',
  })
 },
 Gomy:function(){
   wx.redirectTo({
    url: '../my/my',
   })
  // wx.navigateTo({
  //   url: '../my/my',
  // })
},
  // 左侧滑出菜单
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  //拨号
  callphone(){
    try{
      var info=wx.getStorageSync("commoninfo");
      if(info){
        wx.makePhoneCall({
          phoneNumber: info.phone,
          fail:(err)=>{
            // console.log("用户拒绝拨打电话");
          }
         })
      }
    }catch(e){
      console.log("获取号码出错:"+e);
    }
  },

  onOpusTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    //这里的title 因为携带特殊字符，所以需要json格式化 再进行url编码
    var title = event.currentTarget.dataset.title;
    wx.navigateTo({
      url: '../opus-detail/opus-detail?id='+postId,
    })
  },

//  左侧滑出菜单 end

// 轮播图预览
Enlarge:function(event){
  let that=this;
  var img=event.target.dataset.img;  //获取当前点击图片链接
  var imgList = event.target.dataset.src; //获取data-img
  let num=imgList.indexOf(img)  // 返回当前图片的位置  不用循环
  imgList.splice(num,1)
  imgList.unshift(img)
    //图片预览
    wx.previewImage({
      current: img, //当前显示的图片
      urls:imgList// 需要预览的图片https链接列表
    })
},
// 轮播图预览 end
onReady() {
  this.setData({
    loading: false,
  });
 
},
Openbook(){
    var that = this;
    var code="";
    wx.login({
      success(res){
        if(res.code){
          code=res.code;
        }
      }
    });
    wx.getUserProfile({
      desc: '用户登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        // console.log("获取用户信息成功", res);
        // console.log(res.userInfo.nickName);
        //将需要的变量存储起来
        wx.setStorageSync("nickname",res.userInfo.nickName);
        var nickname=wx.getStorageSync('nickname');
        var data=JSON.parse( res.rawData);
        var city="";
        city=data.province+data.city;
        if(!city) city="未知";
        var postData={
          'js_code':code,
          'appid':app.globalData.appid,
          'nickname':res.userInfo.nickName,
          'sex':data.gender,
          'city':city
        };
        // console.log(postData);
        wx.request({
          url: app.globalData.weburl+"/api/wxapp/wxlogin",
          method:"GET",
          data:postData,
          url: app.globalData.weburl+"/api/wxapp/wxlogin",
          header:{'content-type': 'application/json'},
          success(res){
            //登录成功后的回调
            // console.log(res.data);
            wx.setStorageSync("token",res.data.token);
            wx.showToast({
              title: '加载中',
              icon:'loading',
              duration:2000
            })
          setTimeout(function(){
                wx.navigateTo({
                  url: '/pages/book/book'
                },0)
              })
          }
        })
        that.setData({//添加及更新UI
          nickname:res.userInfo.nickName,
        })
      },
      fail: res => {
        // console.log("获取用户信息失败", res)
        wx.showToast({
          title: '登录失败',
          icon: 'error',
          duration: 1000
      })
        return false;
      
    }
    })


}
})
