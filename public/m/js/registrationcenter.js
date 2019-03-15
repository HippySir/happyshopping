// $(function(){
//     //执行注册函数
//     register();
//     //封装一个注册按钮的点击事件
//     function register(){
//         // 给获取验证码注册一个点击事件
//         $('.getauthcode').on('tap',function(){
//             $.ajax({
//                 url:'/user/vCode',
//                 success:function(data){
//                     console.log(data);
//                     if(data.vCode){
//                         $('.authcode').val(data.vCode);
//                     }else{
//                         mui.toast('获取验证码失败！',{ duration:'long', type:'div' }) ;
//                     }
//                 }
//             })
//         })
//         $('.register').on('tap',function(){
//            var phonenumber = $('.cell-phone-number').val();
//         //    console.log(phonenumber);
//         //    确认手机号的输入是否为空或者是否合法
//            if(phonenumber == ''){
//             mui.toast('手机号输入不能为空！',{ duration:'long', type:'div' }) ;
//             return false;
//            }else if(!(/^1[34578]\d{9}$/.test(phonenumber))){
//             mui.toast('手机号输入不合法！',{ duration:'long', type:'div' }) ;
//             return false;
//            }
//         //    确认用户名是否为空
//            var username = $('.username').val();
//         //    console.log(username);
//            if(username == ''){
//             mui.toast('用户输入名不能够为空',{ duration:'long', type:'div' }) ;
//             return false;
//            }
//         //    确认密码是否为空
//            var password = $('.password').val();
//         //    console.log(password);
//            if(password == ''){
//             mui.toast('密码输入不能为空',{ duration:'long', type:'div' }) ;
//             return false;
//            }
//         //    确认确认密码是否为空
//            var confirmpassword = $('.confirmpassword').val();
//         //    console.log(confirmpassword);
//            if(confirmpassword != password){
//             mui.toast('两次输入的密码不一致，请重新输入！',{ duration:'long', type:'div' }) ;
//             return false;
//            }
//            //确认验证码的输入正确性
//            var authcode =  $('.authcode').val(); 
//            console.log(authcode);
//            if(authcode == ''){
//             mui.toast('未获取验证码！',{ duration:'long', type:'div' }) ;
//             return false;
//            }

//            //发送请求
//            $.ajax({
//                url:'/user/register',
//                type:'post',
//                data:{
//                 username:username,
//                 password:password,
//                 mobile:phonenumber,
//                 vCode:authcode
//                },
//                success:function(data){
//                    console.log(data);
//                    if(data.success){
//                     mui.alert( '注册成功，请重新登录！', '温馨提示', '去登录', function(){
//                         location = 'login.html?return=index.html';
//                     })
//                    }else{
//                     mui.toast(data.message,{ duration:'long', type:'div' }) ;
//                    }
//                }
//            })
//         })
//     }

// })
var vCode = 0;    //声明一个全局的变量用来存放验证码
$(function(){
    //执行这个获取验证码的函数
    getvocode();

    //执行注册的函数
    register();

    //注册一个获取用户验证码的函数
    function getvocode(){
        //给发送验证码的按钮注册店家事件
        $('.getauthcode').on('tap',function(){
            //发送请求
            $.ajax({
                url:'/user/vCode',
                success:function(data){
                    if(data.error){
                        mui.toast('获取验证码失败！',{ duration:'long', type:'div' }); 
                    }else{
                        vCode = data.vCode;
                        console.log(vCode);
                    }
                }
            })
        })
      
    
    }
      //给注册按钮设置函数
 function register(){
          //首先给注册按钮注册点击事件
            $('.register').on('tap',function(){
                //使用开关思想，先假设所有的表单都能够通过非空验证
                var isempety = true;
                //获取所有的表单元素
                var inputlist = $('.mui-input-group input');
                inputlist.each(function(e,index){
                    // console.log(e);
                    // console.log(index);
                    if(this.value == ''){
                        mui.toast(this.placeholder,{ duration:'long', type:'div' }) ; 
                        isempety = false;      
                        return false;

                    }
                    //只有所有的元素都通过了非空的验证，那么就会进入到这个下面的一步了
                    if(isempety){
                        //首先验证用户的手机号是否合法
                        var userphone = $('.cell-phone-number').val().trim();
                        // !(/^1(3|4|5|7|8)\d{9}$/.test(phone))
                        if(!(/^1(3|4|5|7|8)\d{9}$/.test(userphone))){
                            mui.toast('输入的手机号不合法！',{ duration:'long', type:'div' }); 
                            return false;
                        }
                       //验证用户名是否合法
                       //用户名正则，4到16位（数字、字母、下划线、减号）
                        var usename = $('.username').val().trim();
                        if(!( /^[a-zA-Z0-9_-]{4,16}$/.test(usename))){
                            mui.toast('输入的用户名不合法！！',{ duration:'long', type:'div' }); 
                            return false;
                        }
                        //验证密码的合法性
                        // //  最短6位，最长16位 {6,16}
                        //     可以包含小写大母 [a-z] 和大写字母 [A-Z]
                        //     可以包含数字 [0-9]
                        //     可以包含下划线 [ _ ] 和减号 [ - ]
                        var password = $('.password').val().trim();
                        if(!( /^[\w_-]{6,16}$/.test())){
                            mui.toast('输入的密码强度太低！',{ duration:'long', type:'div' }); 
                            return false;
                        }

                        //确认密码的输入
                        var againpassword = $('.confirmpassword').val().trim();
                        if(password != againpassword){
                            mui.toast('两次的密码输入不一致，请重新输入！',{ duration:'long', type:'div' }); 
                            return false;
                        }

                        var codemy = $('.authcode').val().trim();

                        //发送请求
                        $.ajax({
                            url:'/user/register',
                            type:'post',
                            data:{
                                username:usename,
                                password:password,
                                mobile:userphone,
                                vCode:codemy
                            },
                            success:function(data){
                                if(data.error){
                                    mui.toast(data.message,{ duration:'long', type:'div' }); 
                                    console.log(data.message);
                                }else{
                                //     mui.alert( '注册成功，请重新登录！', '温馨提示', '去登录', function(){
                                //         //  location = 'login.html?return=index.html';
                                //         console.log('我去');
                                // })
                                location = 'login.html?returnurl=user.html';
                                }
                            }
                        })
                        
                    }
                });
            })
      }
})