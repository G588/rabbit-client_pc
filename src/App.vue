<template>
  <router-view />
</template>

<script>
import { useStore } from "vuex";
import { requestWithoutToken } from "./utils/request";

export default {
  name: "App",
  setup() {
    // 获取store对象
    const store = useStore();
    const user = store.state.user;
    const onClickHear = () => {
      requestWithoutToken("/home/banner", "get", { distributionSite: 1 }).then(
        (data) => {
          console.log(data);
        }
      );
    };
    return {
      user,
      onClickHear,
    };
  },
};
</script>

<style lang="less"></style>
