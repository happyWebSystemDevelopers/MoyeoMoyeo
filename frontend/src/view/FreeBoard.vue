<template>
    <div class ="free">
    <img id="freeboardImg" src="../assets/freeBoard.png" style ="height : 60px; width:220px; margin-left: 650px;">
    <router-link to ="/writefreeboard"><button id="createButton" style ="margin-left: 400px; width:100px; height: 40px; font-size: 20px;">Create</button></router-link>
    <hr align="left" style ="color : #dddfe6; border: 2px solid; margin-left: 120px; margin-right: 120px;"/>
    <!--<div v-for = "board in freeBoards">-->
    <!-- 여기에다가 그 router-view를 두고 이미지에 흠...-->
    <div class ="board" v-for ="(board, index) in freeBoards" :key ="board.title">
    <router-link :to = "{name : 'freeBoardDetail', params: {idx : index}}"><img v-if="board.url" v-bind:src="'images/' + board.url" style="height : 200px; width: 260px;">
    <img v-else src ="images/poster_4.jpg" style="height : 200px; width: 260px;">
    <hr style ="boder-style : dotted; color : #E0E3DA; border : 1.2px solid;"/>
    <span style ="color : #566270;">{{ board.writer }}</span>
    <br>
    <span style ="color : #566270;">{{ board.email }}</span>
    <hr style ="boder-style : dotted; color: #E0E3DA; border : 1.2px solid;"/>
    <span style ="color : #566270;">{{ board.title }}</span></router-link>
    </div>
    </div>
</template>
<script>

//import axios from 'axios';
//freeboard를 DB에서 가져올 때 글쓴이랑 이메일이랑 제목을 가져와서 일단 보여주도록

var freeBoardExample = [{
    url : "freeBoardDefault.png", //그 첨부파일 하는거 과제 1 참고하기 
    title : "Hello",
    email : "nahyun1234@ajou.ac.kr",
    writer : "nahyun"
},
{
    url : "", //그 첨부파일 하는거 과제 1 참고하기 
    title : "Hi",
    email : "sooyoung1234@ajou.ac.kr",
    writer : "nahyun"
},
{
    url : "", //그 첨부파일 하는거 과제 1 참고하기 
    title : "Hi7",
    email : "sooyoung1234@ajou.ac.kr",
    writer : "nahyun"
},
{
    url : "freeBoardDefault.png", //그 첨부파일 하는거 과제 1 참고하기 
    title : "Hi3",
    email : "sooyoung1234@ajou.ac.kr",
    writer : "nahyun"
},
{
    url : "", //그 첨부파일 하는거 과제 1 참고하기 
    title : "Hi11",
    email : "sooyoung1234@ajou.ac.kr",
    writer : "nahyun"
},
{
    url : "freeBoardDefault.png", //그 첨부파일 하는거 과제 1 참고하기 
    title : "Hi33",
    email : "sooyoung1234@ajou.ac.kr",
    writer : "nahyun"
}
];

export default {
    name: 'free',
    data() {
        return {
            freeBoards : freeBoardExample,
        }
    },
    /*async beforeCreate() { //백엔드에서 freeboard 글 가져오는 rest.
        const result = axios.get("/freeboards");
        this.freeBoards = result;
    }*/
   
}
</script>
<style>
#createButton{
    background-color : white;
    border : 1.2px solid #4f953b;
    border-radius: 7px;
    color : #4f953b;
    height : 20px;
    width : 100px;
}
.board {
    display: inline-block;
    border : 1.5px solid;
    color : #E0E3DA;
    height: 300px;
    width: 260px;
    margin-left : 120px;
    margin-right : 85px;
    margin-top : 50px;
    transition: 0.5s;
    padding : 10px; /* 이거 글 너무 달라붙어서 좀 띄운 역할*/
}
.board:hover{
    border: 3px solid #ff7473;
    border-radius : 5px;
}
</style>