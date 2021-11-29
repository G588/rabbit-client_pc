<template>
  <AppLayout v-bind="$attrs">
    <div class="container">
      <!--
          由于 category.list 一开始是假数据 我们从中查询不到我们需要的数据
          所以在此需要判断 topCategory 是否存在 如果存在再找name属性
        -->
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="topCategory?.id">{{
            topCategory?.name
          }}</XtxBreadItem>
        </transition>
      </XtxBread>
      <!-- 调用轮播图组件 -->
      <XtxCarousel
        :carousels="banners"
        :style="{
          height: '500px',
        }"
      />
      <!-- 全部二级分类 -->
      <ShowSubCategoryList
        v-if="topCategory"
        :subCategories="topCategory.children"
      />
      <!-- 二级分类商品推荐 -->
      <RecommendGoods />
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import XtxBread from "@/components/library/XtxBread";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";
import useBanners from "@/hooks/useBanners";
import ShowSubCategoryList from "@/views/category/components/ShowSubCategoryList";
import RecommendGoods from "@/views/category/components/RecommendGoods";
export default {
  name: "TopCategoryPage",
  components: { RecommendGoods, ShowSubCategoryList, XtxBread, AppLayout },
  setup() {
    const topCategory = useCategory();
    // banners 轮播数据
    // getData 获取轮播图数据的方法
    const { banners, getData } = useBanners();
    // 获取轮播图数据
    getData(2);
    return { topCategory, banners };
  },
};

function useCategory() {
  // 获取 store 对象
  const store = useStore();
  // 获取 route 对象
  const route = useRoute();
  return computed(() => {
    // 根据id查找一级分类数据
    // id 从路由参数中获取
    return store.state.category.list.find(
      (item) => item.id === route.params.id
    );
  });
}
</script>

<style scoped></style>
