<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class ="free">
        <img id="freeboardImg" src="../assets/freeBoard.png" style ="height : 60px; width:220px; margin-left: 42%;">
        <router-link to ="/writefreeboard"><button id="createButton" style ="margin-left: 350px; width:100px; height: 40px; font-size: 20px;">Create</button></router-link>
        <button v-if="viewMethod=='grid'" v-on:click="toLined" class="viewChange"><img class="btnImg" src="../assets/lined.png"></button> <!--그리드/라인 보기 방식 변경하는 버튼-->
        <button v-if="viewMethod=='lined'" v-on:click="toGrid" class="viewChange"><img class="btnImg" src="../assets/grided.png"></button>
        <hr align="left" style ="color : #dddfe6; border: 2px solid; margin-left: 120px; margin-right: 120px;"/>
        <!--<div v-for = "board in freeBoards">-->
        <!-- 여기에다가 그 router-view를 두고 이미지에 흠...-->
        <div v-if="viewMethod=='grid'" id="gridBoard"> <!--원래 나현이가 만들었던 그리드 형식-->

            <div id ="board" v-for ="board in paginatedData" :key ="board.title">
                <router-link :to="{name : 'freeBoardDetail', params: {idx : board.idx}}"><img class="boardImg" v-if="board.image" id="changedImage" src="images/595811_1140x516.jpg"/>

                    <img class="boardImg" v-else src ="images/default.jpg"> <!--default를 겨울왕국이미지로 했는데 이거 나중에 수정해야함-->
                   <hr style ="boder-style : dotted; color : #E0E3DA; border : 1.2px solid;"/>
                    <span style ="color : #566270;">{{ board.writer }}</span>
                    <br>
                    <span style ="color : #566270;">{{ board.email }}</span>
                    <hr style ="boder-style : dotted; color: #E0E3DA; border : 1.2px solid;"/>
                    <span style ="color : #566270;" :title="board.title">{{ checkBoardTitle(board.title) }}</span></router-link>
                <div v-if="checkBoardUser(board.userID)">
                    <hr>
                    <button class = "moreService" v-on:click="deleteBoard(board.idx)">Delete</button>
                    <router-link :to="{name : 'modifyFreeBoard', params: {idx : board.idx}}"><button class = "moreService">Modify</button></router-link>
                </div>
                <div v-else>
                    <hr>
                    <button class = "moreService2" v-on:click="alertMoreInfo(board.userID)">More user Info</button>
                </div>
            </div>
            <div class="btn-cover">
                <button :disabled="pageNum === 0" @click="prevPage"  class="leftButton">
                    <img src="../../public/images/left.jpg" style="width: 30px; height: 20px"/> </button>
                <span class="page-count" style="color: #47b8e0; font-weight: bold; size: 30px;"> {{ pageNum + 1 }} / {{ pageCount }} </span>
                <button :disabled="pageNum >= pageCount - 1" @click="nextPage"  class="rightButton">
                    <img src="../../public/images/right.jpg" style="width: 30px; height: 20px"/>
                </button>
            </div>
        </div>

        <div v-if="viewMethod=='lined'" id="linedBoard"> <!--일반 게시판처럼 볼 수 있게 추가했뜸-->
            <table style="width: 1230px; margin-left: 140px;"> <!--table 형식으로-->
                <th>Name</th>
                <th style="border-left: solid; border-left-color: #dddfe6; border-right: solid; border-right-color: #dddfe6;">E-mail</th>
                <th>Title</th>
                <br>
                <tr class ="linedBoard" v-for ="board in paginatedDataLined" :key ="board.idx">
                    <td align="center" style ="color : #566270;">{{ board.writer }}</td>
                    <td align="center" style ="color : #566270;">{{ board.email }}</td>
                    <router-link :to="{name : 'freeBoardDetail', params: {idx : board.idx}}"><td align="left" style ="color : #566270; left: 640px" :title="board.title">{{ checkBoardTitle(board.title) }}</td></router-link>
                    <!--<hr style ="color : #E0E3DA; border : 1.2px dotted;"/>-->
                </tr>
            </table>
            <div class="btn-cover">
                <button :disabled="pageNumLined === 0" @click="prevPageLined"  class="leftButton">
                    <img src="../../public/images/left.jpg" style="width: 30px; height: 20px"/> </button>
                <span class="page-count" style="color: #47b8e0; font-weight: bold; size: 30px;"> {{ pageNumLined + 1 }} / {{ pageCountLined }} </span>
                <button :disabled="pageNumLined >= pageCountLined - 1" @click="nextPageLined"  class="rightButton">
                    <img src="../../public/images/right.jpg" style="width: 30px; height: 20px"/>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    //freeboard를 DB에서 가져올 때 글쓴이랑 이메일이랑 제목을 가져와서 일단 보여주도록
    export default {
        name: 'free',
        data() {
            return {
                freeBoards: '',
                viewMethod: 'grid', // 그리드or라인 어떤 방식으로 볼지 결정하는 플래그
                modifyON: false,
                boarduser: '',
                pageNum:0,
                pageNumLined:0,
            }
        },
        props:{
            pageSize:{
                type:Number,
                required:false,
                default:3
            },
            pageSizeLined:{
                type:Number,
                required:false,
                default:12
            }
        },
        methods: {
            getURL(board) {
                //여기서 board blob to url 풀이
                if(board!=null) {
                   
                    return '../assets/595811_1140x516.jpg';
                

                }
            },
            toLined: function () { // 그리드 보기 방식일 때 누르면 라인 보기로 바뀜
                this.viewMethod = 'lined';
            },
            toGrid: function () { // 라인 보기 방식일 때 누르면 그리드 보기로 바뀜
                this.viewMethod = 'grid';
            },
            checkBoardTitle(title) {
                if (title.length > 25) return title.substring(0, 25) + "...";
                else return title;
            },
            alertMoreInfo: async function (alertUserID) { // 다른사람이 쓴 글에서 그 글쓴이 정보 alert
                const res = await axios.get("/api/freeboard/moreUserInfo/" + alertUserID);
                //alert(res.data);
                alert("Writer : " + res.data.nickname + " , Email : " + res.data.email);
            },
            deleteBoard: async function (boardIndex) {
                const res = await axios.delete("/api/freeboard/delete/" + boardIndex);
                if (res.data == true) alert("Success Delete");
                const result = await axios.get("/api/freeboard");
                this.freeBoards = result.data;
                this.router.push({
                    name: 'free'
                })

            },
            checkBoardUser: function (boardUserID) { // 자기가 쓴 글인 경우 수정 및 삭제를 할 수 있는 메뉴? 보여주는 플래그
                if (boardUserID == this.boarduser) {
                    return true;
                } else return false;
            },
            nextPage(){
                this.pageNum += 1;
            },
            prevPage(){
                this.pageNum -= 1;
            },
            prevPageLined(){
                this.pageNumLined -= 1;
            },
            nextPageLined(){
                this.pageNumLined += 1;
            }
        },
        computed: {
            totalNum() {
                return this.freeBoards.length;
            },
            pageCount() {
                let listLeng = this.freeBoards.length,
                    listSize = this.pageSize,
                    page = Math.floor(listLeng / listSize);
                if (listLeng % listSize > 0) page += 1;
                return page;
            },
            pageCountLined(){
                let listLeng = this.freeBoards.length,
                    listSize = this.pageSizeLined,
                    page = Math.floor(listLeng / listSize);
                if (listLeng % listSize > 0) page += 1;
                return page;
            },
            paginatedData() {
                const start = this.pageNum * this.pageSize,
                    end = start + this.pageSize;
                return this.freeBoards.slice(start, end);
            },
            paginatedDataLined(){
                const start = this.pageNumLined * this.pageSizeLined,
                    end = start + this.pageSizeLined;
                return this.freeBoards.slice(start, end);
            }
        },
        async beforeCreate() { //백엔드에서 freeboard 글 가져오는 rest.
            const result = await axios.get("/api/freeboard");
            this.freeBoards = result.data;
            //전체 free board 개수 구하기
            const loginresult = await axios.get("/api/login");
            this.sessionCheck = loginresult.data.logined;
            this.boarduser = loginresult.data.name;//로그인한 유저 아이디
        },
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
    #board{
        display: inline-block;
        border : 2px solid;
        color : #E0E3DA;
        border-radius : 5px;
        height: 370px;
        width: 260px;
        margin-left : 120px;
        margin-right : 85px;
        margin-top : 30px;
        transition: 0.5s;
        text-align: center;
        align-content: center;

        /* 이거 글 너무 달라붙어서 좀 띄운 역할*/
    }
    #board:hover{
        border: 2px solid #ff7473;
        border-radius : 5px;
    }
    .viewChange{
        padding-top: 2px;
        margin-left: 10px;
        background-color : white;
        border : 1.2px solid #4f953b;
        border-radius: 7px;
        color : #4f953b;
        height : 30px;
        width : 30px;
    }
    .btnImg{
        width: 15px;
        height: 20px;
    }
    .linedBoard{
        margin-left: 140px;
        width : 1230px;
        line-height: 12px;
        font-size: 14px;
    }
    td{ /*lined 형식으로 게시판 보여줄 때 셀들(각 게시글의 작성자, 작성자 이메일, 제목)*/
        height: 30px;
        line-height: 30px;

    }
    .boardImg{
        margin: 10px;
        height : 200px;
        width: 240px;
    }
    .moreService {
        background-color : #84B1ED;
        border : 1.2px solid #84B1ED;
        border-radius: 3px;
        color : white;
        height : 20px;
        width : 55px;
        margin-left: 20px;
        margin-right: 20px;
    }
    .moreService2 {
        background-color :#84B1ED;
        border : 1.2px solid #84B1ED;
        border-radius: 3px;
        color : white;
        height : 20px;
        width : 200px;
        margin:auto;
    }
    .leftButton{
        background-color : white;
        border : 1.2px solid white;
        border-radius: 7px;
    }
    .rightButton{
        background-color : white;
        border : 1.2px solid white;
        border-radius: 7px;
    }
    .btn-cover{
        margin-top: 30px;
        text-align: center;
        align-content: center;
    }

</style>
