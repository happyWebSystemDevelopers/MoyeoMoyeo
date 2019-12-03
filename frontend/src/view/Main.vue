
<template>
    <section id="mainboard">
        <ul id="boardsInfo">
            <div class="boards">
                <div class="boardContents">
                    <header style="width: 110px">Free Board</header>
                    <div v-for="(freeBoardContent, index) in freeBoardContents" :key="freeBoardContent.id" >
                        <router-link :to="{ name: 'freeBoard', params: { id: freeBoardContent.id }}" class="contents">{{ freeBoardContent.title }}></router-link>
                        <hr v-if="index != freeBoardContents.length">
                    </div>

                </div>
                <div class="boardContents">
                    <header  style="width: 160px">Gathering Board</header>
                    <div v-for="gatheringBoardContent in gatheringBoardContents" :key="gatheringBoardContent.id">
                        <router-link :to="{ name: 'freeBoard', params: { id: gatheringBoardContent.id }}" class="contents">{{ gatheringBoardContent.title }}></router-link>
                        <hr v-if="index != freeBoardContents.length">
                    </div>
                </div>
                <div class="boardContents">
                    <header  style="width: 140px">Cultural Event</header>
                    <div v-for="culturalEventsContent in culturalEventsContents" :key="culturalEventsContent.id" >
                        <router-link :to="{ name: 'culturalEventsContent', params: { id: culturalEventsContent.id }}" class="contents">{{ culturalEventsContent.title }}></router-link>
                        <hr v-if="index != freeBoardContents.length">
                    </div>
                </div>
            </div>
        </ul>

        <ul id="ondDaySentence">
            <div>
                <header>1il hwayhwa</header>
                <hr>
            </div>
        </ul>

    </section>
</template>
<script>
    export default {
        data () {
            return{
                freeBoardContents : [],
                gatheringBoardContents : [],
                culturalEventsContents : []
            }
        }
    }
</script>

<style>
    #mainboard{
        margin-left: 160px;
        margin-right: 160px;
    }
    header{
        margin-left: 5px;
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 10px;
        height: 30px;
        line-height: 30px;
        border-bottom: 2px solid;
        border-bottom-color: #ff7473;
    }
    #boardsInfo{
        float: left;
        width: 700px;
        padding: 0px;
    }
    .boardContents{
        margin-bottom: 50px;
        padding: 10px;
        border-top: 2px solid;
        border-top-color: #f0e5de;
        border-bottom: 2px solid;
        border-bottom-color: #f0e5de;
    }
    hr{
        border-bottom: 1px dotted;
        border-bottom-color: lightgray;
        padding: 0px;
    }
    .contents{
        padding: 0px;
        line-height: 30px;
        margin-top: 5px;
        margin-left: 10px;
    }
    #ondDaySentence{
        float: right;
        width: 400px;
    }
    .boards{
    }

</style>

