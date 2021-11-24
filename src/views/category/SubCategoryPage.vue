<template>
  <LayoutTemplate>
    <!--版心-->
    <div class="container">
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <XtxBreadItem :path="`/category/${result.topCategory?.id}`">{{
          result.topCategory?.name
        }}</XtxBreadItem>
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem>{{ result.subCategory?.name }}</XtxBreadItem>
        </transition>
      </XtxBread>
      <!-- 渲染组件-->
      <SubFilter></SubFilter>
    </div>
  </LayoutTemplate>
</template>

<script>
import LayoutTemplate from "@/components/AppLayout";
import XtxBread from "@/components/library/XtxBread";
import XtxBreadItem from "@/components/library/XtxBreadItem";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";
import SubFilter from "@/views/category/components/SubFilter";
export default {
  name: "SubCategoryPage",
  components: { SubFilter, LayoutTemplate, XtxBread, XtxBreadItem },
  setup() {
    const result = useBread();
    return { result };
  },
};
// 获取一级分类和二级分类方法
function useBread() {
  const store = useStore();
  const route = useRoute();
  return computed(() => {
    // 存储一级分类数据和存储二级分类数据
    const result = {};
    store.state.category.list.forEach((topCategory) => {
      topCategory.children?.forEach((subCategory) => {
        // 查找当前二级分类
        if (subCategory.id === route.params.id) {
          // 存储一级分类
          result.topCategory = {
            name: topCategory.name,
            id: topCategory.id,
          };
          // 存储二级分类
          result.subCategory = {
            name: subCategory.name,
            id: subCategory.id,
          };
        }
      });
    });
    // 返回结果
    return result;
  });
}
</script>

<style scoped></style>
