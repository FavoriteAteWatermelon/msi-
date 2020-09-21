//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    title: 'canvas绘制图片',
    canvasWidth: '', // canvas宽度
    canvasHeight: '', // canvas高度
    imagePath: '', // 分享的图片路径
    leftMargin: 0,
    topMargin: 0,
    imgInfo: {},
    ctx: [],
    canvasImage: '',
    previewImage: false,
    imgProportion: 0.8, // 图片占canvas画布宽度百分比
    imgToTop: 100 // 图片到canvas顶部的距离
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    var sysInfo = wx.getSystemInfo({
      success: function(res) {
        that.setData({
          canvasWidth: res.windowWidth,
          // 我这里选择canvas高度是系统高度的80%
          canvasHeight: res.windowHeight * 0.8
        })
        // 根据图片比例, 使图片居中
        let leftMargin = (res.windowWidth * (1 - that.data.imgProportion)) / 2
        that.setData({
          leftMargin
        })
      }
    })
  },
// 点击选择图片按钮触发
start: function() {
  let that = this
  let ctx = wx.createCanvasContext('myCanvas')
  // 设置canvas背景色, 否则制作的图片是透明的
  ctx.setFillStyle('#f8f8f8')
  ctx.fillRect(0, 0, that.data.canvasWidth, that.data.canvasHeight)
  this.addImage(ctx)
},
// 添加图片
addImage: function(ctx) {
  var that = this;
  let imgInfo = that.data.imgInfo
  var path
  wx.chooseImage({
    count: '1',
    success(res) {
      wx.getImageInfo({
        src: res.tempFilePaths[0],
        success: function(response) {
          // 返回的response里有图片的临时路径和图片信息(高度/宽度)
          that.setData({
            imgInfo: response,
            path: response.path
          })
          that.drawImage(ctx)
        }
      })
    }
  })
  this.addTitle(ctx)
},
  //点击下载按钮保存canvas图片
  downloadCanvas: function() {
    let that = this;
     // 判断用户是否选择了图片
    if (that.data.previewImage) {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: that.canvasWidth,
        height: that.canvasWidth,
        destWidth: that.canvasWidth,
        destHeight: that.canvasHeight,
        canvasId: 'myCanvas',
        success: function success(res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              console.log(res, '保存')
            }
          })
        }
      });
    } else {
      wx.showToast({
        title: '请先选择图片',
        image: '../../static/img/error.png'
      })
    }
  },
    // 绘制图片
    drawImage(ctx) {
      let that = this
      let imgInfo = that.data.imgInfo
      let path = that.data.path
      // 计算图片宽度 宽度固定 高度等比缩放
      let imgWidth = that.data.canvasWidth * that.data.imgProportion
      let imgHeight = imgInfo.height / imgInfo.width * imgWidth
      // drawImage参数, 下面会说明
      ctx.drawImage(path, 0, 0, imgInfo.width, imgInfo.height, that.data.leftMargin, that.data.imgToTop, imgWidth, imgHeight)
      ctx.draw()
      that.data.previewImage = true
    },
    //绘制文字
    addTitle: function(ctx) {
      var str = this.data.title
      ctx.font = 'normal bold 16px sans-serif';
      ctx.setTextAlign('center'); // 文字居中
      ctx.setFillStyle("#222222");
      ctx.fillText(str, this.data.canvasWidth / 2, 45)  // 文字位置
    },
})
