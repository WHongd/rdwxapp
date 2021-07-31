const conf=require('config.js');
module.exports = (url,method,data,header)=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url:conf.conf.weburl+'/api/wxapp/'+url,
      data:data,
      method:method,
      header:{
        'Accept': 'application/json',
        'content-type': 'multipart/form-data',
        'token': header,
      },
      success:resolve,
      fail:reject
    })
  })
}
//method 方法  POST 或 GET
// url 地址 请求的放法
//data 数据 必须是对象格式
//header token值即可