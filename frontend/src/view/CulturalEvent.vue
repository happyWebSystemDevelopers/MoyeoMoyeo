<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class ="caltural">
   
    <img id="culturalboardImg" src="../assets/culturalboard.png" style ="height : 60px; width:220px; margin-left: 42%;">
    
    <button v-if="viewMethod=='grid'" v-on:click="toLined" class="cviewChange"><img class="cbtnImg" src="../assets/lined.png"></button> <!--그리드/라인 보기 방식 변경하는 버튼-->
    <button v-if="viewMethod=='lined'" v-on:click="toGrid" class="cviewChange"><img class="cbtnImg" src="../assets/grided.png"></button>
    <hr align="left" style ="color : #dddfe6; border: 2px solid; margin-left: 120px; margin-right: 120px;"/>
    <!--<div v-for = "board in freeBoards">-->
    <!-- 여기에다가 그 router-view를 두고 이미지에 흠...-->
        <div v-if="viewMethod=='grid'" id="cgridBoard">
            <div id ="cboard" v-for ="(board, index) in culturalEvents" :key ="board.name">
                <router-link :to ="{name : 'culturalEventDetail', params: {idx : index}}"><img class="cboardImg" v-if="board.imgurl" v-bind:src="checkUrl(board.imgurl)" >
                    <img class="cboardImg" v-else src ="images/poster_4.jpg" ></router-link>
                <hr style ="boder-style : dotted; color : #E0E3DA; border : 1.2px solid;"/>
                <span style ="color : #566270;">{{ board.type }}</span>
                <hr align="left" style ="color : #dddfe6; border: 1px solid; margin-left: 7%; margin-right:7%; border-style: dashed;"/>
                <span style ="color : #566270;">{{ board.addr }}</span>
                <hr style ="boder-style : dotted; color: #E0E3DA; border : 1.2px solid;"/>
                <span style ="color : #566270;">{{ checkBoardTitle(board.name) }}</span>
            </div>
        </div>

        <div v-if="viewMethod=='lined'" id="linedBoard">
            <table style="width: 1230px; margin-left: 140px;">
                <th>Type</th>
                <th style="border-left: solid; border-left-color: #dddfe6; border-right: solid; border-right-color: #dddfe6;">Address</th>
                <th>Fac Name</th>
                <br>
                <tr id ="clinedBoard" v-for ="(board, index) in culturalEvents" :key ="board.name">
                    <td align="center" style ="color : #566270;">{{ board.type }}</td>
                    <td align="center" style ="color : #566270;">{{ board.addr }}</td>
                    <router-link :to ="{name : 'culturalEventDetail', params: {idx : index}}"><td align="left" style ="color : #566270; left: 640px; font-weight:bold;">{{ board.name }}</td></router-link>
                    <!--<hr style ="color : #E0E3DA; border : 1.2px dotted;"/>-->
                </tr>
            </table>
        </div>
    </div>
</template>
<script>

import axios from 'axios';



export default {
    name: 'cultural',
    data() {
        return {
            culturalPlaces : [],
            culturalEvents : [],
            viewMethod : 'grid',
        }
    },
    methods: {
        toLined : function(){ // 그리드 보기 방식일 때 누르면 라인 보기로 바뀜
            this.viewMethod = 'lined';
        },
        toGrid : function(){ // 라인 보기 방식일 때 누르면 그리드 보기로 바뀜
            this.viewMethod = 'grid';
        },
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
         checkBoardTitle(title) {
                if (title.length > 25) return title.substring(0, 32) + "...";
                else return title;
            },
       

    },
    async beforeCreate() { //백엔드에서 freeboard 글 가져오는 rest.
             const result = await axios.get("/api/cultural");
            this.culturalEvents = result.data;
           
           // alert(this.culturalEvents[0])

    }
}
</script>
<style>
#ccreateButton{
    background-color : white;
    border : 1.2px solid #4f953b;
    border-radius: 7px;
    color : #4f953b;
    height : 20px;
    width : 100px;
}
#cboard{
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
    word-break: break-all;
     /* 이거 글 너무 달라붙어서 좀 띄운 역할*/
}
#cboard:hover{
    border: 2px solid #47b8e0;
    border-radius : 5px;

}
.cviewChange{
    padding-top: 2px;
    margin-left: 420px;
    background-color : white;
    border : 1.2px solid #4f953b;
    border-radius: 7px;
    color : #4f953b;
    height : 30px;
    width : 30px;
}
.cbtnImg{
    width: 15px;
    height: 20px;
}
#clinedBoard{
   
    margin-left: 140px;
    width : 1230px;
    line-height: 12px;
    font-size: 14px;
}
td{ /*lined 형식으로 게시판 보여줄 때 셀들(각 게시글의 작성자, 작성자 이메일, 제목)*/
        height: 30px;
        line-height: 30px;
}
.cboardImg{
    margin: 10px;
    height : 200px; 
    width: 240px;
}

    
</style>