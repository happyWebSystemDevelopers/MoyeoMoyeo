var express = require('express');
var router = express.Router();
const request=require('request');//api 위치이동
const convert=require('xml-js');//api 위치이동
/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

const host="http://api.visitkorea.or.kr/openapi/service/rest";
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
})



module.exports = router;
