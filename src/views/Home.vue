<template>
  <div class="home">
    <h1 class="under-construction">This page is under construction</h1>
    <p v-if="$store.state.token.access">{{ $store.state.token }}</p>
  </div>
</template>

<script>
export default {
  name: "Home",
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
