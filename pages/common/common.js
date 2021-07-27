// pages/common/common.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch("wxnotice","GET",{appid:app.globalData.appid}).then(res=>{
      if(res.data.code==1){
        res['data']['data']['appname']=app.globalData.appname
        wx.setStorageSync('commoninfo', res.data.data);
        this.setData({CommonInfo:res.data.data})//调用轮播图数据
      }
        });
  },
    //拨号
    callphone(){
      try{
        var info=wx.getStorageSync("commoninfo");
        if(info){
          wx.makePhoneCall({
            phoneNumber: info.phone,
            fail:(err)=>{
              console.log("用户拒绝拨打电话");
            }
           })
        }
      }catch(e){
        console.log("获取号码出错:"+e);
      }
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