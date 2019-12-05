<template>
  <div id="app">
    <SignUp msg = ""/>
  </div>
</template>

<script>
import SignUp from './components/Signup'

export default {
  name: 'app',
  components: {
    SignUp
  }
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
