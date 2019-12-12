var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var crypto = require('crypto');
var universityName = [{}];
var universityIndex = [{}];
var universityMajor = [{}];
var countryName = [{}];
var specificUniName = {};
//var validIdentity = {};
//var validNickname = {};

/* GET users listing. */
var myDataBase=require('../db/db_conn.js');
var connection = myDataBase.init();

connection.connect(function (err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});

router.get('/name', function(req, res, next) {
    connection.query("SELECT name FROM university_list.uni_table GROUP BY name",function(err,results){
        if(err) console.log("ERROR");
        else
        {
            universityName = Array.from(new Set(results));
            res.json(universityName);
        }
    });
});

router.get('/nameindex/:UNAME',function(req,res,next){
    connection.query(`SELECT nameindex FROM university_list.uni_table WHERE name='${req.params.UNAME}' GROUP BY nameindex`,
        function(err,results){
            universityIndex = Array.from(new Set(results));
            res.json(universityIndex);
        });
});
router.get('/checkID/:ID',function(req,res,next){
    connection.query(`SELECT identity FROM university_list.user_info WHERE identity='${req.params.ID}'`,
        function(err,results){
            console.log(err);
            if(results[0] == null){
                res.send("true");
            }else {
                res.send("false");
            }
            //validIdentity = results[0];
            //console.log(validIdentity.identity);
            //res.send(validIdentity.identity);
        });
});
router.get('/checkNICK/:NICKNAME',function(req,res,next){
    connection.query(`SELECT nickname FROM university_list.user_info WHERE nickname='${req.params.NICKNAME}'`,
        function(err,results){
            if(results[0] == null){
                console.log("hh");
                res.send("true");
            }else {
                res.send("false");
            }
            //validNickname = results[0];
            //console.log(validNickname.nickname);
            //res.send(validNickname.nickname);
        });
});

router.get('/major/:UNAME/:UNAMEINDEX',function(req,res,next){

    connection.query(`SELECT major FROM university_list.uni_table WHERE name='${req.params.UNAME}' AND nameindex = '${req.params.UNAMEINDEX}'`,
        function(err,results){
            universityMajor = Array.from(new Set(results));
            res.json(universityMajor);
        });
});

router.get('/country',function(req,res,next){
    connection.query('SELECT * FROM university_list.country_name',
        function(err,results){
            countryName = Array.from(new Set(results));
            res.json(countryName);
        });
});

router.post('/users',function(req,res,next){
    var identity = req.body.identity;
    var name = req.body.name;
    var password = req.body.password;
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash("sha512").update(password + salt).digest("hex");
    var universityName = req.body.universityName;
    var universityIndex = req.body.universityIndex;
    var major = req.body.major;
    var email = req.body.email;
    var country = req.body.country;
    var nickname = req.body.nickname;
    //console.log(identity, hashPassword);
    connection.query(`INSERT INTO university_list.user_info (identity,name,salt,password,
    universityName, universityIndex, major, email, country, nickname) VALUES ('${identity}',
    '${name}','${salt}','${hashPassword}', '${universityName}', '${universityIndex}',
    '${major}', '${email}','${country}', '${nickname}')`,
        function(err,results){

        });
    res.end();
});

module.exports = router;
