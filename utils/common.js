/**
 * createTime:2021-7-25 08:55:38
 * author:IF
 * description:所有页面调用后台数据API
 * 文档参见:https://docs.apipost.cn/preview/0cd860844289d1de/c04f7fbcaab971fc
 */

const app = getApp();
 /**
  *  获取服务器配置
  */
function wxappconfig(callback) {
  wx.request({
    url:app.globalData.weburl+"/api/wxapp/wxappconfig?appid="+app.globalData.appid,
    method:"GET",
    success(res){
      if(res.data.code==1){
        console.log(res.data.msg);
        return callback && callback(res.data.data);
      }else{
        console.log(res.data.msg);
        return false;
      }
    }
  })
}

 /**
  *  获取公告信息
  */
function wxnotice(callback) {
    wx.request({
    url:app.globalData.weburl+"/api/wxapp/wxnotice?appid="+app.globalData.appid,
    method:"GET",
    success(res){
      if(res.data.code==1){
        console.log(res.data.msg);
        return callback && callback(res.data.data);
      }else{
        console.log(res.data.msg);
        return false;
      }
    }
  })
}

 /**
  *  获取轮播图
  */
function orderplay(callback) {
  wx.request({
    url:app.globalData.weburl+"/api/wxapp/orderplay",
    method:"GET",
    success(res){
      if(res.data.code==1){
        console.log(res.data.msg);
        return callback && callback(res.data.data);
      }else{
        console.log(res.data.msg);
        return false;
      }
    }
  })
}

 /**
  *  获取作品列表 
  */
 function getworkslist(callback) {
  wx.request({
  url:app.globalData.weburl+"/api/wxapp/getworkslist",
  method:"GET",
  success(res){
    if(res.data.code==1){
      console.log(res.data.msg);
      return callback && callback(res.data.data);
    }else{
      console.log(res.data.msg);
      return false;
    }
  }
})
}

 /**
  *  获取作品详情
  */
 function getwork(workid,callback) {
    wx.request({
      url:app.globalData.weburl+"/api/wxapp/getwork?workid="+workid,
      method:"GET",
      success(res){
        if(res.data.code==1){
          console.log(res.data.msg);
          return callback && callback(res.data.data);
        }else{
          console.log(res.data.msg);
          return false;
        }
      }
  })
}

 /**
  *  增加作品浏览次数 
  */
 function addlooknum(workid,callback) {
    wx.request({
      url:app.globalData.weburl+"/api/wxapp/addlooknum",
      method:"POST",
      data:{
        'appid':app.globalData.appid,
        'workid':workid
      },
      header:{
        'content-type': 'multipart/form-data' // 默认值
      },
      success(res){
        if(res.data.code==1){
          console.log(res.data.msg);
          return callback && callback(res.data.data);
        }else{
          console.log(res.data.msg);
          return false;
        }
      }
  })
}

 /**
  *  增加作品喜欢次数  
  */
 function addlikenum(workid,callback) {
  wx.request({
    url:app.globalData.weburl+"/api/wxapp/addlikenum",
    method:"POST",
    data:{
      'appid':app.globalData.appid,
      'workid':workid
    },
    header:{
      'content-type': 'multipart/form-data'
    },
    success(res){
      if(res.data.code==1){
        console.log(res.data.msg);
        return callback && callback(res.data.data);
      }else{
        console.log(res.data.msg);
        return false;
      }
    }
})
}

 /**
  *  添加预约  
  */
 function addreserve(project,reservetime,username,phone,remarks,callback) {
    wx.request({
      url:app.globalData.weburl+"/api/wxapp/addreserve",
      method:"POST",
      data:{
        'project':project,
        'reservetime':reservetime,
        'username':username,
        'phone':phone,
        'remarks':remarks
      },
      header:{
        'token':wx.getStorageSync('token'),//务必登录后存入缓存中
        'content-type': 'multipart/form-data'
      },
      success(res){
        if(res.data.code==1){
          console.log(res.data.msg);
          return callback && callback(res.data.data);
        }else{
          console.log(res.data.msg);
          return false;
        }
      }
    })
}

 /**
  *  我的预约
  */
 function getmyreserve(callback) {
  wx.request({
    url:app.globalData.weburl+"/api/wxapp/getmyreserve",
    method:"GET",
    header:{
      'token':wx.getStorageSync('token'),//务必登录后存入缓存中
    },
    success(res){
      if(res.data.code==1){
        console.log(res.data.msg);
        return callback && callback(res.data.data);
      }else{
        console.log(res.data.msg);
        return false;
      }
    }
  })
}

 /**
  *  获取预约服务名称
  */
 function getproject(callback) {
  wx.request({
    url:app.globalData.weburl+"/api/wxapp/getproject",
    method:"GET",
    header:{
      'token':wx.getStorageSync('token'),//务必登录后存入缓存中
    },
    success(res){
      if(res.data.code==1){
        console.log(res.data.msg);
        return callback && callback(res.data.data);
      }else{
        console.log(res.data.msg);
        return false;
      }
    }
  })
}

 /**
  *  微信登录  需提前调用微信接口
  *
  */
 function wxlogin(js_code,nickname,sex,city,callback) {
    wx.request({
      url:app.globalData.weburl+"/api/wxapp/wxlogin",
      method:"GET",
      data:{
        "appid":app.globalData.appid,
        "js_code":js_code,
        "nickname":nickname,
        "sex":sex,
        "city":city
      },
      success(res){
        if(res.data.code==1){
          console.log(res.data.msg);
          return callback && callback(res.data.data);
        }else{
          console.log(res.data.msg);
          return false;
        }
      }
    })
}


module.exports={
  wxappconfig:wxappconfig,
  wxnotice:wxnotice,
  orderplay:orderplay,
  getworkslist:getworkslist,
  getwork:getwork,
  addlooknum:addlooknum,
  addlikenum:addlikenum,
  addreserve:addreserve,
  getmyreserve:getmyreserve,
  getproject:getproject,
  wxlogin:wxlogin
}
// module.exports.wxappconfig = wxappconfig;
// module.exports.wxnotice = wxnotice;
// module.exports.orderplay = orderplay;
// module.exports.getworkslist = getworkslist;
// module.exports.getwork = getwork;
// module.exports.addlooknum = addlooknum;
// module.exports.addlikenum = addlikenum;
// module.exports.addreserve = addreserve;
// module.exports.getmyreserve = getmyreserve;
// module.exports.getproject = getproject;
// module.exports.wxlogin = wxlogin;