<template>
  <div class="login">
    <div class="form-group">
      <h2>RaSa Library</h2>
      <input
        type="email"
        v-model="input.email"
        name="email"
        autocomplete="chrome-off"
        class="form-control"
        placeholder="Email"
      />
      <input
        type="password"
        v-model="input.password"
        name="password"
        autocomplete="chrome-off"
        class="form-control"
        placeholder="Password"
      />
      <br />
      <input class="form-submit" type="submit" value="Login" @click="login" />
    </div>
    <p class="error">{{ error.login }}</p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      input: {
        email: "",
        password: "",
      },
      error: {
        email: "",
        password: "",
        login: "",
      },
    };
  },
  methods: {
    async login() {
      console.log("Logged In");
      try {
        await this.$store.dispatch("login", this.input);
        this.$router.push("/");
      } catch (err) {
        console.log(err);
        if (err.type === "server") {
          this.error.login = `${err.code}: ${err.message}`;
        } else {
          this.error.login = err.message;
        }
      }
    },
  },
};
</script>

<style scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.form-group {
  width: 240px;
  height: 240px;
  font-family: Montserrat;
}

.form-control {
  width: 100%;
  height: 42px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  font-size: 14px;
  font-family: Montserrat;
  padding: 0 10px 0 10px;
  outline: none;
}

.form-submit {
  font-size: 16px;
  font-family: Montserrat;
}

.error {
  color: red;
  font-size: 16px;
  margin: 0;
}
</style>
