$.ajaxPrefilter(function(option){
    option.url='http://ajax.frontend.itheima.net'+option.url
    console.log(option);
    if(option.url.indexOf('/my')){
       option.headers= {
            Authorization:localStorage.getItem('token')||''
        }
        const successFuction=option.success.bind(this)
        option.success=function(res){
            
           
            successFuction(res)
            // option.success(res)
            // console.log(response);
            const {message,status} = res
            if(message=='身份认证失败！'&&status==1){
                localStorage.removeItem('token')
                location.href='/login.html'
            }
        
        }
        
    }
    
})
