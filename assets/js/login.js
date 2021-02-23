$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
      $('.login-box').hide()
      $('.reg-box').show()
    })
  
    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
      $('.login-box').show()
      $('.reg-box').hide()
    })
    let form=layui.form
    form.verify({
        pwd:[/^[\S]{1,13}$/,'输入的内容需要在6-13位，且不能含有空格'],
        repwd:function(value){
            let password=$('.reg-box [name=password]').val()
            if(value!==password){
                return '两次输入内容不一致'
            }
        }
    })
    $('#reg-form').on('submit', function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/api/reguser',
            data:{
                username:$('.reg-box [name=username]').val(),
                password:$('.reg-box [name=password]').val()
            },
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')
                $('#link_login').click()
            }
        })

    })
    $('#form-login').on('submit', function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/api/login',
            data:
               $(this).serialize()
            ,
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                localStorage.setItem('token',res.token)
                location.href='/index.html'
            }
        })

    })

  })