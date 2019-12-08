var express = require('express');
var router = express.Router();
const request = require('request');//api 위치이동
const convert = require('xml-js');//api 위치이동


const host="http://openapi.seoul.go.kr:8088/";
const key="54494757637079693337566677474e";
var rawData=[];
var rawData2=[];

router.get("/",async function(req,res,err){
  // for(let i=1;i<=711;i++)
   //{  
        
        const requestUrl1=`${host}${key}/xml/SearchCulturalFacilitiesDetailService/1/30/`;
      
        var dataarr=[];
        request.get(requestUrl1,(err,response,body)=>{//문화정보 api위치 이동하기
            if(err)
            {
                console.log("err in api");
            }
            else{

                var result=body;
                var jsonResult=convert.xml2json(result,{compact: true, spaces: 30});
                //
                
             var parsing=JSON.parse(jsonResult);
               
            rawData=parsing.SearchCulturalFacilitiesDetailService.row
             console.log("length is: "+rawData.length);
                for(let i=0;i<rawData.length;i++)
                 {
                     
                     var data=rawData[i];
                     dataarr.push({name: data.FAC_NAME._cdata, type: data.CODENAME._text, imgurl: data.MAIN_IMG._text, addr: data.ADDR._cdata})

                }

            }
           // console.log("dataarr:"+dataarr)
           res.send(dataarr);
        })
   // }
    if(err)
    {
        console.log("err");
    }
    else{
        res.end();
    }
});

router.get("/data",async function(req,res,err){
    // for(let i=1;i<=711;i++)
     //{  
          
         
          const requestUrl2=`${host}${key}/xml/culturalEventInfo/1/30/`;
          var dataarr=[];
         
        request.get(requestUrl2,(err,response,body)=>{//문화정보 api위치 이동하기
              if(err)
              {
                  console.log("err in api");
              }
              else{
  
                  var result=body;
                  var jsonResult=convert.xml2json(result,{compact: true, spaces: 30});
                  //
                 // console.log(jsonResult)
                  
               var parsing=JSON.parse(jsonResult);
               // console.log(parsing); 
               rawData2=parsing.culturalEventInfo.row
               console.log("length is: "+rawData2.length);
                  for(let i=0;i<rawData2.length;i++)
                   {
                       
                       var data=rawData2[i];
                       dataarr.push({name: data.TITLE._text, type: data.CODENAME._text, imgurl: data.MAIN_IMG._text, addr: data.ORG_NAME._text})
  
                  }
  
              }
            //  console.log("dataarr:"+dataarr)
             res.send(dataarr);
          })
     // }
      if(err)
      {
          console.log("err");
      }
      else{
          res.end();
      }
  });

router.get("/:idx",function(req,res,err){
    var id= req.params.idx;
    console.log("id :"+ id);
        if(!rawData[id])  
        {
            console.log("err");
            res.end();
        }
        else{
            let data=rawData[id];
            
            let result={name: data.FAC_NAME._cdata,
                        type: data.CODENAME._text, 
                        imgurl: data.MAIN_IMG._text, 
                        addr: data.ADDR._cdata,
                        pageurl: data.HOMEPAGE._cdata,
                        content: data.FAC_DESC._cdata
                        }
            console.log(result);
            res.send(result);
           
          
        }
  });
  router.get("/data/:idx",function(req,res,err){
    var id= req.params.idx;
    console.log("id :"+ id);
        if(!rawData2[id])  
        {
            console.log("err");
            res.end();
        }
        else{
       
            var tmpContent;
            //console.log("!!!:"+data.PROGRAM)
           
            let data=rawData2[id];
            if(data.PROGRAM._text==undefined)
            {
                tmpContent="자세한 사항은 상세 페이지 링크를 참조하세요!"
            }
            else{
                tmpContent=data.PROGRAM._text
                console.log("tmp is :"+tmpContent)
            }
            let result={name: data.TITLE._text,
                        type: data.CODENAME._text, 
                        imgurl: data.MAIN_IMG._text, 
                        addr: data.ORG_NAME._text,
                        pageurl: data.ORG_LINK._text,
                        content: tmpContent,
                        }
            console.log(result);
            res.send(result);
           
          
        }
  });


module.exports = router;