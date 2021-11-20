import { createStore } from "vuex";
import user from "./user";
import cart from "./cart";
import category from "./category";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  // 配置模块
  modules: {
    user,
    cart,
    category,
  },
  plugins: [
    createPersistedState({
      key: "rabbit-client-pc",
      paths: ["user", "cart"],
    }),
  ],
});

export default store;
