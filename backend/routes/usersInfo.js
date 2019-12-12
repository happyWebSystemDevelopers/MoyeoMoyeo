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
    var list = [name, nickname, country, university, major, universityIM];

    for(let i = 0; i < list.length; i++){
        if(list[i].length == 0 || list[i] == '----'){
            list[i] = 'is not null';
        }
        else{
            list[i] = '= ' + '\''+list[i]+'\'';
        }
    }
    console.log(list);
    console.log(`SELECT * FROM university_list.user_info WHERE name ${list[0]} && nickname ${list[1]} && country ${list[2]} && universityName ${list[3]} && universityIndex ${list[4]} && major ${list[5]}`);

    connection.query(`SELECT * FROM university_list.user_info WHERE name ${list[0]} && nickname ${list[1]} && country ${list[2]} && universityName ${list[3]} && universityIndex ${list[4]} && major ${list[5]}`,
        function(err, results){
            People= Array.from(new Set(results));
            res.json(People);
    });

});
module.exports = router;
