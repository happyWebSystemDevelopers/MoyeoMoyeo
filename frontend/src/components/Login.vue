<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="login">
     <div id="logining" v-if="!checkSignUp">
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
        <button class="loginButton" v-on:click="login" style="height: 35px; width: 200px; font-size: 20px;">Login</button>
        <br>
        <br>
            <router-link to="/signup" @click.native="signUP" class="signupButton" style="background-color : #77919d; border: 1px solid #77919d; font-size: 15px; width: 70px; height:30px;">Sign Up</router-link>
    </div>
     </div>
    <div v-if ="successLogin && !failLogin">
        <img src="../assets/welcome.png" style ="height: 80px; width: 350px">
        <br>
        <img src="../assets/MoyeoMoyeo.png" style ="height: 110px; width: 350px">
    </div>
    <div v-if = "failLogin">
        <img src="../assets/loginWait.png" style ="height: 150px; width: 350px">

    </div>
        <signup v-if="checkSignUp"></signup>
        <button v-if="checkSignUp" v-on:click="changeSignUp" id="link" style="margin-top: 20px" >Back To Log-In Page</button>
<!--        <router-link to="/" v-if="!registered" class="inputText" id="link" style="margin-top: 20px">Back To Log-In Page</router-link>-->
    </div>
</template>
<script>
import axios from 'axios';
import signup from './Signup';

export default {
        name: 'login',
        data() {
            return {
                checkSignUp:false,
                userId:'',
                password:'',
                successLogin : false,

                failLogin : false,
                waitLogin : "",
                loginCounter : 0,
                Logintimes : true,

            }
        },
        components:{
          signup
        },
    // beforeCreate:function(){
    //         this.checkSignUp =false;
    //     },
        methods : {
            changeSignUp(){
                this.checkSignUp = false;
            },
            login : function () {
                if(this.userId == "" || this.password == "")
                {
                    alert("Please enter your ID or Password!");
                }
                else{
                axios.post("/api/login",{id : this.userId, pwd: this.password}).then(res => {
                    
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
            ,signUP(){
                this.checkSignUp = true;
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
#link{
    margin-top: 15px;
    background-color: #ffc952;
    border :none;
    color:white;
    text-align: right;
    text-decoration:none;
    cursor: pointer;
    height: 30px;
    border-radius: 4px;

}
</style>
