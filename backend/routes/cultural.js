var express = require('express');
var router = express.Router();
const request = require('request');//api 위치이동
const convert = require('xml-js');//api 위치이동


const host="http://openapi.seoul.go.kr:8088/";
const key="54494757637079693337566677474e";
var rawData=[];
var rawData2=[];


const requestUrl2=`${host}${key}/xml/culturalEventInfo/1/900/`;
const requestUrl1=`${host}${key}/xml/SearchCulturalFacilitiesDetailService/1/900/`;

var dataarr=[];

//공연 문화행사 정보 api
request.get(requestUrl2,(err,response,body)=>{//문화정보 api위치 이동하기
    if(err)
    {
        console.log("err in api");
    }
    else{

        var result=body;
        var jsonResult=convert.xml2json(result,{compact: true, spaces: 900});
        var parsing=JSON.parse(jsonResult); 
        rawData2=parsing.culturalEventInfo.row
        for(let i=0;i<rawData2.length;i++)
         {
             
             var data=rawData2[i];
             if(data.PROGRAM._text==undefined)
            {
                tmpContent="자세한 사항은 상세 페이지 링크를 참조하세요!"
            }
            else{
                tmpContent=data.PROGRAM._text
                
            }
           
             dataarr.push({name: data.TITLE._text,
                           type: data.CODENAME._text,
                           imgurl: data.MAIN_IMG._text,
                           addr: data.ORG_NAME._text,
                           pageurl: data.ORG_LINK._text,
                           content: tmpContent, 
                        })

        }

    }
  
})
//공연 장소 정보 api
request.get(requestUrl1,(err,response,body)=>{//문화정보 api위치 이동하기
    if(err)
    {
        console.log("err in api");
    }
    else{

        var result=body;
        var jsonResult=convert.xml2json(result,{compact: true, spaces: 900});
        //
        
     var parsing=JSON.parse(jsonResult);
       
    rawData=parsing.SearchCulturalFacilitiesDetailService.row
     
        for(let i=0;i<rawData.length;i++)
         {
             
             var data=rawData[i];
             dataarr.push({name: data.FAC_NAME._cdata,
                         type: data.CODENAME._text,
                         imgurl: data.MAIN_IMG._text,
                         addr: data.ADDR._cdata,
                         pageurl: data.HOMEPAGE._cdata,
                         content: data.FAC_DESC._cdata,
                         })

        }

    }
  
})

router.get("/", function(req,res){
 
        console.log(dataarr.length)
        res.send(dataarr);
    
});


router.get("/:idx",function(req,res,err){
    var id= req.params.idx;
    console.log("id :"+ id);
        if(!dataarr[id])  
        {
            console.log("err");
            res.end();
        }
        else{
            let data=dataarr[id];
            
           
            console.log(data);
            res.send(data);
           
          
        }
  });

 


module.exports = router;