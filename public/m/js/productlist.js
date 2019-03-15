var proName = '';  //将要搜索的上平声明成全局变量
$(function(){
    
    //获取到用户的搜索数据
    // var seach = searchgood('seach');
    //调用请求函数
    sendajxa();
    search();
    sortgoods();
    // 下拉刷新上拉加载的函数的调用
    updownrefresh();
    //点击购买的函数
    buyproduct();
    //点击页面的搜索按钮也要能够加载数据
    function search(){
        //思路分析
        //首先注册点击事件
        //获取输入框的内容
        //发送请求
        //将获取的数据渲染到页面
        //注册事件
        $('.searchdata').on('tap',function(){
            //获取输入框的内容
            proName = $('#inputcontent').val().trim();  //从输入框里面那数据要不啊他的两侧的空字符串给去掉

            if(!proName){
                //如果输入为空要给用户一个提示
                mui.toast('请输入正确的内容',{ 
                    duration:'long', 
                    type:'div' 
                }) 

                //停止函数的执行
                return false;   
            }

            //搜索框的内容也要添加到Localstage中
            var searchrecord = JSON.parse(localStorage.getItem('searchlocalstorage'));
            console.log(searchrecord);
            for(var i = 0; i < searchrecord.length; i++){
                if(proName == searchrecord[i].key){
                    searchrecord.splice(i,1);
                }

            }

            searchrecord.unshift({
                key:proName,
                time: new Date().getTime()
            });
            
            searchrecord = JSON.stringify(searchrecord);

            //将数据存储到浏览器中
            localStorage.setItem('searchlocalstorage',searchrecord);

            //将输入框给清空
            $('#inputcontent').val('');
            
            var myurl="productlist.html?seach="+proName+"&prenttime="+ new Date().getTime();
            // encodeURI 编码
            location.assign(encodeURI(myurl));
         
        })
    }
   //封装一个页面加载数据的函数
    function sendajxa(){
        proName = searchgood('seach');
        $.ajax({
            url:'/product/queryProduct',
            data:{
                proName:proName,
                page:1,
                pageSize:4,
            },
            success:function(data){
                // console.log(data);
                //调用引擎模板
                var html = template('sendajax',data);
                // console.log(html);
                //将数据添加到页面
                $('.bottomcontent .mui-row').html(html);
            }
        })
    }
    //商品的排序功能
    function sortgoods(){
        //给所有的排序按钮注册点击事件
        $('.toptitle a').on('tap',function(){
            //切换active类名
            $(this).addClass('active').siblings().removeClass('active');
            //获取当前商品的排序方式
            var sort = $(this).data('sort');
            //根据当前的排序属性修改排序
            if(sort == 2){
              sort = 1;
             $(this).find('span').removeClass('fa-angle-down').addClass('fa-angle-up');
            }else{
                sort = 2;
                $(this).find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
                // alert(sort);
            }
               
            
              //同时还要修改属性上的值
            $(this).data('sort',sort);

            //获取排序的类型
            var type = $(this).data('type');
            // console.log(type)
            //根据拿到的数据发送请求
            var datasend = {
                page:1,
                pageSize:4,
                proName:proName,
                
            }

            datasend[type] = sort;

            $.ajax({
               url:'/product/queryProduct',
               data:datasend,
               success:function(data){
                // console.log(data);
                // alert(data);
                //调用引擎模板
                var html = template('sendajax', data);
                $('.bottomcontent .mui-row').html(html);

               }


            })

            // console.log(this.class);
        });
    }
    // 上拉下拉刷新的插件函数的封装
    function updownrefresh(){
         // 初始化下拉刷新
         mui.init({
            pullRefresh: {
                // 指定当前下拉刷新的父容器
                container: '#pullrefresh',
                // 初始化下拉刷新
                down: {
                    contentdown: "拉呀！拉呀！.....", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover: "看什么看！不知道放手啊！", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh: "不要猴急！稍等片刻！", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    // 下拉刷新的回调函数 用真正的刷新数据 发送请求真实刷新数据和页面
                    callback: pulldownRefresh
                },
                // 初始化上拉加载更多
                up: {
                    contentrefresh: '稍等....',
                    // 上拉加载的回调函数 用来真正请求更多数据 追加到页面上
                    callback: pullupRefresh
                }
            }
        });
    }

    //下拉加载的回调函数
    function pulldownRefresh(){
        console.log('go');
        setTimeout(function(){
            sendajxa();
            mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
        },1500);
       
    }
    var count = 0;     //记录上拉的刷新的次数
   //上拉刷新的回调函数
    function pullupRefresh(){
        //每上拉一次，count就自增一次
        count++;

        console.log(count);
        setTimeout(function(){
            $.ajax({
                url:'/product/queryProduct',
                data:{
                    proName:proName,
                    page:count,
                    pageSize:4,
                },
                success:function(data){
                    // console.log(data);
                    //调用引擎模板
                    if(data.data.length == 0){
                        mui.toast('已经没有更多的东西了！',{ duration:'long', type:'div' })
                    }else{
                        var html = template('sendajax',data);
                    console.log(html);
                    //将数据添加到页面
                    $('.bottomcontent .mui-row').append(html);
                    }
                    
                }
            })

            mui('#pullrefresh').pullRefresh().endPullupToRefresh();
        },1000);
       
    }

    //购买的函数
    function buyproduct(){
        //给购买按钮注册点击事件
        $('.bottomcontent .mui-row').on('tap', '.buyproducts', function(){
            // console.log('ha');
          
           location.assign(encodeURI("detail.html?id="+$(this).data('id')));
            
        });
    }
    //首先封装一个传递搜索指定额函数
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
})