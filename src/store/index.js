import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
    token: {},
  },
  mutations: {
    UPDATE_LOGIN_STATUS(state, loginStatus) {
      state.isLoggedIn = loginStatus;
    },
    UPDATE_TOKEN(state, token) {
      state.token = token;
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
        })
        .catch((err) => {
          throw err.response.data.error;
        });
    },
    logout(ctx) {
      ctx.commit("UPDATE_LOGIN_STATUS", false);
      ctx.commit("UPDATE_TOKEN", {});
    },
  },
  modules: {},
});
