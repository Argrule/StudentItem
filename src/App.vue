<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style scoped>
#app {
  background-image: url('./assets/background.jpg');
  background-size: cover;
}
div {
  text-align: center;
}
</style>
