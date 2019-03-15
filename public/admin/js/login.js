$(function(){
    //执行这个声明登陆函数
    loginget();
    //给登陆声明一个函数
    function loginget(){
        //注册点击事件
        $('.loginget').on('click',function(e){
            e.preventDefault();
            console.log('hah');
           var username =  $('#inputEmail3').val();
           //验证输入的用户名是否为空
           if(username == ''){
                alert('用户名不能输入为空！');
                return false;
           }
           var password = $('#inputPassword3').val();
        // 验证密码输入是否为空
           if(password == ''){
                alert('密码输入不能为空！');
                return false;
           }
        //发送请求
        $.ajax({
            url:'/employee/employeeLogin',
            type:'post',
            data:{
                username:username,
                password:password,

            },
            success:function(data){
               if(data.error){
                alert(data.message);
               }else{
                location = 'index.html';
               }
                console.log(data);
            }

        })
           
        })
    }
})