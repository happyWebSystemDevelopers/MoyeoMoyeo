<template>
  <div id="app">
    <div id="menu">
      <div class="menuToggle">
       <img id="menuImg" src="./assets/menu.png">
      </div>
    </div>
    <div id="titie">
      
      <router-link to="/"> 
        <img id="logo" alt="Vue logo" src="./assets/MoyeoMoyeo.png">
      </router-link>
      <div id="user">
        <span style="color:#909090; font-size:13px; ">My page |</span>
        
         <span style="color:#909090; font-size:13px; margin-right:12px;"> Logout </span>
        <span style="color:#34314c; font-size:15px; margin-right:5px;  font-weight:bold;"> Yeong In Park </span>
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
        Free Board
        </router-link>
        <hr/>
        <router-link to="/gathering">
        Gathering Board
        </router-link>
        <hr/>
        <router-link to="/cultural">
        Cultural Events
        </router-link>
        <hr/>
        <router-link to="/search">
        Search Freind
        </router-link>
        <hr/>
        <router-link to="/intro">
        Site Introduction
        </router-link>
      </div>
      </div>
   
    </div>
    </div>
    <div id="rightView">
      
     
      <hr align="center" style="border: solid 3px #ff7473; margin-left: 40px; margin-right: 40px;">

    </div>
    </div>
    
  </div>
</template>

<script>
window.onload=function(){
  document.querySelector(".menuToggle").addEventListener("click", function(){
    document.querySelector(".sample-class").classList.toggle("menuon");
  })
  document.querySelector("#menux").addEventListener("click", function(){
    document.querySelector(".sample-class").classList.toggle("menuon");
  }
  )
  
}

export default {
  name: 'app',
 
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
  width: 30x;
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

</style>
