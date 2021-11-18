import { getCategoriesReq } from "@/api/home";
import { topCategories } from "@/api/constants";
export default {
  namespaced: true,
  state() {
    return {
      // 存储分类列表
      list: topCategories.map((categoryName) => ({ name: categoryName })),
    };
  },
  mutations: {
    //  设置分类列表数据
    setCategory(state, categories) {
      state.list = categories;
    },
    open(state, id) {
      const target = state.list.find((item) => item.id === id);
      target.open = true;
    },
    close(state, id) {
      const target = state.list.find((item) => item.id === id);
      target.open = false;
    },
  },
  actions: {
    async getCategory({ commit }) {
      // 发送数据请求
      const data = await getCategoriesReq();
      // 给每个一级分类数据添加open属性
      data.result.forEach((category) => (category.open = false));
      //  将数据存储在vuex
      commit("setCategory", data.result);
    },
  },
};
