<template>
    <div class="login">

        <img v-if ="!successLogin" id ="loginLogo" src = "../assets/Login.png" style="height: 40px; width:100px;"/>
        <br>
        <span v-if="!Logintimes && !successLogin" style="color : #df405a;">Login failure {{loginCounter}} times!</span>
        <br>
        <span v-if="failLogin && !Logintimes" style="color : #df405a;">You can Login after 30 seconds!</span>
        <br>
        <br>
        <div v-if ="!successLogin && !failLogin">
        <span class="logintext">ID</span>
        <br>
        <input type="text" @keyup.enter="login" v-model ="userId" style="border-right:0px; border-top:0px; boder-left:0px; boder-bottom:1px;" required>
        <br>
        <br>
        <span class ="logintext">Password</span>
        <br>
        <input type="password" @keyup.enter="login" v-model="password" style="border-right:0px; border-top:0px; boder-left:0px; boder-bottom:1px;" required>
        <br>
        <br>
        <button class="loginButton" v-on:click="login" style="height: 35px; width: 200px;">Login</button>
        <br>
        <br>
        <button class="signupButton" style="background-color : #77919d; border: 1px solid #77919d;">Sign Up</button>
    </div>
    <div v-if ="successLogin && !failLogin">
        <img src="../assets/welcome.png" style ="height: 80px; width: 350px">
        <br>
        <img src="../assets/MoyeoMoyeo.png" style ="height: 110px; width: 350px">
    </div>
    <div v-if = "failLogin">
        <img src="../assets/loginWait.png" style ="height: 150px; width: 350px">

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

                failLogin : false,
                waitLogin : "",
                loginCounter : 0,
                Logintimes : true,

            }
        },
        methods : {
            login : function () {

                if(this.userId == "" || this.password == "")
                {
                    alert("Please enter your ID or Password!");
                }
                else{
                axios.post("/login",{id : this.userId, pwd: this.password}).then(res => {
                    
                    if(res.data.logined == false)
                    {
                        this.successLogin = res.data.logined;
                        this.loginCounter++;
                        this.Logintimes = false;
                        //alert("Login "+loginCounter+" times Failure!");
                        if(this.loginCounter >= 5) {
                            this.failLogin = true;
                            setTimeout(()=>{
                                this.failLogin = false;
                                this.loginCounter = 0;
                                this.Logintimes = true;
                                alert("You can Login!");
                            },30000);
                            } 
                    }
                    else {
                        this.successLogin = res.data.logined;
                        setTimeout(()=> {
                            location.reload();
                           //alert("hello");
                        },2000);    
                    }
                        
                });
                this.userId = "";
                this.password = "";
            }
            }
        },
}
</script>
<style>
.loginButton {
    background-color: #47b8e0;
    border: 1px solid #47b8e0;
    margin-right : 3px;
}
button:hover{
    background-color: white;
}
</style>
