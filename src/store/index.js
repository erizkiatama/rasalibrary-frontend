import axios from "axios";
import { createStore } from "vuex";

const resetAuth = (ctx) => {
  ctx.commit("UPDATE_LOGIN_STATUS", false);
  ctx.commit("UPDATE_TOKEN", {});
  ctx.commit("UPDATE_LOGGED_IN_USER", {});
  localStorage.removeItem("token");
  localStorage.removeItem("timeout");
  localStorage.removeItem("user");
};

export default createStore({
  state: {
    isLoggedIn: false,
    token: {},
    user: {},
  },
  mutations: {
    UPDATE_LOGIN_STATUS(state, loginStatus) {
      state.isLoggedIn = loginStatus;
    },
    UPDATE_TOKEN(state, token) {
      state.token = token;
    },
    UPDATE_LOGGED_IN_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    async login(ctx, request) {
      await axios
        .post(
          "http://localhost:8080/api/v1/auth/login",
          JSON.stringify(request)
        )
        .then((response) => {
          ctx.commit("UPDATE_LOGIN_STATUS", true);
          ctx.commit("UPDATE_TOKEN", response.data.result);
          localStorage.setItem("token", JSON.stringify(response.data.result));
          localStorage.setItem("timeout", +new Date() + 60 * 60 * 24 * 1000);
        })
        .catch((err) => {
          throw err.response.data.error;
        });
    },
    logout(ctx) {
      resetAuth(ctx);
    },
    checkLoginStatus(ctx) {
      const tokenString = localStorage.getItem("token");
      const timeout = localStorage.getItem("timeout");
      if (tokenString) {
        if (+new Date() > timeout) {
          resetAuth(ctx);
          return;
        }
        ctx.commit("UPDATE_LOGIN_STATUS", true);
        ctx.commit("UPDATE_TOKEN", JSON.parse(tokenString));
      }
    },
    async getLoggedInUser(ctx, token) {
      const userString = localStorage.getItem("user");
      if (userString) {
        ctx.commit("UPDATE_LOGGED_IN_USER", JSON.parse(userString));
        return;
      }
      console.log("Get Logged In User");
      const headers = { Authorization: "Bearer " + token };
      await axios
        .get("http://localhost:8080/api/v1/user/me", { headers })
        .then((response) => {
          ctx.commit("UPDATE_LOGGED_IN_USER", response.data.result);
          localStorage.setItem("user", JSON.stringify(response.data.result));
        })
        .catch((err) => {
          throw err.response.data.error;
        });
    },
  },
  modules: {},
});
