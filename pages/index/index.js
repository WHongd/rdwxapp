// index.js
// 获取应用实例
// import { Swipe, SwipeItem } from 'vant';
const app = getApp()
Page({
  data: {
    show:false,//左侧菜单滑动
    autoplay:true,
    interval: 3000,
    duration: 600,
    indicatorColor:'grey',
    indicatorActivecolor:'white',
    nickname: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    
  BannerUrl:[
    {"id":1,"imgurl":"http://cdn.jiemufang.com/Banner1.jpg",
    img:["http://cdn.jiemufang.com/Banner1.jpg",
        "http://cdn.jiemufang.com/Banner2.jpg",
        "http://cdn.jiemufang.com/Banner3.jpg",
        "http://cdn.jiemufang.com/Banner4.jpg",
        "http://cdn.jiemufang.com/Banner5.jpg",
        "http://cdn.jiemufang.com/Banner6.jpg"
      ]},
    {"id":2,"imgurl":"http://cdn.jiemufang.com/Banner2.jpg",
        img:["http://cdn.jiemufang.com/Banner1.jpg",
        "http://cdn.jiemufang.com/Banner2.jpg",
        "http://cdn.jiemufang.com/Banner3.jpg",
        "http://cdn.jiemufang.com/Banner4.jpg",
        "http://cdn.jiemufang.com/Banner5.jpg",
        "http://cdn.jiemufang.com/Banner6.jpg"
      ]},
    {"id":3,"imgurl":"http://cdn.jiemufang.com/Banner3.jpg" ,
    img:["http://cdn.jiemufang.com/Banner1.jpg",
        "http://cdn.jiemufang.com/Banner2.jpg",
        "http://cdn.jiemufang.com/Banner3.jpg",
        "http://cdn.jiemufang.com/Banner4.jpg",
        "http://cdn.jiemufang.com/Banner5.jpg",
        "http://cdn.jiemufang.com/Banner6.jpg"
      ]},
    {"id":4,"imgurl":"http://cdn.jiemufang.com/Banner4.jpg",
    img:["http://cdn.jiemufang.com/Banner1.jpg",
        "http://cdn.jiemufang.com/Banner2.jpg",
        "http://cdn.jiemufang.com/Banner3.jpg",
        "http://cdn.jiemufang.com/Banner4.jpg",
        "http://cdn.jiemufang.com/Banner5.jpg",
        "http://cdn.jiemufang.com/Banner6.jpg"
      ]},
    {"id":5, "imgurl":"http://cdn.jiemufang.com/Banner5.jpg",
    img:["http://cdn.jiemufang.com/Banner1.jpg",
        "http://cdn.jiemufang.com/Banner2.jpg",
        "http://cdn.jiemufang.com/Banner3.jpg",
        "http://cdn.jiemufang.com/Banner4.jpg",
        "http://cdn.jiemufang.com/Banner5.jpg",
        "http://cdn.jiemufang.com/Banner6.jpg"
      ]},
    {"id":6,"imgurl":"http://cdn.jiemufang.com/Banner6.jpg",
    img:["http://cdn.jiemufang.com/Banner1.jpg",
        "http://cdn.jiemufang.com/Banner2.jpg",
        "http://cdn.jiemufang.com/Banner3.jpg",
        "http://cdn.jiemufang.com/Banner4.jpg",
        "http://cdn.jiemufang.com/Banner5.jpg",
        "http://cdn.jiemufang.com/Banner6.jpg"
      ]}
        ],
    MenuList:[
     {"id":1, "title":"主页","url":"/pages/dashboard/index"},
     {"id":2,  "title":"作品","url":"/pages/dashboard/index"},
     {"id":3,  "title":"套系","url":"/pages/dashboard/index"},
     {"id":4, "title":"评价","url":"/pages/dashboard/index"},
     {"id":5,  "title":"关于","url":"/pages/dashboard/index"},
     {"id":6,  "title":"我的","url":"/pages/dashboard/index"},
    ],
    WorkPromotion:[
      {"id":1,"title":"2020-08-18欧俊麟&申巧萍","Keyword":"婚礼","src":"http://111.85.112.22:85/uploads/20210716/430fd83ad96e5b39efd691e93e995f97.jpg"},
      {"id":2,"title":"2020-08-28周瑞&田芳玲","Keyword":"婚礼","src":"http://111.85.112.22:85/uploads/20210716/5b4e6a2ebd8cb7666bd40a8d94e43d1d.jpg"},
      {"id":3,"title":"2020-07-16徐畅&黄昌明","Keyword":"婚礼","src":"http://111.85.112.22:85/uploads/20210716/7520b557360a4f4f2e1b694b0b02a18a.jpg"},
      {"id":4,"title":"2021-05-25欧俊&申巧","Keyword":"婚礼","src":"http://111.85.112.22:85/uploads/20210716/9338e03e105b3a96bf94d6099be0e0cf.jpg"},
      {"id":5,"title":"2021-03-11欧俊麟&申巧萍","Keyword":"婚礼","src":"http://111.85.112.22:85/uploads/20210716/a3ef1fd0afce1f07aa5cc9b0dfdd9e32.jpg"},  
      {"id":6,"title":"2021-04-17欧俊麟&申巧萍","Keyword":"婚礼","src":"http://111.85.112.22:85/uploads/20210716/a3ef1fd0afce1f07aa5cc9b0dfdd9e32.jpg"},  
    ]
  },

  onLoad() {
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration:600
  });
 
  },
 

  // 左侧滑出菜单
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
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
        console.log(res.userInfo.nickName);
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
              title: '加载中！',
              icon:'loading',
              duration:2000
            })
          setTimeout(function(){
                wx.navigateTo({
                  url: '/pages/book/book'
                },1000)
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
