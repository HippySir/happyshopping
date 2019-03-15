$(function(){
    //进入这个页面首先查询有登录
    $.ajax({
        url:'/user/queryUserMessage',
        success:function(data){
            console.log(data);
            if(data.error){
                location = 'login.html?returnurl=' + location.href;
            }else{
               $('.username').html(data.username);
               $('.mobile').html(data.mobile);
            }
        }
    })
    //给退出按钮注册点击事件
    $('.login-btn').on('tap',function(){
        console.log('ha');
        $.ajax({
            url:'/user/logout',
           success:function(data){
            console.log(data);
            if(data.success == true){
                location = 'login.html?return='+location.href;
            }else{
                mui.toast('退出失败！',{ duration:'long', type:'div' });
            }
           }
        })
    })
   
})