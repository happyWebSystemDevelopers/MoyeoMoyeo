<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml"
          xmlns:v-if="http://www.w3.org/1999/xhtml">

    <div class="signUp" id="sign">
        <div id="insideSign" v-if="registered">
            <img src='../assets/signup.png' style="width: 200px;"/>
            <div class="notice">they are all have to be written in english</div>
            <br>
            <div class="title">Full name</div>
            <input type="text" v-model = "user.name" class = "inputText" style="width: 100%; height: 30px; border-radius: 4px;" required/>
            <br>
            <div class="title">ID</div>
            <input type="text" v-if="okID" id="id" v-model="user.identity"  required/>
            <input type="text" id="id2" v-if="!okID" v-model="user.identity" required/>
            <button v-if="invalidID" v-on:click="checkID" id="validID">Check availability</button>
            <img v-if="!invalidID" class = "checkIMG" src='../assets/check-mark-icon-png.jpg'>
            <br>
            <div class="title">Password</div>
            <input type="password" v-if="hidePW" v-model="user.password"
                   id="password1" style="width: 100%; height: 30px; border-radius: 4px;" required/>
            <input type="text" v-if="!hidePW"  v-model="user.password" id="password2" style="width: 100%; height: 30px; border: 2px solid red;
                 border-radius: 4px;" required/>
            <div class="notice" v-if="hidePW">must contain 8 or more characters</div>
            <div class="notice" v-if="!hidePW" id="passwordNotice">must contain 8 or more characters</div>

            <br>

            <div class="title">Check Password</div>
            <input type="password" v-model="checkPassword"
                   id="checkPassword" required/>
            <img v-if="!checkingPassword" class = "checkIMG" src='../assets/check-mark-icon-png.jpg' >
            <br>

            <div class="title" style="clear:both;">Nickname</div>
            <input type="text"  v-if="okNickname" id="nickname" v-model = "user.nickname"  required/>
            <input type="text" v-if="!okNickname" id="nickname2" v-model="user.nickname" required/>
            <button v-on:click="checkNickname" v-if="invalidNickname" id="validNickname">Check availability</button>
            <img v-if="!invalidNickname" class = "checkIMG" src='../assets/check-mark-icon-png.jpg'>

            <br>

            <div class="title">Your Country Name</div>
            <select v-model="resultCountryName" @change="onChange3($event)" style="width: 50%; height: 30px; border-radius: 4px;" >
                <option v-for="cname in countryname" :key="cname.name" v-bind:value="cname.name">{{cname.name}}</option>
            </select>
            <br>

            <div class="title">Email</div>
            <input type="text" v-if="hideEN" v-model="user.email" id="email1" style="width: 100%; height: 30px; border-radius: 4px;" required/>
            <input type="text" v-if="!hideEN"  v-model="user.email" id="email2" style="width: 100%; height: 30px; border: 2px solid red;
                 border-radius: 4px;" required/>
            <div class="notice" v-if="hideEN">email has to be ex)XXXX@XXXX.XXX </div>
            <div class="notice" v-if="!hideEN" id="emailNotice">email has to be ex)XXXX@XXXX.XXX</div>

            <div class="title">University & Campus</div>
            <select v-model="resultUniname" @change="onChange($event)" style="width: 50%; height: 30px; border-radius: 4px;" >
                <option v-for="uname in uniname" :key="uname.name" v-bind:value="uname.name">{{uname.name}}</option>

            </select>
            <select v-model="resultUniindex" @change="onChange1($event)" style="width: 50%; height: 30px; border-radius: 4px;">
                <option  v-for="uindex in uniindex" :key="uindex.nameindex" v-bind:value="uindex.nameindex" >{{uindex.nameindex}}</option>
            </select>

            <div class="title">Major</div>
            <select v-model="resultUnimajor" @change="onChange2($event)" style="width: 50%; height: 30px; border-radius: 4px;">
                <option  v-for="umajor in unimajor" :key="umajor.major" v-bind:value="umajor.major" >{{umajor.major}}</option>
            </select>

        </div>
        <div id="insideSign1" v-if="!registered">
            <img id="signupPng" src='../assets/signup_welcome.png' style="width: 100%;"/>
            <br>
<!--            <router-link to="/" v-if="!registered" class="inputText" id="link" style="margin-top: 20px">Back To Log-In Page</router-link>-->
        </div>
        <button v-if="registered" v-on:click="btnClicked" class="inputText" id="submit">Register</button>
    </div>
</template>

<script>
    import axios from 'axios';


    export default {
        name: 'signup',
        // components:{
        //   Login
        // },
        data(){
            return{
                okID:true,
                okNickname:true,
                registered:true,
                checkPassword:'',
                invalidID:true,
                invalidNickname:true,
                validationOfID : true,
                validationOfPassword:true,
                validationOfNickname:true,
                invalidCODE :true,
                hideEN:true,
                hidePW:true,
                university:[{
                    name:'',
                    nameindex:'',
                    major:''
                }],
                uniname:[{}],
                uniindex:[{}],
                unimajor:[{}],
                countryname:[{}],
                user: {
                    identity:'',
                    name:'',
                    password:'',
                    universityName:'',
                    universityIndex:'',
                    major:'',
                    email:'',
                    country:'',
                    nickname:''
                },
                resultUniname:{},
                resultUniindex:{},
                resultUnimajor:{},
                resultCountryName:{}
            }
        },
        created: function(){
            axios.get('/api/universityList/name')
                .then((response) => {
                    this.uniname = response.data;
                });
            axios.get('/api/universityList/country')
                .then((response)=>{
                    this.countryname = response.data;
                })
        },

        methods:{
            // clickToLogin(){
            //     Login.state.checkSignUp = false;
            // },
            onChange(event) {
                var UNAME= event.target.value;
                axios.get('/api/universityList/nameindex/'+UNAME)
                    .then((response)=>{
                        this.uniindex = response.data;
                        // this.uniindex = response.data;
                        this.user.universityName = event.target.value;
                        this.resultUniname = event.target.value;
                    })
            },
            onChange1(event){
                var UNAME = this.user.universityName;
                var UNAMEINDEX = event.target.value;
                axios.get('/api/universityList/major/'+UNAME+'/'+UNAMEINDEX)
                    .then((response)=>{
                        this.unimajor = response.data;
                        this.user.universityIndex = event.target.value;
                        this.resultUniindex = event.target.value;
                    })
            },
            onChange2(event){
                this.user.major= event.target.value;
            },
            onChange3(event){
                this.user.country = event.target.value;
            },
            btnClicked(){
                this.hideEN = true;
                this.hidePW = true;
                if((this.user.email.match(/@/g) || []).length !== 1) {
                    this.user.email = '';
                    this.hideEN = false;
                }
                else{
                    if(this.user.password.length<8){
                        this.user.password = '';
                        this.hidePW = false;
                    }
                    else{
                        axios.post('/api/universityList/users', {
                                identity:this.user.identity,
                                name:this.user.name,
                                password:this.user.password,
                                universityName:this.user.universityName,
                                universityIndex:this.user.universityIndex,
                                major:this.user.major,
                                email:this.user.email,
                                country:this.user.country,
                                nickname:this.user.nickname
                            }
                        );
                    }
                    this.user.identity = '';
                    this.user.name = '';
                    this.user.password = '';
                    this.user.universityName = '';
                    this.user.universityIndex = '';
                    this.user.major = '';
                    this.user.email = '';
                    this.user.country = '';
                    this.user.nickname = '';
                    this.registered = false;
                }
            },
            checkID(){
                this.okID = true;
                var ID = this.user.identity;
                var checkIDIndex = '';
                axios.get('/api/universityList/checkID/'+ID)
                    .then((response)=>{
                        checkIDIndex = response.data;
                    });
                if(checkIDIndex.length == 0) {
                    this.invalidID = false;
                }
                else{
                    this.okID = false;
                }
            },
            checkNickname(){
                this.okNickname = true;
                var NICKNAME = this.user.nickname;
                var checkNickIndex = '';
                axios.get('/api/universityList/checkNICK/' + NICKNAME)
                    .then((response)=>{
                        checkNickIndex = response.data;
                    });
                if(checkNickIndex.length == 0){
                    this.invalidNickname = false;
                }
                else{
                    this.okNickname = false;
                }
            },

        },
        computed:{
            checkingPassword(){
                if (this.user.password.length!==0 && this.checkPassword == this.user.password) {
                    return !this.validationOfPassword;
                }

                return this.validationOfPassword;
            }
        }
    }
</script>
<style scoped>
    .notice{
        margin-top:10px;
        text-decoration-color: darkred;
        margin-bottom:20px;
    }
    #id{
        clear:both;
        margin-bottom:10px;
    }
    #validID{
        clear:left;
        margin-left:10px;
        background-color: #ffc952;
        border :none;
        color:white;
        text-decoration:none;
        cursor: pointer;
        height: 30px;
        border-radius: 4px;
    }
    #validNickname{
        clear:left;
        margin-left:10px;
        background-color: #ffc952;
        border :none;
        color:white;
        text-decoration:none;
        cursor: pointer;
        height: 30px;
        border-radius: 4px;
    }
    .inputText{
        margin-bottom: 20px;
        height: 30px;
        border-radius: 4px;
    }
    #sign{
        border:3px solid #ffc952;
        height: auto;
        width:500px;
        align-content: start;
        margin: auto;
    }
    #insideSign{
        text-align: left;
        padding: 10px;
    }
    #insideSign1{
        text-align: center;
    }
    #password{

    }
    #submit{
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
    #emailNotice{
        color: red;
    }
    #passwordNotice{
        color: red;
    }
    #checkPassword{
        float: left;
        width: 70%;
        height: 30px;
        border-radius: 4px;
    }
    #id{
        float: left;
        width: 70%;
        height: 30px;
        border-radius: 4px;
    }
    #id2{
        float: left;
        width: 70%;
        height: 30px;
        border-radius: 4px;
        border: 2px solid red;
    }
    #nickname{
        float: left;
        width: 70%;
        height: 30px;
        border-radius: 4px;
    }
    #nickname2{
        float: left;
        width: 70%;
        height: 30px;
        border-radius: 4px;
    }
    .checkIMG{
        clear: left;
        margin-left:10px;
        margin-top:5px;
        height: 30px;
        width: 30px;
    }
    .title{
        margin-top:10px;
        clear:both;
    }
</style>
