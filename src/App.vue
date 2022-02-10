<template>
  <Header />
  <router-view />
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
  beforeCreate() {
    this.$store.dispatch("checkLoginStatus");
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0px;
  height: 100vh;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
