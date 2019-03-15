var num = 10
$(function () {
    // 执行轮播图初始化的函数
    // vierpiager() ;
    //执行渲染页面的函数
    randerweb();
    //调用区域滚动初始化的函数
    arescroll();
    //调用尺寸按钮的点击函数
    clicksize();
      // 执行加入购物车的函数
    addcart();
    //将图片轮播的代码封装成一个函数
    function vierpiager() {
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
    }

    //封装渲染页面的函数
    function randerweb(){
        //获取传递过来的id
        var producrid = searchgood('id');
        console.log(producrid);
        // 发送请求
        $.ajax({
            url:'/product/queryProductDetail',
            data:{id:producrid},
            success:function(data){
                console.log(data);
                //需要将data里面的size转换成为数组
                var datasize = data.size.split('-');
                var sizedata = [];
                for(var i = datasize[0]-0; i <= datasize[datasize.length-1]; i++ ){
                    sizedata.push(i);
                }
                console.log(sizedata);
                data.size = sizedata;
                //调用引擎模板
                var html = template('waresdetail',data);
                // console.log(html);
               
                // vierpiager();
                $('#main .mainbox').html(html);
                 //；轮播图的初始化方法要放在元素生成之后来进行初始化
                vierpiager();
                //数字输入表的初始化
                mui('.mui-numbox').numbox();//因为数字表格是动态生成的所以要在元素生成之后进行初始化
                // var goodsize = $('.size-btn.mui-btn-danger');
                // console.log(goodsize);
            }

        })
    }
    //封装网页地址获取传递过来的参数的函数
    function searchgood(name){
        // 思路
        // 首先从loation对象里面拿seach属性的值，
        //拆分字符串，拿到传递过来的数据
        //讲传递过来的数据返回回来
        var search =  decodeURI(location.search).substr(1).split('&');
        for(var i = 0; i < search.length; i++){
            // var unm = search[i].split('=')[0];
            if(search[i].split('=')[0] == name){
                return search[i].split('=')[1];
            }
        }
        return;
    }
    //将区域滚动也封装成为一个函数
    function arescroll(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    }
    //给所有的尺寸注册点击事件将其封装成为一个函数
    function clicksize(){
        $('.mainbox').on('tap','.size-btn', function(){
            // console.log('hah');
            $(this).addClass('mui-btn-danger').siblings().removeClass('mui-btn-danger');
            //获取尺寸大小
           
        });
    }
  
    //加入购物车的函数
    function addcart(){
        //给添加购物车注册点击事件
        $('.addshopping').on('tap',function(){
            var producrid = searchgood('id');
        // console.log(producrid);
        //获取商品的尺寸
       var goodsize = $('.size-btn.mui-btn-danger').html();
        // console.log(goodsize);
        var goodsnum = mui('.mui-numbox').numbox().getValue();
        console.log(goodsnum);
        //发送请求
            $.ajax({
                url:'/cart/addCart',
                type: 'post',
                data: {
                    productId:producrid,
                    num:goodsnum,
                    size:goodsize
                },
                success:function(data){
                    console.log(data);
                    if(data.error){
                        location = "login.html?uphref="+location.href;
                        
                    }else{
                       //确认框弹出来后的回调函数
                        function callback(e){
                            if(e.index == 0){
                               location = 'shopcart.html';
                            }
                        }
                        var massage = "购物车";
                        var title = "是否要去购物车看你添加的商品！";
                        var btnValue = ['是','否'];
                        
                    //给用户看的提示框
                      mui.confirm( title, massage, btnValue, callback);
                    }
                }
            });

        })
        //获取产品的id

        
    }

   

})