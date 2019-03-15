$(function(){
//左侧栏的滑动
    mui('.category-left .mui-scroll-wrapper').scroll(
        {
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: false, //是否显示滚动条
            deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
            bounce: true //是否启用回弹
           }
        
    );
   //右侧栏的滑动
  var swiper = new Swiper('.category-right .swiper-container', {
    scrollbar: '.swiper-scrollbar',
    direction: 'vertical',
    slidesPerView: 'auto',
    mousewheelControl: true,
    freeMode: true,
    roundLengths : true, //防止文字模糊
});

//在当前的页面申明一个全局的变量用来存放每次点击后的li的id
var oldid = 0;
rightajxa(1);
//发送请求
$.ajax({
    url:'/category/queryTopCategory',
    success:function(data){
        console.log(data);
        //调用引擎模板
        var html = template('navigationbar',data);
        console.log(html);
        $('.category-left ul').html(html);
    }
})

//给生成的每一个li注册点击事件
$('.category-left ul').on('click', 'li', function(){
   $(this).addClass('active').siblings().removeClass('active');
//    $(this).addClass('active').siblings().removeClass('active');
//拿到被点击的li元素的id
var dataid = $(this).data('id');
console.log(dataid);
if(oldid == dataid){
    return false;
}
console.log('hah');
//点击相应的元素的时候发送相应的请求
rightajxa(dataid);
oldid = dataid;


})

//将发请求的代码封装成要给函数
function rightajxa(id){
    $.ajax({
        url:"/category/querySecondCategory",
        data:{id},
        success:function(data){
            console.log(data);
            var html = template('goodsright',data);
            $('.category-right .mui-row').html(html);
        }
    })
}
  
})
