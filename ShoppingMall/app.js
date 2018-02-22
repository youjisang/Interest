var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

// 패키지 가져오는 부분
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var autoIncrement = require('mongoose-auto-increment');

// 환경설정(성공시, 실패시)
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log('mongodb connect');
});

// 접속 부분
var connect = mongoose.connect('mongodb://127.0.0.1:27017/fastcampus', { useMongoClient: true });
autoIncrement.initialize(connect);

var admin = require('./routes/admin');

var app = express();
var port = 3000;

// 확장자가 ejs 로 끈나는 뷰 엔진을 추가한다.
app.set('views', path.join(__dirname, 'views')); // views 경로를 잡아주는 역할.
console.log(__dirname); // 디렉토리 경로 체크
app.set('view engine', 'ejs');

// 미들웨어 세팅
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/', function(req,res){
    res.send('first app 시작합니다.');  
});

app.use('/admin',admin);

app.listen(port, function(){
    console.log('Express listening on port', port);
})