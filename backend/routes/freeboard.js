var express = require('express');
var router = express.Router();
var myDatabase = require('../db/db_conn.js');
var connection = myDatabase.init();
var dateUtils = require('date-utils');
// var mysql = require('mysql');


connection.connect(function (err) {   
    if (err) {     
      console.error('mysql connection error');     
      console.error(err);     
      throw err;   
    } 
});

router.get("/",function(req,res,err){
    connection.query('select * from university_list.freeboard', function(err,rows,fields){
        if(!err){
            console.log(rows);
            //console.log(fields);
        }
        else{
            console.log(err);
        }
    })
});

router.post("/write",function(req,res,err){
    var body = req.body;
    var title = body.title;
    var writer = body.writer;
    var userID = body.userID;
    var content = body.content;
    var image = body.url;
    const date = new Date();
    var currentDate = date.toFormat('YYYY-MM-DD');
    connection.query(`INSERT INTO university_list.freeboard (userID, title, writer, content,
     date,image) VALUES ('${userID}','${title}','${writer}','${content}','${currentDate}','${image}')`,
        function(err,results){

    });
res.end();
});

module.exports = router;