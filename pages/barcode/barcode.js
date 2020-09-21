// pages/barcode/barcode.js
import QRCode from '../../utils/weapp-qrcode.js'
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
    if (content) {
      // 生成二维码 这里的QRCode方法下面有讲解
      var qrcode = new QRCode('canvas', {
        text: content,
        width: 200,
        height: 200,
        padding: 12, // 生成二维码四周自动留边宽度，不传入默认为0
        correctLevel: QRCode.CorrectLevel.H, // 二维码可辨识度
        callback: (res) => {
          // console.log(res.path)
          // 接下来就可以直接调用微信小程序的api保存到本地 将图片地址保存到 postUrl
          this.setData({
            postUrl: res.path
          })
        }
      })
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
    wx.saveImageToPhotosAlbum({
      filePath: this.data.postUrl,
      success: function (data) {
        wx.showToast({
          title: '图片保存成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
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