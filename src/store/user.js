const user = {
  namespaced: true,
  // 用户模块状态
  // 创建具有命名空间的vuex模块
  // 返回该模块存储的应用状态
  state() {
    return {
      // 用户信息
      profile: {
        // 用户id
        id: "",
        // 用户头像
        avatar: "",
        // 用户昵称
        nickname: "",
        // 用户账号
        account: "",
        // 用户手机号
        mobile: "",
        // 用户登录凭证
        token: "",
      },
    };
  },

  mutations: {
    setUser(state, user) {
      if (Object.keys(user).length > 0) {
        state.profile = { ...state.profile, ...user };
      } else {
        state.profile = {};
      }
    },
  },
};

export default user;
