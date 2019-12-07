<template>
    <div >
    <img id="freeboardImg" src="../assets/freeBoard.png" style ="height:60px; width:220px; margin-left: 42%;">
    <router-link to ="/freeboard"><button id="gobackButton" >Go Back</button></router-link>
    <hr align="left" style ="color : #dddfe6; border: 2px solid; margin-left: 120px; margin-right: 120px;"/>
    <div class ="freeBoardDetail">
        <div id="title">
            <span id="index">[{{$route.params.idx}}] </span>
            <span id="dataTitle">{{data.title}}</span>
            <span id="date"><span class="subDate">writer : </span> {{data.writer}} <span style="margin: 5px; margin-left:10px;">|</span><span class="subDate"> date : </span>{{subDate(data.date)}}</span>
        </div>
         <hr align="left" style ="color : #dddfe6; border: 1px solid; margin-left: 7%; margin-right:7%; border-style: dashed;"/>
        <div id="content">
            <div id="dataContent">
                {{data.content}}
                dfdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                dfdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                dfdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                dfdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                <!--이미지 url추가해야함-->
            </div>
        </div>
      
    </div>
    <div id="freecomment">
        comment
    </div>
    </div>
</template>
<script>
 
 import axios from 'axios';

 export default {
        data () {
            return{
                data:{}, //free board 에서 최신글 5개 제목/id 가져온 배열
                
            }
        },
        methods : {
            subDate(date){
                return date.substring(0,10);
            },
        },
        async beforeCreate() {
       var id = this.$route.params.idx
       const freeResult = await axios.get("/api/freeboard/"+id);
        this.data = freeResult.data;
      
        }, 
    }





</script>
<style>
.freeBoardDetail{
    margin-left: 11%;
    display: inline-block;
    border : 1.5px solid #47b8e0;
    padding : 20px;
    width: 75%;
    margin-top:10px;
    color: rgb(114, 113, 113);


}
#freecomment{
    margin-top: 1%;
     margin-left: 11%;
    display: inline-block;
    border : 1.5px dashed #ffc952;
    padding : 20px;
    width: 75%;
    color: rgb(114, 113, 113);

}
#gobackButton{
     border : 1.5px solid #47b8e0;
      color: #47b8e0;
    margin-left: 350px;
    width:100px;
    height: 40px;
     font-size: 20px;
     border-radius: 5px;
     background-color: white;
}
#title{
    margin-left: 8%;
    
    margin-top: 3%;
    width: 82%;
   
}
#index{
    color: #47b8e0;
   
}
#dataTitle{
    font-size: 23px;
    font-weight: bold;
    margin-left: 5px;
}
#date{
    color:rgb(143, 152, 161);
    float: right;
    line-height: 37px;
    
}
.subDate{
    margin: 5px;
    font-size: 14px;
}
#content{
    /*height: 500px;/*일단 크기 할당하고 시작할게요!!*/
    padding-bottom: 20%;
    margin-left: 9%;
    margin-top: 3%
}
#dataContent{
    word-break: break-all;
    padding-right: 10%;
}
</style>