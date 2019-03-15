
$(function(){
   //执行分页插件的初始化的功能
   plugininit();
   //执行查询页面的函数
   querytopcategory(1,5);
    //将分页插件的初始化功能封装成为一个函数
    function plugininit(){
         //分页插件的初始化
    new Page({
        id: 'pagination',
        curPage: 1, //初始页码
        pageTotal: 50, //总页数
        pageAmount: 5, //每页多少条
        dataTotal: 20, //总共多少条数据
        pageSize: 5, //可选,分页个数
        showPageTotalFlag: false, //是否显示数据统计
        showSkipInputFlag: false, //是否支持跳转
        getPage: function(page) {
            //获取当前页数
            console.log(page);
        }
    })
    }
    // 封装一个查询页面的函数
    function querytopcategory(page,pageSize){
       //发送请求
       $.ajax({
           url:'/category/queryTopCategoryPaging',
           type:'get',
           dataType:'json',
           data:{
               page:page,
               pageSize:pageSize
           },
           success:function(data){
               console.log(data);
            if(data.error){
                location = 'login.html';
            }else{
                //调用引擎模板
                var html = template('categorylist',data);
                $('#userlist-info tbody').html(html);
            }
           }
       })
      
    }
})