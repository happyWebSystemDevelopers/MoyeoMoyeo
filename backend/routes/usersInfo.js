var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var myDataBase=require('../db/db_conn.js');
var connection = myDataBase.init();
var selectedEmail = '';
var selectedNickName = {};
var People = [{}];

connection.connect(function (err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});
router.get('/getNickName/:userid',function(req,res,next){
    connection.query(`SELECT nickname FROM university_list.user_info WHERE identity='${req.params.userid}'`,
        function(err,results){
            selectedNickName= results.nickname;
            res.send(selectedNickName);
        });
});
router.get('/getEmail/:userid',function(req,res,next){
    connection.query(`SELECT email FROM university_list.user_info WHERE identity='${req.params.userid}'`,
        function(err,results){
            var rows = JSON.parse(JSON.stringify(results[0]));
            selectedEmail= rows.email;
            console.log("ffffffffffff"+selectedEmail);
            res.send(selectedEmail);
        });
});

router.post('/postByWhole', function(req,res,next){
    var body = req.body;
    var name = body.name;
    var nickname = body.nickname;
    var country = body.country;
    var university = body.university;
    var major = body.major;
    var universityIM = body.majorUniversityIndex;
    //하드코딩시자아악
    //다 들어있는 경우
    if(name.length!=0 && nickname.length!=0 && country.length!=0 && university.length!=0 && major.length!=0){
        connection.query(`SELECT * FROM university_list.user_info WHERE name='${name}' && nickname = '${nickname}' && country = '${country}' && universityName = '${university}' && universityIndex = '${universityIM}' && major = '${major}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            });
    }
    //한개씩 안쓴경우
    else if(name.length==0 && nickname.length!=0 && country.length!=0 && university.length!=0 && major.length!=0){
        connection.query(`SELECT * FROM university_list.user_info WHERE nickname = '${nickname}' && country = '${country}' && universityName = '${university}' && universityIndex = '${universityIM}' && major = '${major}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            });
    }
    else if(name.length!=0 && nickname.length==0 && country.length!=0 && university.length!=0 && major.length!=0){
        connection.query(`SELECT * FROM university_list.user_info WHERE name='${name}' && country = '${country}' && universityName = '${university}' && universityIndex = '${universityIM}' && major = '${major}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }
    else if(name.length!=0 && nickname.length!=0 && country.length==0 && university.length!=0 && major.length!=0){
        connection.query(`SELECT * FROM university_list.user_info WHERE name='${name}' && nickname = '${nickname}' && universityName = '${university}' && universityIndex = '${universityIM}' && major = '${major}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }

    //예외
    //university 선택 안하면 자연스럽게 major 도 선택안한걸루한다
    else if(name.length!=0 && nickname.length!=0 && country.length!=0 && university.length==0 && major.length==0){
        connection.query(`SELECT * FROM university_list.user_info WHERE name='${name}' && nickname = '${nickname}' && country = '${country}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }

    else if(name.length!=0 && nickname.length!=0 && country.length!=0 && university.length!=0 && major.length==0){
        connection.query(`SELECT * FROM university_list.user_info WHERE name='${name}' && nickname = '${nickname}' && country = '${country}' && universityName = '${university}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }

    //두개씩 안쓴경우
    else if(name.length==0 && nickname.length==0 && country.length!=0 && university.length!=0 && major.length!=0){
        connection.query(`SELECT * FROM university_list.user_info WHERE country = '${country}' && universityName = '${university}' && universityIndex = '${universityIM}' && major = '${major}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }
    else if(name.length==0 && nickname.length!=0 && country.length==0 && university.length!=0 && major.length!=0){
        connection.query(`SELECT * FROM university_list.user_info WHERE nickname = '${nickname}' && universityName = '${university}' && universityIndex = '${universityIM}' && major = '${major}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }
    //예외
    //university 선택 안해서 major 선택 안함
    else if(name.length==0 && nickname.length!=0 && country.length!=0 && university.length==0 && major.length==0){
        connection.query(`SELECT * FROM university_list.user_info WHERE nickname = '${nickname}' && country = '${country}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }
    else if(name.length==0 && nickname.length!=0 && country.length!=0 && university.length!=0 && major.length==0){
        connection.query(`SELECT * FROM university_list.user_info WHERE name='${name}' && nickname = '${nickname}' && country = '${country}' && universityName = '${university}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }

    else if(name.length!=0 && nickname.length==0 && country.length==0 && university.length!=0 && major.length!=0){
        connection.query(`SELECT * FROM university_list.user_info WHERE name='${name}' && universityName = '${university}' && universityIndex = '${universityIM}' && major = '${major}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }
    //예외
    //university 선택 안해서 major 선택안함
    else if(name.length!=0 && nickname.length==0 && country.length!=0 && university.length==0 && major.length==0){
        connection.query(`SELECT * FROM university_list.user_info WHERE name='${name}' && country = '${country}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }

    else if(name.length!=0 && nickname.length==0 && country.length!=0 && university.length!=0 && major.length==0){
        connection.query(`SELECT * FROM university_list.user_info WHERE name='${name}' && country = '${country}' && universityName = '${university}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }
    //예외
    //university 선택 안해서 major 선택 안함
    else if(name.length!=0 && nickname.length!=0 && country.length==0 && university.length==0 && major.length==0){
        connection.query(`SELECT * FROM university_list.user_info WHERE name='${name}' && nickname = '${nickname}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }

    else if(name.length!=0 && nickname.length!=0 && country.length==0 && university.length!=0 && major.length==0){
        connection.query(`SELECT * FROM university_list.user_info WHERE name='${name}' && nickname = '${nickname}' && universityName = '${university}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }

    //3개 체크 안했을때 꼬우우
    else if(name.length==0 & nickname.length==0 && country.length==0 && university.length!=0 && major.length!=0){
        connection.query(`SELECT * FROM university_list.user_info WHERE universityName = '${university}' && universityIndex = '${universityIM}' && major = '${major}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }
    //예외

    else if(name.length==0 & nickname.length==0 && country.length!=0 && university.length==0 && major.length==0){
        connection.query(`SELECT * FROM university_list.user_info WHERE country = '${country}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }
    else if(name.length==0 & nickname.length==0 && country.length!=0 && university.length!=0 && major.length==0){
        connection.query(`SELECT * FROM university_list.user_info WHERE country = '${country}' && universityName = '${university}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }
    //예외

    else if(name.length==0 & nickname.length!=0 && country.length==0 && university.length==0 && major.length==0){
        connection.query(`SELECT * FROM university_list.user_info WHERE nickname = '${nickname}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }

    else if(name.length==0 & nickname.length!=0 && country.length==0 && university.length!=0 && major.length==0){
        connection.query(`SELECT * FROM university_list.user_info WHERE nickname = '${nickname}' && universityName = '${university}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }
    //예외
    else if(name.length!=0 & nickname.length==0 && country.length==0 && university.length==0 && major.length==0){
        connection.query(`SELECT * FROM university_list.user_info WHERE name='${name}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }
    else if(name.length!=0 & nickname.length==0 && country.length==0 && university.length!=0 && major.length==0){
        connection.query(`SELECT * FROM university_list.user_info WHERE name='${name}' && universityName = '${university}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }

    //4개 선택 안했을때//1개 선택
    else if(name.length==0 & nickname.length==0 && country.length==0 && university.length!=0 && major.length==0){
        connection.query(`SELECT * FROM university_list.user_info WHERE universityName = '${university}'`,
            function (err, results) {
                People= Array.from(new Set(results));
                res.json(People);
            })
    }

});
module.exports = router;
