<template>
  <div class="login">
    <div class="form-group">
      <h2>RaSa Library</h2>
      <!-- Email Field -->
      <div class="form-control">
        <input
          type="email"
          v-model="v$.input.email.$model"
          name="email"
          autocomplete="chrome-off"
          class="form-control"
          placeholder="Email"
        />
        <div
          class="input-errors"
          v-for="(error, index) of v$.input.email.$errors"
          :key="index"
        >
          <span class="error">{{ error.$message }}</span>
        </div>
      </div>

      <!-- Password Field -->
      <div class="form-control">
        <input
          type="password"
          v-model="v$.input.password.$model"
          name="password"
          autocomplete="chrome-off"
          class="form-control"
          placeholder="Password"
        />
        <div
          class="input-errors"
          v-for="(error, index) of v$.input.password.$errors"
          :key="index"
        >
          <span class="error">{{ error.$message }}</span>
        </div>
      </div>
      <!-- Submit Button -->

      <input
        :disabled="v$.input.$invalid"
        class="form-submit"
        type="submit"
        value="Login"
        @click="login"
      />

      <span class="error">{{ error }}</span>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

export default {
  name: "Login",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      input: {
        email: "",
        password: "",
      },
      error: "",
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
          this.error = `${err.code}: ${err.message}`;
        } else {
          this.error = err.message;
        }
      }
    },
  },
  validations() {
    return {
      input: {
        email: { required, email },
        password: { required, min: minLength(6) },
      },
    };
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
  width: 100%;
  height: 240px;
  font-family: Montserrat;
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-items: center;
}

.form-control {
  width: 240px;
  margin-bottom: 20px;
}

.form-control input {
  width: 100%;
  height: 42px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
  font-family: Montserrat;
  padding: 0 10px 0 10px;
  outline: none;
  margin: 0;
}

.input-errors {
  overflow: auto;
}

.form-submit {
  font-size: 16px;
  font-family: Montserrat;
  margin-bottom: 12px;
}

.error {
  color: red;
  font-size: 14px;
  float: left;
  padding-left: 4px;
}

@media screen and (max-width: 300px) {
  .form-control {
    width: 200px;
    margin-bottom: 10px;
  }

  .form-control input {
    width: 200px;
    height: 30px;
    font-size: 12px;
  }

  .form-submit {
    font-size: 12px;
    margin-bottom: 6x;
  }

  .error {
    color: red;
    font-size: 10px;
    float: left;
    padding-left: 4px;
  }
}
</style>
