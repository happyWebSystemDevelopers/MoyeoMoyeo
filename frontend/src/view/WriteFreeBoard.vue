<template>
    <div class="write">
    <img id="freeboardImg" src="../assets/writeFreeboard.png" style ="height: 42px; width:250px; margin-left: 150px;">
    <hr align="left" style ="color : #dddfe6; border: 1px solid; margin-left: 120px; margin-right: 120px; border-style: dashed;"/>
    <br>
    <div class ="writeboard">
    <span style="font-size: 30px;" >Title</span>
    <br>
    <br>
    <input type="text" v-model="title" style="height:25px; width: 1100px; border-left: none; border-right: none; border-top:none;" placeholder ="Title" required>
    <br>
    <br>
    <span style="font-size: 30px;">Image</span>
    <br>
    <br>
    <input type="text" v-model="imageURL" style="height:25px; width: 1100px; border-left: none; border-right: none; border-top:none;" placeholder ="Image URL(optional)">
    <br>
    <br>
    <span style="font-size: 30px;" >Content</span>
    <br>
    <br>
    <input type="textarea" v-model="content" style="width: 1100px; height: 400px" placeholder = "Content" required>
    <br>
    <br>
    <button id="writeButton" v-on:click="postContent" style ="margin-left: 500px; width:100px; height: 40px; font-size: 20px;">Create</button>
    </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'writefreeboard',
    data() {
        return {
            title : '',
            imageURL: '',
            content: '',
        }
    },
    methods: {
        postContent: function() {
            axios.post("/writefreeboard",{title: this.title, url :this.imageURL, content : this.content});
            this.$router.push({
                name: 'free'
            });
        }
    }

}
</script>
<style>
.writeboard {
    margin-left: 170px;
    display: inline-block;
    border : 1.5px solid #9DC3C1;
    padding : 20px;
}
#writeButton {
    background-color : #9DC3C1;
    border : 1.5px solid #9DC3C1;
}
#writeButton:hover{
    background-color : white;
    border : 1.5px solid #9DC3C1;
}


</style>