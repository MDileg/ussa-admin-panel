export const actions = {
  async nuxtServerInit({ dispatch }) {
    const token = this.$cookies.get("userTokenCookies");
    if (token) {
        await dispatch("user/autoLogin", token);
    } 
    
  }
};
