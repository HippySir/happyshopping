var totalpage = 0;
var currentpage = 0;
$(function(){
   //执行查询用户的函数
   queryuser(1,5);  //默认为是每一页显示条数据，并且查询的是第一页
    //执行这个退出登陆的函数
    loginout();
    //执行这个是否判断是否登陆的函数
    islogin ();
    // 执行插件函数
    pagination();
    // 声明一个全局的变量，用来存放总的页数
  
    // console.log(totalpage + '总的');
    // 声明一个全局变量用来装当前的页码数
   
    // console.log(currentpage + '当前');

    //封装一个判断是否登陆的函数
    function islogin (){
        //发送请求
        $.ajax({
            url:'/employee/checkRootLogin',
            success:function(data){
                console.log(data);
                if(data.success){
                    // 刷新页面
                }else{
                    location = 'login.html';
                }
            }
        })
    }
    //封装一个退出登陆的函数
    function loginout(){
        //注册事件
        $('.title .rightsize').on('click',function(){
            // console.log('ha');
            //发送请求
            $.ajax({
                url:'/employee/employeeLogout',
                success:function(data){
                        if(data.success){
                            console.log(data.success);
                            location = 'login.html';
                        }else{
                            alert('退出登陆失败！');
                        }
                }
            })
        })
    }
    //封装一个查询商品的函数
    
    function queryuser(page,pageSize){
        currentpage = page;
        //发送请求
        $.ajax({
            url:'/user/queryUser',
            data:{
                page:page,
                pageSize:pageSize,
            },
            success:function(data){
                console.log(data);
                //调用模板引擎
                var html = template('userifo',{list:data.rows});
               
               $('#userlist-info tbody').html(html);
               opeateuser();
               var totalarray = [];
               totalpage = Math.ceil(data.total / pageSize);
               for(var i = 1; i <= Math.ceil(data.total / pageSize); i++){
                    totalarray.push(i);
               }
            //    console.log(totalarray);
               data.total = totalarray;
            //    console.log(data);
               //调用引擎模板
               var htmll = template('pagination',data);
            //    console.log(htmll);
               $('.footer .pagination').html(htmll);
                
            }
        })
    }
    // 封装分页的函数
    function  pagination(){
        //给每个按钮注册电测事件
        //给首页注册点击事件(使用事件委托)
        $('.footer .pagination').on('click','.homepage',function(){
            // 发送请求
            // console.log('ha');
            queryuser(1,5);
        });
        //给尾页注册点击事件
        $('.footer .pagination').on('click','.endpage',function(){
            // 发送请求
            console.log('ha');
            console.log(totalpage);
            queryuser(totalpage,5);
        });
        // 给上一页注册事件
        $('.footer .pagination').on('click','.previouspage',function(){
            // console.log(currentpage);
            // 发送请求
            var uppage = currentpage - 1 <= 0 ? 1 : currentpage - 1;

            queryuser(uppage,5);
        });
        //给下一页注册事件
        $('.footer .pagination').on('click','.nextpage',function(){
            // console.log(currentpage);
            // 发送请求
            var uppage = currentpage + 1 >= totalpage ? totalpage : currentpage + 1;
    
            queryuser(uppage,5);
        });

        // 给页面生成的野马注册点击事件
        $('.footer .pagination').on('click','[data-index]',function(){
    
            // console.log('num');
            var page = parseInt($(this).attr('data-index'));
            // console.log(page);
            queryuser(page,5);
        });


    }

    // 给页面用户的操作按钮封装函数
    function opeateuser(){
        // 给每一个按钮注册点击事件
        $('.operateuser').on('click',function(){
            console.log('hah');
            var isDelete = 0;
            // console.log($(this).attr('data-isDelete'));
            if(parseInt($(this).attr('data-isDelete')) == 0){
                isDelete = 1;
            }
            var id = $(this).attr('data-id');
            console.log(isDelete);
            console.log(id);
            // 发送请求
            $.ajax({
                url:'/user/updateUser',
                type:'post',
                dataType:'json',
                data:{
                    id:id,
                    isDelete:isDelete,
                },
                success:function(data){
                    console.log(data);
                    // location.reload();
                    queryuser(currentpage,5);
                }

            });

        })
    }
})