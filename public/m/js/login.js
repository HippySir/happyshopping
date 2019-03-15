$(function(){
    //执行登陆函数
    loginup();
    //执行注册按钮的函数
    register();
    //跳转去注册页面进行注册
    //封装一个登陆的函数
    function loginup(){
        //给登陆按钮注册事件
        $('.login').on('tap',function(){
            if($('.mynameuser').val() == '' || $('.mypassword').val() == ''){
                mui.toast('账号或者密码不能为空！',{ duration:'long', type:'div' });
                return false;
            }else{
                //发送请求
                $.ajax({
                    url:'/user/login',
                    type:'post',
                    data:{
                        username:$('.mynameuser').val(),
                        password:$('.mypassword').val(),
                    },
                    success:function(data){
                      if(data.error){
                        mui.toast('账号或密码错误！请重新输入！',{ duration:'long', type:'div' });
                      }else{
                        //在这里就要返回最开始点击的添加购物车的那个页面了
                        //获取从上个页面传递过来的网址
                        var href = location.search;
                        //实现页面的跳转
                        location =href.substr(href.indexOf('=')+1);;
                      }
                    }
                });
            }
            //
        })


    }
    // 封装一个跳转去注册页面的函数
    function register(){
        //给注册按钮注册点击事件
        $('.register').on('tap',function(){
            location = 'registrationcenter.html?'
        })
    }
    
})