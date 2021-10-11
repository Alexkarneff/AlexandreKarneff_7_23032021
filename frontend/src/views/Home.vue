<template>
<body>
  <div class="home"> 
    <img class="logo" alt="Vue logo" src="../assets/icon.svg">
    <Home msg="Welcome to Groupomania"/>
    <router-link to="/login"> Me connecter </router-link> <br> <br>
    <router-link to="/signup"> M'inscrire </router-link>
  </div>
</body>
</template>

<script>
import Home from '@/components/Home.vue'

export default {
  name: 'Helloworld',
  components: {
    Home
  }
}
</script>

<style lang="scss" scoped>

.logo {
  margin-top: 4em;
  width: 40%;
}

</style>