$(function() {
    var form = layui.form
    const layer=layui.layer
    form.verify({
      nickname: function(value) {
        if (value.length > 6) {
          return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
      }
    })
    initUserinfo()
    function initUserinfo() {
        $.ajax({
            type: 'GET',
            url:'/my/userinfo',
            success: function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                // console.log(res);  
                form.val('user_info',res.data) 
            }
        })
    }
    $('#resetBtn').on('click',function(e){
        e.preventDefault()
        initUserinfo()
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('修改用户信息失败')
                }
                layer.msg('修改用户信息成功')
                initUserinfo()
                window.parent.getUserInfo()
            }
        })
    })
  })