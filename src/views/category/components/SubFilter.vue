<template>
  <!-- 筛选区 -->
  <div v-if="filters && !filterLoading" class="sub-filter">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          v-for="brand in filters?.brands"
          :key="brand.id"
          :class="{ active: filters.selectedBrandId === brand.id }"
          href="javascript:"
          @click="
            filters.selectedBrandId = brand.id;
            updateSelectedFilters();
          "
          >{{ brand.name }}</a
        >
      </div>
    </div>
    <div v-for="item in filters?.saleProperties" :key="item.id" class="item">
      <div class="head">{{ item.name }}：</div>
      <div class="body">
        <a
          v-for="property in item.properties"
          :key="property.id"
          :class="{ active: property.name === item.selectedFilterName }"
          href="javascript:"
          @click="
            item.selectedFilterName = property.name;
            updateSelectedFilters();
          "
          >{{ property.name }}</a
        >
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" height="40px" width="800px" />
    <XtxSkeleton class="item" height="40px" width="800px" />
    <XtxSkeleton class="item" height="40px" width="600px" />
    <XtxSkeleton class="item" height="40px" width="600px" />
    <XtxSkeleton class="item" height="40px" width="600px" />
  </div>
</template>
<script>
import { ref } from "vue";
import { getSubCategoryFilters } from "@/api/category";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

export default {
  name: "SubFilter",
  setup(props, { emit }) {
    // 获取路由信息对象
    const route = useRoute();
    const { filters, getData, updateSelectedFilters, filterLoading } =
      useFilters(emit);
    // 发送请求获取筛选条件
    getData(route.params.id);
    return { filters, updateSelectedFilters, filterLoading };
  },
};

// 获取筛选条件
function useFilters(emit) {
  // 用于存储最终的筛选条件数据
  const filters = ref();
  // 表示是否正在加载数据
  const filterLoading = ref(false);
  // 用于存储汇总的用户选择的筛选条件
  const selectedFilters = {
    brandId: null,
    attrs: [],
  };
  // 汇总用户选择的筛选条件
  const updateSelectedFilters = () => {
    // 汇总用户选择的品牌id
    selectedFilters.brandId = filters.value.selectedBrandId;
    // 清除原有的筛选条件数据
    selectedFilters.attrs = [];
    // 汇总用户选择的其他筛选条件
    filters.value.saleProperties.forEach((item) => {
      // 如果用户选择了筛选条件并且用户选择的筛选条件不是"全部"
      if (item.selectedFilterName && item.selectedFilterName !== "全部") {
        // 将用户选择的筛选条件存储在 attrs 数组中
        selectedFilters.attrs.push({
          // 筛选类别的名字
          groupName: item.name,
          // 筛选条件的名字
          propertyName: item.selectedFilterName,
        });
      }
    });
    // 将用户选择的筛选条件传递到父组件 以备后续使用
    emit("onFilterChanged", selectedFilters);
  };
  // 用于获取筛选条件的方法
  const getData = (id) => {
    // 更新加载状态
    filterLoading.value = true;
    // 向服务器端发送请求获取筛选条件数据
    getSubCategoryFilters(id).then((data) => {
      // 在品牌筛选选项的前面加入"全部"筛选条件
      data.result.brands.unshift({ name: "全部", id: null });
      // 设置默认选中的品牌的ID
      data.result.selectedBrandId = null;
      data.result.saleProperties // 在其他筛选选项的前面加入"全部"筛选条件
        .forEach((item) => {
          item.properties.unshift({ name: "全部", id: null });
          // 设置默认选中的筛选条件的名字
          item.selectedFilterName = "全部";
        });
      // 存储筛选条件数据
      filters.value = data.result;
      // 更新加载状态
      filterLoading.value = false;
    });
  };
  // 监听路由参数的变化, 当路由参数发生变化以后重新获取筛选条件数据
  onBeforeRouteUpdate((to) => getData(to.params.id));
  return { filters, getData, updateSelectedFilters, filterLoading };
}
</script>
<style lang="less" scoped>
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

.xtx-skeleton {
  padding: 10px 0;
}
</style>
