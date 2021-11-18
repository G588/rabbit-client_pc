<template>
  <AppTopNav />
  <AppHeader />
  <AppHeaderSticky />
  <slot />
  <AppFooter />
</template>

<script>
import AppTopNav from "./AppTopNav";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { useStore } from "vuex";
import AppHeaderSticky from "@/components/AppHeaderSticky";
export default {
  name: "LayoutTemplate",
  components: { AppHeaderSticky, AppFooter, AppHeader, AppTopNav },
  setup() {
    const store = useStore();
    store.dispatch("category/getCategory");
  },
};
</script>

<style scoped></style>
