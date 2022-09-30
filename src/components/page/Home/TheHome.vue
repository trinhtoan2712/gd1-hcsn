<template>
    <TheNavBar/>
    <TheContent/>
  </template>
  
  <script>
  import TheNavBar from '../../layout/TheNavBar.vue';
  import TheContent from '../..//layout/TheContent.vue';
  
  export default {
    name: 'App',
    components: {
      TheNavBar,
      TheContent,
  }
  }
  </script>
  
  <style scoped>
  @import url(../../../style/main.css);
  </style>
  