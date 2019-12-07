var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var myDataBase=require('../db/db_conn.js');
var connection = myDataBase.init();
var selectedEmail = '';
var selectedNickName = {};


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

module.exports = router;
