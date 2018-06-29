// pages/weather/weather.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movieIndex:{
      start: 0,
      count: 9
    },
    datas:[]
  },
  getData:function(event){
    var that = this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/top250',
      data: that.data.movieIndex,
      header: {
        'content-type': 'json'
      },
      success: function (backData) {
        // 先获取原始的数据
        // 再获取返回的数据的subjects
        var datas = backData.data.subjects;
        var oldDatas = that.data.datas;
        // 根据返回的数据来计算是要几颗星星
        for (var i = 0; i < datas.length; i++) {
          var stars = [];
          var starsNum = datas[i].rating.stars / 10;
          for (var j = 1; j <= 5; j++) {
            stars.push(j > Math.floor(starsNum) ? 0 : 1)
          }
          datas[i].stars = stars;
        oldDatas.push(datas[i]);       
        }
        that.setData({
          movieData: oldDatas
        })
        // console.log(oldDatas);
        wx.hideNavigationBarLoading();
        // console.log(datas);
        console.log(oldDatas);

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
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
    console.log("下拉刷新");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("加载更多内容");
    wx.showNavigationBarLoading();
    this.data.movieIndex.start += this.data.movieIndex.count;
    this.getData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getDatas:function(){
    console.log(1);  
  } 
})