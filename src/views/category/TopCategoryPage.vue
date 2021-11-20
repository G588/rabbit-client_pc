<template>
  <LayoutTemplate>
    <!--版心-->
    <div class="container">
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="topCategory?.id">{{
            topCategory?.name
          }}</XtxBreadItem>
        </transition>
      </XtxBread>
      <!--      调用轮播图组件-->
      <XtxCarousel
        :bannersData="bannersData"
        :style="{ height: '500px' }"
      ></XtxCarousel>
      <!--      获取二级分类列表数据-->
      <ShowSubCategoryList
        v-if="topCategory"
        :subCategories="topCategory.children"
      />
      <!--      推荐商品-->
      <RecommendGoods />
    </div>
  </LayoutTemplate>
</template>

<script>
import LayoutTemplate from "@/components/AppLayout";
import XtxBread from "@/components/library/XtxBread";
import XtxBreadItem from "@/components/library/XtxBreadItem";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import useBanners from "@/hooks/useBanners";
import XtxCarousel from "@/components/library/XtxCarousel";
import ShowSubCategoryList from "@/views/category/components/ShowSubCategoryList";
import RecommendGoods from "@/views/category/components/RecommendGoods";
export default {
  name: "TopCategoryPage",
  components: {
    RecommendGoods,
    ShowSubCategoryList,
    XtxCarousel,
    XtxBreadItem,
    XtxBread,
    LayoutTemplate,
  },
  setup() {
    const topCategory = useTopCategory();
    // 获取轮播图数据
    const { bannersData, getData } = useBanners();
    getData();
    return { bannersData, topCategory };
  },
};

// 获取一级分类数据
function useTopCategory() {
  // 引入store
  const store = useStore();
  // 引入路由
  const route = useRoute();
  // 使用计算属性 ,因为页面一上来是没有数据的
  return computed(() => {
    // 数据遍历
    return store.state.category.list.find(
      (category) => category.id === route.params.id
    );
  });
}
</script>

<style scoped></style>
