var express = require('express');
var router = express.Router();
const request=require('request');//api 위치이동
const convert=require('xml-js');//api 위치이동

/* GET home page. */

//db connection부터 주석처리했음
var myDatabase=require('../db/db_conn.js');
var connection= myDatabase.init();
  
  connection.connect(function (err) {   
    if (err) {     
      console.error('mysql connection error');     
      console.error(err);     
      throw err;   
    } 
  });


router.get("/free", function(req, res, next) {// 새로운거 5개 제목받아오기
    connection.query('SELECT * FROM university_list.freeboard ORDER BY date DESC limit 5', function(err, datas){
        if(err) console.log("free board err!");
        else{
            let hi=null;
            console.log(`hihi${hi}hello`)
            res.send(datas);
        }
    })
   
});
/*
router.get("/gathering", function(req, res, next) {
    connection.query('SELECT title FROM university_list.gathering_table', function(err, datas){
        if(err) console.log("free board err!");
        else{
            res.send(datas);
        }
    })
   
});

router.get("/cultural", function(req, res, next) {
    connection.query('SELECT title FROM university_list.cultural_table', function(err, datas){
        if(err) console.log("free board err!");
        else{
            res.send(datas);
        }
    })
});
*/

module.exports = router;
