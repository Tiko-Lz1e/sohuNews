var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var url = require('url');

//数据库连接
let model = require('../public/javascripts/test');

var str = '';

/* GET home page. */
router.get('/', function(req, res, next) {
    //获取get参数，将其作为title显示在前端
    var parseObj = url.parse(req.url, true);
    req.query = parseObj.query;

    res.render('news', {title: req.query.name});
});

router.get('/req_ajax', function(req, res, next){
    /* req.query对象
       通常称为GET请求参数。
       包含以键值对存放的查询字符串参数
       req.query不需要任何中间件即可使用
  */
    var type = req.query.type;
    var info = req.query.info;
    str = '';
    model.find({"author": info},null,{
        skip:0, // Starting Row
        limit:20, // Ending Row
        sort:{
            time: -1 //按时间降序排列
        }
    }, function (err, adventure) {
        for(var i = 0; i<20; i++) {
            //构造表格显示内容
            str += '<tr>' +
                '<th>' + adventure[i]['channel'] + '</th>' +
                '<th><a href="' + adventure[i]['url'] + '">' + adventure[i]['title'] + '</a></th>' +
                '<th><a href="' + adventure[i]['personalPage'] + '">' + adventure[i]['author'] + '</a></th>' +
                '<th>' + adventure[i]['time'] + '</th>' +
                '</tr>';
        }
        if (err) throw err;
        console.log("服务器收到一个Ajax ["+type+"] 请求，信息为："+info);
        res.json(['success', str]);
    });

});

module.exports = router;
