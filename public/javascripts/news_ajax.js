//news页面ajax模块

//本机测试
var OL_Action_Root = "http://127.0.0.1:3000/news";
var xmlHttp = null;

//获取当前标题内容作为ajax参数发送
var cha = document.getElementById("title").innerText;

/*第一次读取最新通知*/
setTimeout(function() {
    Req_ajax(cha, "get");
}, 200);

/*30轮询读取函数*/
setInterval(function() {

    Req_ajax(cha, "get");

}, 3000);

function Req_ajax(info, type)
{
    $.ajax({
        data: {info:info, type:type},
        url: OL_Action_Root+"/req_ajax",
        dataType: 'json',
        cache: false,
        timeout: 5000,
        type:type,  // 如果要使用GET方式，则将此处改为'get'
        success: function(data){
            var res = data;
            if(res[0] === 'success')
            {
                document.getElementById("status").innerHTML = res[1];
            }
            else
            {
                document.getElementById("status").innerHTML = "<p style='color:#C00000; font-weight:bold;'>获取服务器信息失败！ " + res[1] + "</p>";
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            document.getElementById("status").innerHTML = "<p style='color:#C00000; font-weight:bold;'>连接不到服务器，请检查网络！</p>";
        }
    });
}
