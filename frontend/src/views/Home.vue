<template>
<body>
  <Navbar/>
  <div class="home"> 
    <img class="logo" alt="Vue logo" src="../assets/icon.svg">
    <Home msg="Welcome to Groupomania"/>
  </div>
</body>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Home from '@/components/Home.vue'

export default {
  name: 'Helloworld',
  components: {
    Home,
    Navbar

  }
}
</script>

<style lang="scss" scoped>

.logo {
  margin-top: 4em;
  width: 40%;
}

</style>