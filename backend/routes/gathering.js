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
    connection.query('select * from university_list.gatheringboard', function(err,rows,fields){
        if(!err){
            var boardresult = JSON.parse(JSON.stringify(rows));
            res.send(boardresult);
            console.log(boardresult);
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
    var email = body.email;
    var category = body.category;
    const date = new Date();
    var currentDate = date.toFormat('YYYY-MM-DD');
    connection.query(`INSERT INTO university_list.gatheringboard (userID, title, writer, content,
     date, image, email, category) VALUES ('${userID}','${title}','${writer}','${content}','${currentDate}','${image}','${email}', '${category}')`,
        function(err,results){

    });
res.end();
});
router.get("/moreUserInfo/:userID", function(req,res,err){
    var userID = req.params.userID;
    connection.query(`SELECT email, nickname FROM university_list.user_info WHERE identity='${userID}'`, function (err,results){
        var rows = JSON.parse(JSON.stringify(results[0]));
        console.log(rows);
        res.send(rows);
    })
});

router.delete("/delete/:boardidx", function(req,res,err){
    var boardIndex = req.params.boardidx;
    connection.query(`delete from university_list.gatheringboard where idx = '${boardIndex}'`, function(err,results) {
        if(err) {
            console.log("삭제 실패");
            res.send("false");
        }
        else {
            console.log("삭제 성공");
            res.send("true");
        }
    })
});
router.get("/:idx",function(req,res,err){
    var id= req.params.idx;
    console.log("id :"+ id);
    connection.query(`select * from university_list.gatheringboard WHERE idx=${id}`, function(err,rows,fields){
        if(!err){
            res.send(rows[0]);
            console.log(rows);

        }
        else{
            console.log(err);
            res.end();
        }
    })
});
router.put("/modify/:idx",function (req,res,err){
    var boardIndex = req.params.idx;
    var body = req.body;
    var title = body.title;
    var content = body.content;
    var image = body.url;
    var category = body.category;
    const date = new Date();
    var currentDate = date.toFormat('YYYY-MM-DD');
    connection.query(`update university_list.gatheringboard set title ='${title}',content='${content}', image='${image}', date ='${currentDate}', category = '${category}' where idx = '${boardIndex}'`,function(err,results){
        if(err){
            res.send("false");
            console.log(err);
        }
        else {
            res.send("true");
            console.log("ff");
        }
        
    })
});
router.get("/:idx/comment",function(req,res,err){
    var id= req.params.idx;
    console.log("id :"+ id);
    connection.query(`select * from university_list.gatheringcommand WHERE boardID=${id}`, function(err,rows,fields){
        if(!err){
            res.send(rows);
            console.log(rows);

        }
        else{
            console.log(err);
            res.end();
        }
    })
});

router.post("/:idx/comment",function(req,res,err){
    var id= req.params.idx;
    console.log("id in post :"+ id);
    var body = req.body;
    var boardID=body.boardID;
    var userID = body.userID;
    var content = body.content;
    var writer= body.writer;
    const date = new Date();
    var currentDate = date.toFormat('YYYY-MM-DD');
    console.log("??"+`${boardID} ${userID} ${content} ${writer} ${currentDate}`)
    connection.query(`INSERT INTO university_list.gatheringcommand (boardID, content, userID, date, writer) VALUES ('${boardID}','${content}','${userID}','${currentDate}','${writer}')`, 
    function(err,rows,fields){
        if(err){
            res.send(err);
            console.log(err);
        }
    });
    res.end();
});
router.delete("/comment/:idx",function(req,res,err){//자신의 댓글을 삭제할 수 있는 부분!
    var id= req.params.idx;
    console.log("id :"+ id);
    connection.query(`delete from university_list.gatheringcommand where idx=${id}`, function(err,rows,fields){
        if(err){
            res.send(err);
            console.log(err);
        }
    });
    res.end();
});
router.get("/category/:option",function(req,res,err){
    connection.query(`select * from university_list.gatheringboard where category='${req.params.option}'`, function(err,rows,fields){
        if(!err){
            var boardresult = JSON.parse(JSON.stringify(rows));
            res.send(boardresult);
            console.log(boardresult);
        }
        else{
            console.log(err);
        }
        res.end();
    })
});
module.exports = router;