<template>
    <div >
        <img id="gatheringboardImg" src="../assets/gatheringboard.png" style ="height : 60px; width:300px; margin-left: 40%;">
    <router-link to ="/gatheringboard"><button id="gobackButton" >Go Back</button></router-link>
    <hr align="left" style ="color : #dddfe6; border: 2px solid; margin-left: 120px; margin-right: 120px;"/>
    <div class ="gatheringBoardDetail">
        <div id="title">
            <span id="index">[{{$route.params.idx}}] </span>
            <span id="dataTitle">{{data.title}}</span>
            <span id="date"><span class="subDate">writer : </span> {{data.writer}} <span style="margin: 5px; margin-left:10px;">|</span><span class="subDate"> date : </span>{{subDate(data.date)}}</span>
        </div>
         <hr align="left" style ="color : #dddfe6; border: 1px solid; margin-left: 7%; margin-right:7%; border-style: dashed;"/>
        <div id="content">
            <div id="dataContent">
                {{data.content}}
                <!--이미지 url추가해야함-->
            </div>
        </div>
    </div>
    <div id="gatheringcomment">
        <div id="commentTitle">comment</div>
        <div id="commentData" v-for="c in comments" :key="c.idx">
          <span id="commentWriter">{{c.writer}} : </span>
          <span id="commentContent">{{c.content}}</span>
          <span id="commentDate">{{subDate(c.date)}}</span>
          <span  v-if="checkUser(c.userID)"><button @click="deleteComment(c.idx)" id="deleteButton" >Delete</button></span>
            <hr align="left" style ="color : #dddfe6; border: 1px solid; border-style: dashed;" />
            
        </div>
        <br/>
        <br/>
        <input type="text" id="writeComment" @keyup.enter="addComment" v-model="content"  placeholder = "Comment"/>
        <button @click="addComment" id="commentButton" >Add</button>
    </div>
    </div>
</template>
<script>
 
 import axios from 'axios';


 export default {
        data () {
            return{
                data:{}, //free board 에서 최신글 5개 제목/id 가져온 배열
                comments:[],
                content:'',
                userid: '',
                userNickName: '',
            }
        },
        methods : {
            checkUser(id){
                if(this.userid==id) return true;
                else return false;

            },
            async deleteComment(idx){
                    var id = this.$route.params.idx
                    await axios.delete("/api/gatheringboard/comment/"+idx);//댓글삭제 api요청
                    const commentsResult = await axios.get("/api/gatheringboard/"+id+"/comment");
                    this.comments = commentsResult.data;
                
            },
            async addComment(){
                
                if(this.content!='')
                {
                    
                    var id = this.$route.params.idx
                    await axios.post("/api/gatheringboard/"+id+"/comment",{boardID: id, content :this.content, userID : this.userid, writer: this.userNickName});
                    this.content='';
                    const commentsResult = await axios.get("/api/gatheringboard/"+id+"/comment");
                    this.comments = commentsResult.data;
                }
            },
            subDate(date){
               
                return  String(date).substring(0,10);
            },
        },
        async beforeCreate() {
        const result = await axios.get("/api/login");
        this.userid = result.data.name;
        this.userNickName = result.data.nickname;
        var id = this.$route.params.idx
        const freeResult = await axios.get("/api/gatheringboard/"+id);
        this.data = freeResult.data;
        const commentsResult = await axios.get("/api/gatheringboard/"+id+"/comment");
        this.comments = commentsResult.data;
      
        }, 
    }





</script>
<style>
.gatheringBoardDetail{
    margin-left: 11%;
    display: inline-block;
    border : 1.5px solid #47b8e0;
    padding : 20px;
    width: 75%;
    margin-top:10px;
    color: rgb(114, 113, 113);


}
#gatheringcomment{
    margin-top: 1%;
     margin-left: 11%;
    display: inline-block;
    border : 1.5px dashed #ffc952;
    padding : 40px;
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
    word-break: break-all;
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
    margin-top: 3%
}
#dataContent{
    word-break: break-all;
    padding-right: 10%;
}
#commentTitle
{
    font-weight: bold;
    font-size: 24px;
    margin-left: 2%;
    margin-bottom: 30px;
}
#commentData{/*전체 댓글을 묶는 틀입니다*/
    margin-left: 5%;
    margin-right: 5%;
    word-break: break-all;
}
#writeComment{
    width: 50%;
     margin-left: 5%;
    
     
}
#commentButton{
    border : 1.5px solid #ffc952;
      color:#ffc952;
    margin-left: 20px;
    width:70px;
    height: 30px;
     font-size: 18px;
     border-radius: 5px;
     background-color: white;
}
#commentWriter{
    font-size: 15px;
    font-weight: bold;
    margin-right: 1%;
}
#commentContent{
     margin-right: 1%;
     
}
#commentDate{
    font-size: 11px;
    color:rgb(160, 159, 159);
}
#deleteButton{
     border : 1.5px solid #ffc952;
    color:#ffc952;
    margin-left: 20px;
    width:50px;
    height: 20px;
     font-size: 10px;
     border-radius: 5px;
     background-color: white;

}
</style>