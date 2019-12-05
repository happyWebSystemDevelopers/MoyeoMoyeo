var express = require('express');
var router = express.Router();
var myDatabase = require('../db/db_conn');
var connection = myDatabase.init();
var dateUtils = require('date-utils');
  
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
    //var image = body.url;
    const date = new Date();
    var currentDate = date.toFormat('YYYY-MM-DD');
    console.log(currentDate);
    //date.subString(10);
    connection.query('insert into university_list.freeboard (userID, title, writer, content, date) values (?,?,?,?,?)', [userID,title,writer,content,currentDate],
    function(err,rows,fields) {
        if(!err){
            console.log(rows);
        }
        else {
            console.log(err);
        }
    })

});

module.exports = router;