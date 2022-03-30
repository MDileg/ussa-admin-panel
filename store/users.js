export const state = () => ({
  userToken: null,
  currentUser: null,
  isLoggedIn: false,

  dataToken: null
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
  },

  auto(state, dataToken) {
    state.dataToken = dataToken;
  }
};

export const actions = {
  async setLogin({ commit }) {
    try {
      const data = await this.$cookies.get("userToken");
      commit("auto", data);

      return data;
    } catch (e) {
      console.log(e, "tst eror");
    }
  },

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

    localStorage.setItem("userToken", token);
    prosess.browser = true;
    this.$cookies.set("userToken", token);

    commit("commitCurrentUser", admin);
    commit("commitUserToken", token);

    const cookieValObject = { userToken: token, userId: admin.id };
    localStorage.setItem("userToken", cookieValObject.userToken, {
      maxAge: 60 * 60 * 24 * 1
    });
    commit("commitUserToken", token);

    const data = await localStorage.getItem("userToken");
    commit("auto", data);
  },

  logOut({ commit }) {
    // this.$cookies.remove("userToken");
    localStorage.removeItem("userToken");
    commit("commitLogOut");
  },

  // ------------------------------------

  async autoLogin({ commit }, token) {
    const res = await this.$axios({
      method: "post",
      url: `http://95.85.125.197:1101/admin/auto-login`,
      data: { token }
    });

    
    let user = res.data.user;
    let newToken = res.data.token;
    commit("commitCurrentUser", user);

    const cookieValObject = { userToken: newToken, userId: user.id };
    this.$cookies.set("userToken", cookieValObject.userToken, {
      maxAge: 60 * 60 * 24 * 1
    });
    commit("commitUserToken", newToken);
  }
};

//Getter here if you send another components or place
export const getters = {
  tokenUserAuto(state) {
    return state.dataToken;
  },

  getUserToken(state) {
    return state.userToken;
    // return localStorage.getItem("userToken");
  },
  getCurrentUser(state) {
    return state.currentUser;
  }
};
