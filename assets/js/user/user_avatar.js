
// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}
// 1.3 创建裁剪区域
$image.cropper(options)
$('.chooseImg').on('click', function () {
    $('#file').click()

})
$('#file').on('change', function () {
    console.log(this.files);
    const filelist = this.files
    if (filelist.length === 0) {
        return layer.msg('请上传照片')
    }
    const file = filelist[0]
    const imgUrl = URL.createObjectURL(file)
    $image
        .cropper('destroy')
        .attr('src', imgUrl)
        .cropper(options)
})
$('#upload').on('click', function () {
    var dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png')
    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
          avatar: dataURL
        },
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('更换头像失败！')
          }
          layer.msg('更换头像成功！')
          window.parent.getUserInfo()
        }
      })
   
})