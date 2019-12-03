<template>
    <div class ="free">
    <img id="freeboardImg" src="../assets/freeBoard.png" style ="height 70; width:150px; margin-left: 600px;">
    <button id="createButton" style ="margin-left: 310px;">Create</button>
    <hr align="left" style ="color : #dddfe6; border: 2px solid; margin-left: 120px; margin-right: 120px;"/>
    <!--<div v-for = "board in freeBoards">-->
    <!-- 여기에다가 그 router-view를 두고 이미지에 흠...-->
    <div class ="board" v-for ="(board, index) in freeBoards" :key ="board.title">
    <router-link :to = "{name : 'freeBoardDetail', params: {idx : index}}"><img v-if="board.url" v-bind:src="'images/' + board.url" style="height : 200px; width: 250px;">
    <img v-else src ="images/poster_4.jpg" style="height : 200px; width: 250px;"></router-link>
    <hr style ="boder-style : dotted; color : #E0E3DA; border : 1.2px solid;"/>
    <span style ="color : #566270;">{{ board.writer }}</span>
    <br>
    <span style ="color : #566270;">{{ board.email }}</span>
    <hr style ="boder-style : dotted; color: #E0E3DA; border : 1.2px solid;"/>
    <span style ="color : #566270;">{{ board.title }}</span>
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
    title : "Hi",
    email : "sooyoung1234@ajou.ac.kr",
    writer : "nahyun"
},
{
    url : "freeBoardDefault.png", //그 첨부파일 하는거 과제 1 참고하기 
    title : "Hi",
    email : "sooyoung1234@ajou.ac.kr",
    writer : "nahyun"
},
{
    url : "", //그 첨부파일 하는거 과제 1 참고하기 
    title : "Hi",
    email : "sooyoung1234@ajou.ac.kr",
    writer : "nahyun"
},
{
    url : "freeBoardDefault.png", //그 첨부파일 하는거 과제 1 참고하기 
    title : "Hi",
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
    border : 1.2px solid #2b90d9;
    border-radius: 7px;
    color : #2b90d9;
    height : 20px;
    width : 100px;
}
.board {
    display: inline-block;
    border : 1.5px solid;
    color : #E0E3DA;
    height: 300px;
    width: 250px;
    margin-left : 120px;
    margin-top : 50px;
    transition: 0.5s;
}
.board:hover{
    border: 3px solid #ff7473;
    border-radius : 5px;
}
</style>