<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id="app">
    <div id="menu">
      <div class="menuToggle">
       <img id="menuImg" v-if="sessionCheck" src="./assets/menu.png">
      </div>
    </div>
    <div id="titie">
      
      <router-link to="/"> 
        <img id="logo" alt="Vue logo" src="./assets/MoyeoMoyeo.png">
      </router-link>
      <div v-if = "sessionCheck" id="user">
        <span style="color:#909090; font-size:13px; ">My page |</span>
        
        <button style="color:#909090; font-size:13px; margin-right:12px; background-color : white; border : 1px solid white;" v-on:click="logout"> Logout </button>
        <span id="logoutClick" style="color:#34314c; font-size:15px; margin-right:5px;  font-weight:bold;"> Yeong In Park </span>
      <img id="userImg" src="./assets/userImage.png">
      </div>
    </div>
    <div>
    <div class="sample-area sample-class">
    <div id="sideBar">
     
      <div class="hide">
      <div class="menuToggle">
      <img id="menux" src="./assets/menux.png">
      </div>
      <p id="sideTitle">
      Menu
      <br/>
      --------------
      </p>
     
        <div id="sideText">
        <router-link to="/freeboard">
        <span>Free Board</span>
        </router-link>
        <hr/>
        <div id="dropdown">
        <router-link to="/gathering">
        <span id="dropbtn">Gathering Board</span>
        </router-link>
        <div id="dropdown-content">
          <router-link to="/gathering">- major</router-link>
          <br/>
          <router-link to="/gathering">- hihi</router-link>
          <br/>
          <router-link to="/gathering">- hello</router-link>
        </div>
        </div>
        <hr/>
        <router-link to="/cultural">
        <span>Cultural Events</span>
        </router-link>
        <hr/>
        <router-link to="/search">
        <span>Search Friend</span>
        </router-link>
        <hr/>
        <router-link to="/intro">
        <span>Site Introduction</span>
        </router-link>
      </div>
      </div>
   
    </div>
    </div>
    <div id="rightView">
      
      <hr align="center" style="border: solid 3px #ff7473; margin-left: 40px; margin-right: 40px;">

    </div>
    <br>
    <br>
    <div style= "text-align : center;">
    <img src ="./assets/logoutSuccess.png" v-if="logoutCheck" style = "heigth: 100px; width: 300px;">
    </div>
    <Login id = "login" v-if="!sessionCheck"/>
    
    <router-view v-if ="sessionCheck && !logoutCheck"></router-view>
    </div>
    
  </div>
</template>

<script>
import Login from './components/Login.vue'
import axios from 'axios'

window.onload=function(){
  document.querySelector(".menuToggle").addEventListener("click", function(){
    document.querySelector(".sample-class").classList.toggle("menuon");
  })
  document.querySelector("#menux").addEventListener("click", function(){
    document.querySelector(".sample-class").classList.toggle("menuon");
  }
  )
  document.querySelector("#sideText").addEventListener("click", function(){
    document.querySelector(".sample-class").classList.toggle("menuon");
  })

  
}
export default {
  name: 'app',
  components : {
    Login,
   
  },
  data() {
    return {
      sessionCheck : false,
      logoutCheck : false,
    }
  },
  async beforeCreate() {
    const result = await axios.get("/api/login");
    this.sessionCheck = result.data.logined;
  }, 
  methods : {
    logout : function() {
      axios.delete("/api/logout");
      this.logoutCheck = true;
      alert("Logout Success!");
      setTimeout(()=> {
        location.replace('/'); //로그아웃하면 메인으로 가게 수정. (기존엔 free board 등에서 로그아웃하면 404 떴음)
       // location.reload();//freeboard 로그아웃 freeboard link 남음. 덮어씌워서 따라서 이걸 없앰
      },3000);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#menu {
  float: left;
  margin-left: 125px;
  margin-top: 20px;
}
#logo{
  margin-left: 28%;
  height: 120px;
  width: 360px;
  margin-top: 25px;
  margin-bottom: -15px;


}
#user{
  float: right;
}
#userImg{
  height: 35px;
  width: 35px;
  margin-top: 10px;
  margin-right: 120px;

}
#title{
  width: 300px;
 
}

#sideBar{
  float: left;
  
 
  margin-top: 0px;
  padding-top: 15px;
  margin-left: 10px;
 
}
#sideText{
  margin-left: 15px;
  margin-right: 15px;
  font-size: 14px;
  line-height: 40px;
  font-weight:bold;
  color: #706f72;
  

}
a:link {
   color: #706f72;
   white-space: nowrap;
   text-decoration: none;
}
a:visited {
     text-decoration: none;
     color: #706f72;
}
a:hover {
     text-decoration: none;
     background-repeat: repeat-x;
     background-position: 100% 100%;
     padding-bottom: 3px;
     color:#ff7473;
     transition: color 0.5s;
  }

#sideTitle{
  text-align: center;
  font-weight:bold;
  color: #34314c;
  font-size: 20px;
  margin-top: 60px;

}
#rightView{
 margin-left: 80px;
 margin-right: 80px;

 
}
.menuToggle{
  width: 30px;
  height: 30px;
  float: right;
  
}

.sample-class .hide{ 
  position: absolute;
  top: 0; 
  width:280px; 
  left:-280px; 
  height: 100%; 
  background-color: rgb(248, 246, 247) ;
   
  transform:translate(0,0); 
  transition:transform 300ms cubic-bezier(0.4, 0, 0.2, 1); 
  } 
  .sample-class.menuon .hide{
     transform:translate(280px,0);
      box-shadow: 1px 1px 10px 0 rgba(0,0,0,0.3); 
  }
  #menux{
    width: 25px;
    height: 25px;
    margin: 20px;
  }
  #menuImg{
    width: 25px;
    height: 25px;
  }
  #login{
    text-align : center;
  }
  #dropdown-content {
  display: none;
  font-size: 13px;
  line-height: 40px;
  font-weight:bold;
  height: 0%;
  min-width: 160px;
 
  z-index: 1;
  margin-left: 10px;
  
  transition:display 2s;
}
  #dropdown:hover #dropdown-content {
  display: block;
 
}
#dropdown:hover #dropbtn {
 color:#ff7473;
 transition: color 0.5s;
}

#dropdown:hover #dropdown-content a:hover {
color: #aaa9ac;
transition: color 0.5s;
}

</style>

