<template>
    <div class="login">
    <div v-if = "!successLogin">
        <span style="font-size: 50px">Login</span>
        <br>
        <br>
        <input v-model="userId" placeholder ="ID">
        <br>
        <input type="password" v-model="password" placeholder = "Password">
        <br>
        <button v-on:click="login">Login</button>
    </div>
    <div v-if = "successLogin">
        <span style="font-size: 50px">Login Success</span>
        <br>
        <span style="font-size: 50px">Go home!</span>
    </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
        name: 'login',
        data() {
            return {
                userId:'',
                password:'',
                successLogin : false,
            }
        },
        methods : {
            login : function () {
                axios.post("/login",{id : this.userId, pwd: this.password}).then(res => {
                    this.successLogin = res.data.logined;
                })
                this.userId = "";
                this.password = "";
            }
        },
}
</script>