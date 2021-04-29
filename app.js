const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');

app.set('port', 8005);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

nunjucks.configure('views', { // html의 nunjucks를 해석해서 화면에 출력해줌.
    express: app,
    watch: true,
  });
app.use(express.urlencoded({ extended: false })); // 4.16.0 버전부터 body-parser의 일부 기능이 내장되어 이 두줄만 써도 사용 가능하다.
app.use(cookieParser(process.env.COOKIE_SECRET)); // 요청된 쿠키를 쉽게 추출할 수 있도록 해주는 미들웨어. process.env.COOKIE_SECRET은 암호화된 쿠키를 사용할 수 있도록 .env에서 가져옴

app.get('/join', (req, res) => {
    res.render('join', {title: 'Do_suha & His_suha'});
})
app.post('/main', (req, res) => {
    const {id, password} = req.body;
    try{
        if(id == "aaa" && password == "1"){
            console.log("야발람아");
            res.render('main', {title: 'Do_suha & His_suha'});
        }else{
            // res.redirect('/');
        }
    }catch(err){
        console.log(err);
        done(err);
    }
});
app.get('/', (req, res) => {
    res.render('login');
});


app.use((err, req, res, next) => { // 에러를 처리하는 미들웨어. 인자가 4개면 에러처리이닷
    console.log(err);
    res.status(err.status || 500);
  });

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
  });
