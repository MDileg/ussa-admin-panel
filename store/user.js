export const state = () => ({
  userToken: null,
  currentUser: null,
  isLoggedIn: false
});

export const mutations = {
  commitUserToken(state, payload) {
    state.userToken = payload;
  },
  commitCurrentUser(state, payload) {
    state.currentUser = payload;
  },
  commitLogOut(state) {
    state.currentUser = null;
    state.userToken = null;
  }
};

export const actions = {
  setUser({ commit }, payload) {
    commit("commitUser", payload);
  },

  async login({ commit }, payload) {
    const {
      token,
      data: { admin }
    } = await this.$axios.$post(`http://95.85.125.197:1101/admin/login`, {
      username: payload.username,
      password: payload.password
    });

    this.$axios.setToken(token, "Barear");

    // localStorage.setItem("userToken", token);
    this.$cookies.set("userTokenCookies", token);
    commit("commitCurrentUser", admin);
    commit("commitUserToken", token);

    // console.log("adminL ", admin);
    const cookieValObject = { userToken: token, userId: admin.id };
    localStorage.setItem("userToken", cookieValObject.userToken, {
      maxAge: 60 * 60 * 24 * 1
    });
    commit("commitUserToken", token);
  },

  logOut({ commit }) {
    commit("commitLogOut");
    this.$cookies.remove("userTokenCookies");
    this.$cookies.remove("userToken");
  },

  // ------------------------------------

  async autoLogin({ commit }, token) {
    const res = await this.$axios({
      method: "post",
      url: `http://95.85.125.197:1101/admin/auto-login`,
      data: { token }
    });
    let user = res.data;
    let newToken = res.data.token;
    commit("commitCurrentUser", user);

    const cookieValObject = { userToken: newToken };
    this.$cookies.set("userToken", cookieValObject.userToken, {
      maxAge: 60 * 60 * 24 * 1
    });
    commit("commitUserToken", newToken);
  }
};

//Getter here if you send another components or place
export const getters = {
  getUserToken(state) {
    return state.userToken;
  },
  getCurrentUser(state) {
    return state.currentUser;
  }
};
