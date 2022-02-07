<template>
  <div class="header">
    <a href="/" class="logo">RaSa Library</a>
    <div class="header-right">
      <input class="searchbar" type="text" placeholder="Search..." />
      <!-- TODO: Ganti icon search -->
      <button type="submit">Search</button>
    </div>
  </div>
  <div class="topnav">
    <router-link to="/">Home</router-link>
    <router-link to="/ezra">Ezra's Corner</router-link>
    <router-link to="/salsa">Salsa's Corner</router-link>
    <router-link to="/about">About Us</router-link>
    <router-link
      v-if="!$store.state.isLoggedIn"
      class="topnav-right"
      to="/login"
      >Login</router-link
    >
    <router-link
      v-else
      class="topnav-right"
      id="not-active"
      to="/"
      @click="logout"
      >Logout</router-link
    >
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout() {
      console.log("Logged Out");
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #f5ecdb;
  padding: 10px 10px;
}

.header .logo {
  font-size: 28px;
  font-weight: bold;
  float: left;
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  line-height: 25px;
  border-radius: 4px;
  margin: 4px;
}

.header-right {
  float: right;
}

.header .header-right .searchbar {
  padding: 6px;
  margin-top: 8px;
  margin-right: 16px;
  font-size: 17px;
  border-radius: 4px;
}

.header .header-right button {
  padding: 6px 10px;
  margin-top: 8px;
  margin-right: 16px;
  background: #ddd;
  font-size: 17px;
  border: none;
  cursor: pointer;
}

.header .header-right button:hover {
  background: #ccc;
}

.topnav {
  background-color: #333;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 12px 14px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav #not-active {
  background-color: #333;
}

.topnav a.router-link-exact-active {
  background-color: dodgerblue;
  color: white;
}

.topnav a.topnav-right {
  float: right;
}

@media screen and (max-width: 600px) {
  .header-right {
    float: none;
  }

  .searchbar,
  .header-right button {
    display: block;
    width: 100%;
    margin: 0px;
    padding-top: 10px;
    box-sizing: border-box;
  }

  .header-right button {
    text-align: center;
  }

  .topnav a,
  .topnav a.topnav-right {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
