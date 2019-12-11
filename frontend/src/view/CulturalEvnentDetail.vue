<template>
    <div >
    <img id="CulturalImg" src="../assets/culturalboard.png" style ="height:80px; width:280px; margin-left: 42%;">
    <router-link to ="/cultural"><button id="cgobackButton" >Go Back</button></router-link>
    <hr align="left" style ="color : #dddfe6; border: 2px solid; margin-left: 120px; margin-right: 120px;"/>
    <div class ="culturalDetail">
        <div id="ctitle">
            <span id="cindex">[{{$route.params.idx}}] </span>
            <span id="dataName">{{data.name}}</span>
           
        </div>
        
         <hr align="left" style ="color : #dddfe6; border: 1px solid; margin-left: 7%; margin-right:7%; border-style: dashed;"/>
         <div id="content">
         <a v-bind:href ="data.pageurl" target ="_blank">{{checkUrlLength(data.pageurl)}}</a>
        <hr align="left" style ="color : #dddfe6; border: 1px solid; margin-left: 0%; margin-right:9%; border-style: dashed;"/>
        {{data.addr}}
        <hr align="left" style ="color : #dddfe6; border: 1px solid; margin-left: 0%; margin-right:9%; border-style: dashed;"/>
        <img class="Img" v-if="data.imgurl" :src="checkUrl(data.imgurl)" /> 
        <img class="Img" v-else src="@/../public/images/cultural.jpg" />
        <hr align="left" style ="color : #dddfe6; border: 1px solid; margin-left: 0%; margin-right:9%; border-style: dashed;"/>
        
            <div id="dataContent">
               <div v-html="content"></div>
                
            </div>
        </div>
      
    </div>
 
    </div>
</template>
<script>
 
 import axios from 'axios';


 export default {
        data () {
            return{
                data:{}, //free board 에서 최신글 5개 제목/id 가져온 배열
                content:'',
            }
        },
        methods : {
            checkUrl(url){
            if(String(url).match(/http/g)!=null)
            {
                if(String(url).match(/http/g).length==2)
                {
                    return url.substring(26);
                }
                else return url;
            } 
            return url;
        },
        checkUrlLength(url) {
                if (String(url).length > 100) return String(url).substring(0, 100) + "...";
                else return url;
            },
          
          
        },
        async beforeCreate() {
     
        var id = this.$route.params.idx
        const CulturalResult = await axios.get("/api/cultural/"+id);
        this.data = CulturalResult.data;
        this.content=this.data.content;
      
      
        }, 
    }





</script>
<style>
.culturalDetail{
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
    padding-bottom: 4%;
    width: 75%;
    color: rgb(114, 113, 113);

}
#cgobackButton{
     border : 1.5px solid #47b8e0;
      color: #47b8e0;
    margin-left: 350px;
    width:100px;
    height: 40px;
     font-size: 20px;
     border-radius: 5px;
     background-color: white;
}
#ctitle{
    margin-left: 8%;
    word-break: break-all;
    margin-top: 3%;
    width: 82%;
   
}
.Img{
    height:400px;
    width:500px;
}
#cindex{
    color: #47b8e0;
   
}
#dataName{
    font-size: 23px;
    font-weight: bold;
    margin-left: 5px;
}
#date{
    color:rgb(143, 152, 161);
    float: right;
    line-height: 34px;
    
}
.subDate{
    margin: 5px;
    font-size: 14px;
}
#content{
    /*height: 500px;/*일단 크기 할당하고 시작할게요!!*/
    padding-bottom: 20%;
    margin-left: 9%;
    margin-top: 3%;
    word-break: break-all;
}
#dataContent{
    word-break: break-all;
    padding-right: 10%;
}

</style>