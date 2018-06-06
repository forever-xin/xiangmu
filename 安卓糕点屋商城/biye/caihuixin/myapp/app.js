// $ DEBUG=myapp npm start

var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());

var index = require('./routes/index');
var ejs = require('ejs');
var jade = require('jade');
var path = require('path');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
//注册ejs模板为html页。简单的讲，就是原来以.ejs为后缀的模板页，现在的后缀名可以//是.html了
app.engine('.html', require('ejs').__express);
//设置视图模板的默认后缀名为.html,避免了每次res.Render("xx.html")的尴尬
app.set('view engine', 'html');
app.use(express.static('public'));

app.use('/', index);

module.exports = app;
