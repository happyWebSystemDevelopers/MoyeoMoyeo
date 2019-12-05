
<template>
    <section id="mainboard">
        <ul id="boardsInfo"> <!--게시판 전체 정보 담는 박스-->
            <div class="boards"> <!--boards Info랑 역할 같음. 혹시 몰라서 추가해둠. 당장 하는 역할 X.-->
                <div class="boardContents"> <!--free board에서 최신글 5개 보여줌-->
                    <header style="width: 110px"><router-link id="freepageTitle" to="/freeboard">Free Board</router-link></header>
                    <div v-for="(freeBoardContent, index) in freeBoardContents" :key="freeBoardContent.index" > <!--free board contents : free board에서 게시글 제목/id 5개 가져온 배열-->
                        <router-link :to="{ name: 'freeBoardDetail', params: {idx: freeBoardContent.index }}" class="contents">{{ freeBoardContent.title }}</router-link>
                        <span class="date">{{ subDate(freeBoardContent.date) }}</span>
                        <hr v-if="index != freeBoardContents.length"> <!--5번째 게시글은 아래쪽 점선없게-->
                    </div>
                </div>
                <div class="boardContents"> <!--gathering board 최신글 5개 보여줌-->
                    <header  style="width: 160px"><router-link id="gatheringpageTitle" to="/gathering">Gathering Board</router-link></header>
                    <div v-for="gatheringBoardContent in gatheringBoardContents" :key="gatheringBoardContent.index">
                        <router-link :to="{ name: 'gatheringBoardDetail', params: {idx: gatheringBoardContent.index }}" class="contents">{{ gatheringBoardContent.title }}></router-link>
                        <hr v-if="index != freeBoardContents.length">
                    </div>
                </div>
                <div class="boardContents"> <!--cultural events 최신글 5개 보여줌-->
                    <header  style="width: 140px"><router-link id="culturalpageTitle" to="/cultural">Cultural Event</router-link></header>
                    <div v-for="culturalEventsContent in culturalEventsContents" :key="culturalEventsContent.index" >
                        <router-link :to="{ name: 'culturalEventsContent', params: { idx: culturalEventsContent.index }}" class="contents">{{ culturalEventsContent.title }}></router-link>
                        <hr v-if="index != freeBoardContents.length">
                    </div>
                </div>
            </div>
        </ul>

        <ul id="ondDaySentence">
            <div>
                <header>1il hwayhwa</header> <!--한국어 회화/사전 등 외부 api 연동할 곳. 배포 후에 추가하기-->
                <hr>
            </div>
        </ul>

    </section>
</template>
<script>
import axios from 'axios';
    export default {
        data () {
            return{
                freeBoardContents : [], //free board 에서 최신글 5개 제목/id 가져온 배열
                gatheringBoardContents : [],
                culturalEventsContents : [],
                sessionCheck : false,
            }
        },
        methods : {
            subDate(date){
                return date.substring(0,10);
            },
        },
        async beforeCreate() {
        const result = await axios.get("/api/login");
        this.sessionCheck = result.data.logined;
       const freeResult = await axios.get("/api/main/free");
        this.freeBoardContents = freeResult.data;
      /*  const gatheringResult = await axios.get("/api/main/gathering");
        this.gatheringBoardContents = gatheringResult.data;
        const culturalResult = await axios.get("/api/main/cultural");
        this.culturalEventsContents = culturalResult.data;*/
        }, 
    }
</script>

<style>
    #mainboard{ /*게시판들이랑 일일 한국어 포함하는 wrapper. 1개*/
        margin-left: 160px;
        margin-right: 160px;
    }
    header{ /*Free Board, Gathering Board 등등 제목. 4개*/
        margin-left: 5px;
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 10px;
        height: 30px;
        line-height: 30px;
        border-bottom: 2px solid;
        border-bottom-color: #ff7473;
    }
    #boardsInfo{ /*게시판들 포함하는 wrapper. 1개*/
        float: left;
        width: 700px;
        padding: 0px;
    }
    .boardContents{ /*각 게시판 하나하나 포함하는 wrapper. 3개*/
        margin-bottom: 50px;
        padding: 10px;
        border-top: 2px solid;
        border-top-color: #f0e5de;
        border-bottom: 2px solid;
        border-bottom-color: #f0e5de;
    }
    hr{ /*최근 게시글 5개 밑에 깔리는 점선. 4 * 3 = 12개*/
        border: 1px dotted;
        border-color: rgb(209, 203, 203);
        padding: 0px;
       
    }
    .contents{ /*각각의 최신 게시글 하나하나. 5 * 3 = 15개*/
        padding: 0px;
        font-size: 13px;
        line-height: 30px;
        margin-top: 7px;
        margin-left: 13px;
    }
    #ondDaySentence{ /*일일 회화 포괄하는 wrapper. 1개*/
        float: right;
        width: 400px;
        color: rgb(114, 113, 113);
    }
    #freepageTitle{
        color: rgb(114, 113, 113);   
    }
    #gatheringpageTitle{
        color: rgb(114, 113, 113);   
    }
    #culturalpageTitle{
        color: rgb(114, 113, 113);   
    }
    .date{ 
        margin-right: 20px;
        color: rgb(158, 157, 157);
        font-size: 11px;
        float: right;
        line-height: 35px;
    }

</style>


