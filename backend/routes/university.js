var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var universityName = [{}];
var universityIndex = [{}];
var universityMajor = [{}];
var countryName = [{}];
var specificUniName = {};
var validIdentity = {};
var validNickname = {};

/* GET users listing. */
var connection = require('../db/db_conn').init();

connection.connect(function (err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});

router.get('/name', function(req, res, next) {
    connection.query("SELECT id,name FROM university_list.uni_table GROUP BY name",function(err,results){
        if(err) console.log("ERROR");
        else
        {
            universityName = Array.from(new Set(results));
            res.json(universityName);
        }
    });
});

router.get('/nameindex/:UNAME',function(req,res,next){
    connection.query(`SELECT id,nameindex FROM university_list.uni_table WHERE name='${req.params.UNAME}' GROUP BY nameindex`,
        function(err,results){
            universityIndex = Array.from(new Set(results));
            res.json(universityIndex);
        });
});
router.get('/checkID/:ID',function(req,res,next){
    connection.query(`SELECT identity FROM university_list.country_name WHERE identity='${req.params.ID}'`,
        function(err,results){
            validIdentity = results;
            res.send(validIdentity);
        });
});
router.get('/checkNICK/:NICKNAME',function(req,res,next){
    connection.query(`SELECT identity FROM university_list.country_name WHERE identity='${req.params.NICKNAME}'`,
        function(err,results){
            validNickname = results;
            res.send(validNickname);
        });
});
router.get('/major/:UNAME/:UNAMEINDEX',function(req,res,next){

    connection.query(`SELECT id,major FROM university_list.uni_table WHERE name='${req.params.UNAME}' AND nameindex = '${req.params.UNAMEINDEX}'`,
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
    var universityName = req.body.universityName;
    var universityIndex = req.body.universityIndex;
    var major = req.body.major;
    var email = req.body.email;
    var country = req.body.country;
    var nickname = req.body.nickname;
    console.log(identity);
    connection.query(`INSERT INTO university_list.user_info (identity,name,password,
    universityName, universityIndex, major, email, country, nickname) VALUES ('${identity}',
    '${name}','${password}', '${universityName}', '${universityIndex}',
    '${major}', '${email}','${country}', '${nickname}')`,
        function(err,results){

        });
    res.end();
});

module.exports = router;
