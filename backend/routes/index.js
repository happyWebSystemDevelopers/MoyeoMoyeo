var express = require('express');
var router = express.Router();
const request = require('request');//api 위치이동
const convert = require('xml-js');//api 위치이동
const session = require('express-session');
var myDatabase = require('../db/db_conn');
var connection = myDatabase.init();
var crypto = require('crypto');





connection.connect(function (err) {   
    if (err) {     
      console.error('mysql connection error');     
      console.error(err);     
      throw err;   
    } 
});

/* GET home page. */

var indexCounter = 0;
var userList = new Array();

/*router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});*/

/*var loginData = {
    id : "nahyun",
    pwd : "1212",
    nickname : "nahyun"
};*/

router.use(session({
    key: 'sid',//세션의 키값
    secret: 'secret',//세션의 비밀 키
    resave: 'false', //세션을 항상 저장할지 여부 false권장
    saveUninitialized: true,
    cookie:{
      maxAge: 24000* 60* 60
    },
  }));

//userList.push(nahyun);

router.get("/api/login", function(req, res, next) {
    var sess = req.session;
    console.log(sess);
    res.send(sess);
    //res.redirect("/");
    //res.render('index', { title: 'Express' });
});

router.post("/api/login",function(req,res,err){
    var sess;
    sess = req.session;
    var userInfo = {
        id : req.body.id,
        pwd: req.body.pwd,
    };
    connection.query(`SELECT identity,password,nickname,salt FROM university_list.user_info WHERE identity='${userInfo.id}'`,
        function(err,results){
            if (results != ""){
                console.log(results);
                var rows = JSON.parse(JSON.stringify(results[0]));
            
            //let salt = Math.round((new Date().valueOf() * Math.random())) + "";
            let hashPassword = crypto.createHash("sha512").update(userInfo.pwd + rows.salt).digest("hex");
            console.log(rows.identity, rows.password, hashPassword);
            if(rows.identity == userInfo.id && hashPassword == rows.password){
                console.log("로그인 성공");
                sess.logined = true;
                sess.name = rows.identity;
                sess.nickname = rows.nickname;
                console.log(sess);
                res.send(sess);
            }
            else {
                    console.log("로그인 실패");
                    sess.logined = false;
                    res.send(sess);
                    //res.end();
            }
        
        }
        else {
            console.log("회원 정보가 없음.")
            sess.logined = false;
            res.send(sess);
        }
    });

    
});

router.delete("/api/logout",function(req,res,err) {
    req.session.destroy();
    res.clearCookie('sid');
    console.log("logout success");
    console.log(req.session);
    res.redirect("..");
});

/*router.get("/freeboards", function(req,res,err){ // 자유게시판 글 가져오는거
    //가져와서 글 객체 만든다음에 parse써서 하나하나 넣어주는 식으로 하자.
});
router.get("/freeboards/:idx", function(req,res,err) {
}); //게시글 가져오는거 // 여기도 게시글 객체를 만들어서 */





/*const host="http://api.visitkorea.or.kr/openapi/service/rest";
const key="pmn7BctlsDTxIuZOBYokKT0uHd5zga1LuVcirDgJinx12X%2Fx2vRQ3a2jBGBl0Zb%2FEuE0cg3ipKGCyBQQIuotgw%3D%3D";
const requestUrl=`${host}/EngService/serviceKey=${key}&numOfRows=10&pageNo=10&MobileOS=ETC&MobileApp=AppTest&listYN=Y&_type=json`;
request.get(requestUrl,(err,res,body)=>{//문화정보 api위치 이동하기
    if(err)
    {
        console.log("err");
    }
    else{
        var result=body;
        console.log(body);
        // var jsonResult=convert.xml2json(result,{compact: true, spaces: 4});
        //
        var parsing=JSON.parse(result);
        console.log(parsing);
       // console.log("length is: "+parsing.response.body.items.item.length);
        // for(let i=0;i<parsing.response.body.items.item.length;i++)
        // {
        //     if(parsing.response.body.items.item[i].regDate._text.indexOf("2019")!==-1)
        //     {
        //         console.log(parsing.response.body.items.item[i].regDate._text+"\n===========================\n");
        //     }
        // }
    }
})*/


module.exports = router;