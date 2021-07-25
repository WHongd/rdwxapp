// app.js
var common = require('/pages/common/common.js');
App({
  onLaunch() {

    // common.getworkslist(function(res){
    //   console.log(res);
    // });
    // fetch("wxappconfig","GET",{'appid':'wx745dfe396aa55a5c'}).then(res=>{
    //         //this.setData({:res.data.data})//调用轮播图数据
    //         if(res.data.code==1){
    //           console.log(res.data.data);
    //         }
    //       });
  
  // 登录
  wx.login({
    success: res => {
      
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
    }
  })
  },
  globalData:{ 
      userInfo: null,
      appid:"wx745dfe396aa55a5c",
      weburl:"https://wxx.51zzsc.cn:85",
      cdnurl:"https://file.51zzsc.cn"
  }
})
