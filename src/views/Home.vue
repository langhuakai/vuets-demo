<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <QueryPage/>
  </div>
</template>

<script>
// @ is an alias to /src
import QueryPage from '@/views/QueryPage.vue';

export default {
  name: 'Home',
  components: {
    QueryPage,
  },
};
</script>
