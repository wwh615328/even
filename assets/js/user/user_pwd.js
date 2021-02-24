$(function(){
    const form= layui.form
    form.verify({
        pwd:[/^[\S]{1,13}$/,'输入的内容需要在6-13位，且不能含有空格'],
        same:function(value){
            if(value==$('[name=oldPwd]').val()){
                return  '新旧密码不能一致'
            }
        },
        resame:function(value){
            if(value!==$('[name=newPwd]').val()){
                return  '两次密码不一致'
            }
        }
    })
    $('.layui-form').on('submit', function(e){
        e.preventDefault()
        $.ajax({
            type:"POST",
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success: function(res){
                if(res.status!==0){
                    return layer.msg('修改密码失败')
                }
                layer.msg('修改密码成功')
                $('.layui-btn-primary').click()
            }
        })
    })
})