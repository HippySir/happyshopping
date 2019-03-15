$(function(){
    //调用查询函数
    queryproductlist();
    //执行删除按钮的事件函数
    deletebtn();
    //执行编辑按钮的事件函数
     editbtn();
     //执行计算总金额的函数
     calculatorjin();
     //将商品的价格保存出来
     var goodsprice = 0;
     //将编辑后的商品的数量保存出来
     var goodsnum = 0;
    // 下拉刷新的回调函数
    function pulldownRefresh(){
        console.log('hah');
    }
    //上拉刷新的回调函数
    function pullupRefresh(){
        console.log('你好');
    }

    // 在这个页面定义一个查询函数
    function queryproductlist(){
        // 发送请求
        $.ajax({
            url:'/cart/queryCart',
            success:function(data){
                console.log(data);
                if(data.error){
                    location = 'login.html?returnurl='+location.href;
                    return false;
                }else{
                   //调用引擎模板
                   var html = template('shopcargoodlist',{list:data}); 
                   $('#goodslist ul').html(html);
                   calculator();
                   mui.init({
                    pullRefresh: {
                        container: '#pullrefresh',
                        down: {
                            callback: pulldownRefresh
                        },
                        up: {
                            contentrefresh: '正在加载...',
                            callback: pullupRefresh
                        }
                    }
                });
                }
            }
        })
    }

    //删除按钮的事件函数
    function deletebtn(){
        
        //注册点击事件
        $('#goodslist').on('tap','.del-btn',function(e){
             var productid = $(this).data('productid');
             //获取被包裹的元素
            var li = this.parentNode.parentNode;
            console.log(li);
             mui.confirm( '你确定你要删除这个商品吗？', '温馨提示', ['确定','否'], function(e){
                if(e.index == 0){
                  //发送请求
                  $.ajax({
                      url:'/cart/deleteCart',
                      data:{id:productid},
                      success:function(data){
                        if(data.success){
                            mui.toast('删除成功',{ duration:'long', type:'div' }) 
                            //如果删除成功那么就重新渲染页面
                            queryproductlist();    
                        }else{
                            //那么就说明这个页面还没有登录成功。需要被打回重新登录
                            location = 'login.html?+returnurl='+location.href;
                        }
                      }
                  })
                }else{
                    //如果点了否，那么此时就要回退
                    setTimeout(function() {
                        mui.swipeoutClose(li);
                    }, 200);
                }
           } )
           
        })
    }

    //编辑按钮的事件函数
    function editbtn(){
        //首先给编辑按钮注册点击事件
        $('#goodslist').on('tap','.edit-btn', function(){
            //获取被点击的元素的商品信息
            var li = this.parentNode.parentNode;
            var productdata = $(this).data('product-data');
            console.log(productdata);
            //商品的价格是
            var goodsprice = productdata.price;
            // console.log(productdata);
            //获取元素商品的尺寸将其转换成为一个数组
            var size = productdata.productSize.split('-');
            // console.log(size);
            var productsize = [];
            for(var i = +size[0]; i <= +size[1]; i++){
                productsize.push(i);
            }
            productdata.productSize = productsize;
            // console.log(productsize);
            // 调用引擎模板
            var html = template('popupbox',productdata);
            // console.log(html);
            //首先去除所有的空格
            // html = html.replace(/\s+/g, "");
            // 然后再去掉所有的换行
            // html = html.replace(/<\/?.+?>/g,"");
            html = html.replace(/[\r\n]/g, "");
            // 给每个按钮注册点击事件
           var goodssize = 0;
            //点击之后会跳出来一个弹出框
            mui.confirm( html, '编辑商品的标题', ['是','否'], function(e){
               console.log(e.index);
              
               //获取被点击的商品的id
               if(e.index == 0){
                var productid = productdata.id;
                goodsnum = mui('.mui-numbox').numbox().getValue();
               console.log(goodsnum);
               //发送请求
               $.ajax({
                   url:'/cart/updateCart',
                   type:'post',
                   data:{
                       id:productid,
                       size:goodssize,
                       num:goodsnum,
                   },
                   success:function(data){
                       if(data.success){
                        queryproductlist();
                       }else{
                        mui.toast('修改失败！',{ duration:'long', type:'div' }) ;
                     
                       }
                    }
                })
               }else{
                setTimeout(function() {
                    mui.swipeoutClose(li);
                }, 200);
               }
              
                   
                  
             
            //console.log(productid);
            //获取商品的尺寸
           
          

            } );
            mui('.mui-numbox').numbox();
            $('.allsize .size-btn').on('tap',function(e){
                $(this).addClass('mui-btn-danger').siblings().removeClass('mui-btn-danger');
                goodssize = $(this).data('size');
                console.log(goodssize);
            });
         
        })
    }
    //实时计算总金额的函数
    function calculatorjin(){
       
        // 注册事件
        $('#goodslist').on('change','.mycheck',function(){
            calculator();
        })
    }
    //计算金额的函数
    function calculator(){
          // console.log('ha');
            //计算商品的价
            //获取所有的分类的商品的id
            var inputlist = $('.mycheck:checked');
            var totaprice = 0;
            // console.log(inputlist);
            if(inputlist.length == 0){
                $('.myamount').html('￥'+0);
            }
            $.each(inputlist,function(e,index){
                // console.log(e);
                console.log(index);
                // index.data
                var num = $(this).data('num')*$(this).data('price');
                totaprice += num;
                console.log(totaprice);
                $('.myamount').html('￥'+totaprice);
            })
    }
})

