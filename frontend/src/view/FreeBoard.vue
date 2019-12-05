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
    <img id="freeboardImg" src="../assets/freeBoard.png" style ="width:150px; margin-left: 600px;">
    <button id="createButton" style ="margin-left: 310px;">Create</button>
    <button v-if="viewMethod=='grid'" v-on:click="toLined" class="viewChange"><img class="btnImg" src="../assets/lined.png"></button> <!--그리드/라인 보기 방식 변경하는 버튼-->
    <button v-if="viewMethod=='lined'" v-on:click="toGrid" class="viewChange"><img class="btnImg" src="../assets/grided.png"></button>
    <hr align="left" style ="color : #dddfe6; border: 2px solid; margin-left: 120px; margin-right: 120px;"/>
    <!--<div v-for = "board in freeBoards">-->
    <!-- 여기에다가 그 router-view를 두고 이미지에 흠...-->
        <div v-if="viewMethod=='grid'" id="gridBoard"> <!--원래 나현이가 만들었던 그리드 형식-->
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

        <div v-if="viewMethod=='lined'" id="linedBoard"> <!--일반 게시판처럼 볼 수 있게 추가했뜸-->
            <table style="width: 1230px; margin-left: 140px;"> <!--table 형식으로-->
                <th>Name</th>
                <th style="border-left: solid; border-left-color: #dddfe6; border-right: solid; border-right-color: #dddfe6;">E-mail</th>
                <th>Title</th>
                <br>
                <tr class ="linedBoard" v-for ="(board, index) in freeBoards" :key ="board.title">
                    <td align="center" style ="color : #566270;">{{ board.writer }}</td>
                    <td align="center" style ="color : #566270;">{{ board.email }}</td>
                    <router-link :to = "{name : 'freeBoardDetail', params: {idx : index}}"><td align="left" style ="color : #566270; left: 640px">{{ board.title }}</td></router-link>
                    <!--<hr style ="color : #E0E3DA; border : 1.2px dotted;"/>-->
                </tr>
            </table>
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
    title : "VeeeeeeeeeeeeeeeeeeeeeeeeeeeryLooooooooooooooooooooooooongTiiiiiiiiiiiiiiiiiiiiiitle",
    email : "sooyoung1234@ajou.ac.kr",
    writer : "nahyun"
}
];

export default {
    name: 'free',
    data() {
        return {
            freeBoards : freeBoardExample,
            viewMethod : 'grid' // 그리드or라인 어떤 방식으로 볼지 결정하는 플래그
        }
    },
    methods: {
        toLined : function(){ // 그리드 보기 방식일 때 누르면 라인 보기로 바뀜
            this.viewMethod = 'lined';
        },
        toGrid : function(){ // 라인 보기 방식일 때 누르면 그리드 보기로 바뀜
            this.viewMethod = 'grid';
        }
    }
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
.viewChange{
    margin-left: 10px;
}
.btnImg{
    width: 15px;
    height: 15px;
}
.linedBoard{
    margin-left: 140px;
    width : 1230px;
}
    td{ /*lined 형식으로 게시판 보여줄 때 셀들(각 게시글의 작성자, 작성자 이메일, 제목)*/
        height: 30px;
        line-height: 30px;
    }
</style>