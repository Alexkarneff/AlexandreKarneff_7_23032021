<template>
  <div class="home">
    <img class="logo" alt="Vue logo" src="../assets/icon.svg">
    <Home msg="Welcome to Groupomania"/>
  </div>
</template>

<script>
// @ is an alias to /src
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
  width: 40%;
}

</style>