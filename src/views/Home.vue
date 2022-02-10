<template>
  <div class="home">
    <h1 class="under-construction">This page is under construction</h1>
    <p v-show="$store.state.user">{{ $store.state.user }}</p>
  </div>
</template>

<script>
export default {
  name: "Home",
  async mounted() {
    if (this.$store.state.token.access) {
      try {
        await this.$store.dispatch(
          "getLoggedInUser",
          this.$store.state.token.access
        );
      } catch (err) {
        console.log(err);
      }
    }
  },
};
</script>

<style scoped>
.home {
  padding-top: 200px;
}
.under-construction {
  color: red;
}
</style>
