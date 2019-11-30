<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Login v-if="!sessionCheck"/>
    <span> {{ sessionCheck }}</span>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Login from './components/Login.vue'
import axios from 'axios';

export default {
  name: 'app',
  components: {
    HelloWorld,
    Login,
  },
  data() {
    return {
      sessionCheck : false ,
    }
  },
  async beforeCreate () {
      const result = await axios.get("/login");
      this.sessionCheck = result.data.logined;
  }, 
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
