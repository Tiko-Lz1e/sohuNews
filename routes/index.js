var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//数据库连接
let model = require('../public/javascripts/test');

var str = '';

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', {title:'搜狐网最新的一百条新闻'});
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
  model.find({},null,{
    skip:0, // Starting Row
    limit:100, // Ending Row
    sort:{
      time: -1 //按时间降序排列
    }
  }, function (err, adventure) {
    for(var i = 0; i<100; i++) {
      //构造表格显示内容
      str += '<tr>' +
          '<th><a href=/news?channel=' + adventure[i]['channel'] + '>' + adventure[i]['channel'] + '</a></th>' +
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
