
$(function(){
    // $('.topsearch button').on('click', function(){
    //     mui.toast('请输入合法的内容',{ 
    //         duration:'long',
    //          type:'div'
    //          });
    // })
    addlocalstorage();       //增加记录的函数
    querylocalstorage();     //查询记录的函数
    deletelocalstorage();    //删除记录的寒素
    clearlocalstorage();     //清空记录的函数



    function addlocalstorage(){
        //点击搜所记录获取点击事件
        $('.topsearch button').on('click',function(){
            //获取输入框的内容
            var importcontent = $('.topsearch input').val().trim();
            var numcontent = importcontent;
            // trim（）是jquery中的方法，用来去除字符串的首位的空格
            console.log(importcontent);
            if(importcontent == ''){
                mui.toast('请输入合法的内容',{ 
                            duration:'long',
                             type:'div'
                             });
            return false;
            }

            var searchlocalstorage = localStorage.getItem('searchlocalstorage');
            console.log(searchlocalstorage);
            if(searchlocalstorage){
                searchlocalstorage = JSON.parse(searchlocalstorage);
                console.log(searchlocalstorage);
            }else{
                searchlocalstorage = [];
            }

            for(var i = 0; i < searchlocalstorage.length; i++){
                if(importcontent == searchlocalstorage[i].key){
                    searchlocalstorage.splice(i,1);
                    i--;
                }
            }

            searchlocalstorage.unshift(
                {
                    key: importcontent,
                    time: new Date().getTime(),
                }
            );

            importcontent = JSON.stringify(searchlocalstorage);

            localStorage.setItem('searchlocalstorage', importcontent);

            querylocalstorage(); 

            //清空输入框

            $('.topsearch input').val('');

            //网页的跳转
            // location = "productlist.html?seach="+numcontent+"&prenttime="+ new Date().getTime();
            // var parm1="你好";
            var myurl="productlist.html?seach="+numcontent+"&prenttime="+ new Date().getTime();
            // encodeURI 编码
            location.assign(encodeURI(myurl));

            // encodeURI(url)编码 , decodeURI(url)解码

                
            
        });
    }

    //查询的函数
    function querylocalstorage(){

        var query = localStorage.getItem('searchlocalstorage');

        if(query){
            query = JSON.parse(query);
        }else{
            query = [];
        }

        //调用引擎模板
        var html = template('record',{list: query});

        $('.downdontent ul').html(html);


    }
    var isdelete = false;
    //删除函数
    function deletelocalstorage(){
        $('.downdontent .mui-table-view').on('tap', 'span', function(){
            // alert('msg');
            // console.log(this);
            isdelete = true;  
            // console.log(isdelete);         //因为存在事件冒泡的行为  用开关思想，告诉父元素的事件不用执行器代码；
            var deletew = localStorage.getItem('searchlocalstorage');
            deletew = JSON.parse(deletew);
            var deletes = $(this).parent().text().trim();
            // console.log(deletes);
            for(var i = 0; i < deletew.length; i++){
                // console.log(deletew[i].key);
                if(deletes == deletew[i].key){
                    deletew.splice(i, 1);
                    break;
                }
            }

            deletew = JSON.stringify(deletew);
            localStorage.setItem('searchlocalstorage', deletew);
            querylocalstorage();
        })
    };

//清空函数
function clearlocalstorage(){
    $('.topheader').on('click', 'a', function(){
        localStorage.removeItem('searchlocalstorage');
        querylocalstorage(); 
        
    })
}
recordquery();
// 查询记录的函数
 function recordquery(){
     //首先给li标签注册点击事件
     $('.downdontent .mui-table-view').on('tap', 'li', function(){
        //  alert(isdelete);
        if(isdelete == false){
            // $(this).data('record')? location.assign(encodeURI("productlist.html?seach="+ $(this).data('record')+"&prenttime="+ new Date().getTime())):'';
           if($(this).data('record')){
            location.assign(encodeURI("productlist.html?seach="+ $(this).data('record')+"&prenttime="+ new Date().getTime()));
           }
            // var myurl="productlist.html?seach="+ $(this).data('record')+"&prenttime="+ new Date().getTime();
            // encodeURI 编码
            // console.log(myurl);
           
        }

        isdelete = false;
           
       
     })
 }


})
