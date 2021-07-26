// app.js
const conf=require("/utils/config.js");
const fetch=require('/utils/fetch.js');
App({
  onLaunch() {

    fetch("wxappconfig","GET",{'appid':conf.conf.appid}).then(res=>{
            if(res.data.code==1){
              this.globalData.appname=res.data.data.wxappname;
              this.globalData.icon=res.data.data.wxappicon;
              this.globalData.weburl=res.data.data.wxwebsite;
              this.globalData.cdnurl=res.data.data.wxcdnsite;
            }
          });
  // 登录
  wx.login({
    success: res => {
      
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
    }
  })
  },
  globalData:{ 
      appid:conf.conf.appid,
      weburl:conf.conf.weburl,
      cdnurl:conf.conf.cdnurl
  },
  MenuList:[
      {"id":1, "title":"主页","url":"/pages/dashboard/index"},
      {"id":2,  "title":"作品","url":"/pages/opus/opus"},
      {"id":3,  "title":"套系","url":"/pages/dashboard/index"},
      {"id":4, "title":"评价","url":"/pages/dashboard/index"},
      {"id":5,  "title":"关于","url":"/pages/dashboard/index"},
      {"id":6,  "title":"我的","url":"/pages/my/my"},
     ],

})
