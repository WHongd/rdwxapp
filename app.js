// app.js
App({
  onLaunch() {
  
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
      weburl:"https://wxx.51zzsc.cn:85"
  }
})
