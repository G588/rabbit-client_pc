<template>
  <div class="ref-goods" v-for="item in topCategory?.children" :key="item.id">
    <div class="head">
      <h3>- {{ item.name }} -</h3>
      <p class="tag">温暖柔软，品质之选</p>
      <XtxMore />
    </div>
    <div class="body">
      <GoodsItem :goods="goods" v-for="goods in item.goods" :key="goods.id" />
    </div>
  </div>
</template>

<script>
import GoodsItem from "@/views/category/components/GoodsItem";
import { ref } from "vue";
import { getTopCategoryById } from "@/api/category";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
export default {
  name: "RecommendGoods",
  components: { GoodsItem },
  setup() {
    // 获取路由信息对象
    const route = useRoute();
    // 获取一级分类及获取一级分类数据的方法
    const { topCategory, getData } = useTopCategory();
    // 向服务器端发送请求获取一级分类数据
    getData(route.params.id);
    return { topCategory };
  },
};
function useTopCategory() {
  // 用于存储一级分类信息的响应式数据
  const topCategory = ref();
  // 用于获取一级分类信息的方法
  const getData = (id) => {
    // 获取一级分类
    getTopCategoryById(id).then((data) => {
      // 存储一级分类
      topCategory.value = data.result;
    });
  };
  // 在路由切换之前 获取到目标路由参数id 根据id 获取最新的一级分类信息
  onBeforeRouteUpdate((to) => getData(to.params.id));
  // 返回一级分类及获取一级分类数据的方法
  return { topCategory, getData };
}
</script>
<style lang="less" scoped>
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
