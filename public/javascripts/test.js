//连接mongodb数据库

const mongoose = require('mongoose');
//连接本机mongodb
mongoose.connect('mongodb://127.0.0.1:27017/SohuNews', { useNewUrlParser: true });


//数据结构和使用的集合名称
var Task = mongoose.Schema({
    title: String,
    url: String,
    time: String,
    author: String,
    channel: String,
    personalPage: String
}, {collection: 'News'});

const dataModel = mongoose.model('News', Task, 'News');
module.exports = dataModel;
