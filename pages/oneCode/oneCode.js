// pages/oneCode/oneCode.js
import wxbarcode from '../../utils/index.js'
// wxbarcode = require('../../utils/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  generate: function (e) {
    let content
    // 获取输入的 content 内容
    content = e.detail.value.content
    // console.log(key)
    // console.log(content)
    if (content) {
      // 生成二维码 这里的QRCode方法下面有讲解
      wxbarcode.barcode('canvas',content , 600, 200);
    // console.log(qrcode)
    } else {
      // 如果用户输入的 content 为空，弹出警告
      wx.showToast({
        title: 'content不能为空',
        duration: 2000
      })
    }
  },

  // 保存二维码功能
  savePic: function () {
    let that = this
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 600,
      height: 200,
      destWidth: 600,
      destHeight: 200,
      canvasId: 'canvas',
      success: function success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log(res, '保存')
          }
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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