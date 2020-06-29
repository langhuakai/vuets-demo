<template> 
  <router-view></router-view> 
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import QueryPage from './views/QueryPage.vue'
import TestTable from './components/TestTable.vue'
import UpdateDialog from './components/UpdateDialog.vue'
import Element from 'element-ui'

export default {
  name: 'app',
  components: {
    'QueryPage':QueryPage,
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
