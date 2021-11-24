<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="FilterData">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          href="javascript:"
          v-for="brand in FilterData.brands"
          :key="brand.id"
          >{{ brand.name }}</a
        >
      </div>
    </div>
    <div class="item" v-for="item in FilterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}：</div>
      <div class="body">
        <a v-for="property in item.properties" :key="property.id">{{
          property.name
        }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getSubFilter } from "@/api/home";

export default {
  name: "SubFilter",
  setup() {
    const { FilterData, getData } = useSubFilter();
    getData();
    return { FilterData };
  },
};

// 获取筛选条件
function useSubFilter() {
  // 存储请求的数据
  const FilterData = ref();
  // 获取路由信息对象
  const router = useRoute();
  console.log(router.params.id);
  // 定义请求的方法
  const getData = () => {
    // 发起请求
    // console.log("发起请求");
    getSubFilter(router.params.id).then((data) => {
      // 在品牌筛选条件的前面加上全部
      data.result.brands.unshift({ id: null, name: "全部" });
      data.result.saleProperties.forEach((item) =>
        item.properties.unshift({ id: null, name: "全部" })
      );
      // 存储筛选条件
      FilterData.value = data.result;
    });
  };
  return { FilterData, getData };
}
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
