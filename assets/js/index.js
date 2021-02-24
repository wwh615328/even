$(function(){
    getUserInfo()
})
function getUserInfo(){
    $.ajax({
        type: "GET",
        url:'/my/userinfo',
        // headers: {
        //     Authorization:localStorage.getItem('token')
        // }, 
        success:function(res){
            // console.log(res);
           if(res.status!==0){
               
            return layer.msg(res.message)
           }
         
           renderAvatar(res.data)
        },
      
    })
    
}
function  renderAvatar(user){
    const username=user.nickname||user.username
    $('.welcome').html(username)
    if(user.user_pic){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        const firstName=username[0].toUpperCase()
        $('.text-avatar').html(firstName).show()
        $('#welcome').html('欢迎'+username)

    }
}
$('#btnLogOut').on('click',function(){
    //eg1
layer.confirm('是否退出', {icon: 3, title:'提示'}, function(index){
    //do something
    localStorage.removeItem('token')
    location.href='/login.html'
    layer.close(index);
  });

})
