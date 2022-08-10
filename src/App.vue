<template>
  <TheNavBar/>
  <TheContent/>
</template>

<script>
import TheNavBar from './components/layout/TheNavBar.vue';
import TheContent from './components/layout/TheContent.vue';

export default {
  name: 'App',
  components: {
    TheNavBar, TheContent
  }
}
</script>

<style>
@import url(../src/style/main.css);
</style>
