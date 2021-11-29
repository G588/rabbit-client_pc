<template>
  <AppLayout>
    <div class="container">
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <XtxBreadItem :path="`/category/${category.topCategory?.id}`"
          >{{ category.topCategory?.name }}
        </XtxBreadItem>
        <transition mode="out-in" name="fade-right">
          <XtxBreadItem :key="category.subCategory?.id">
            {{ category.subCategory?.name }}
          </XtxBreadItem>
        </transition>
      </XtxBread>
      <!-- 筛选条件组件 -->
      <SubFilter @onFilterChanged="updateSort" />
      <!-- 排序条件组件-->
      <div class="goods-list">
        <SubSort @subSortData="updateSort" />
        <!--调用二级分类商品列表组件-->
        <GoodsList v-if="goods" :goods="goods.items" />
        <!-- 无限加载组件-->
        <XtxInfiniteLoading
          :finished="finished"
          :lodging="lodging"
          @infinite="infinite"
        />
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import { useStore } from "vuex";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
import SubFilter from "@/views/category/components/SubFilter";
import SubSort from "./components/SubSort";
import GoodsList from "./components/GoodsList";
import { getSubCategorySort } from "@/api/category";
import XtxInfiniteLoading from "../../components/library/XtxInfiniteLoading";

export default {
  name: "SubCategoryPage",
  components: { XtxInfiniteLoading, GoodsList, SubSort, SubFilter, AppLayout },
  setup() {
    // 获取面包屑导航需要的分类数据
    const category = useBread();
    // 调用二级分类方法
    const { goods, updateSort, infinite, lodging, finished } = goodsList();
    return {
      category,
      goods,
      updateSort,
      infinite,
      lodging,
      finished,
    };
  },
};

function useBread() {
  // 获取 store 对象
  const store = useStore();

  // 获取 route 对象
  const route = useRoute();
  // 根据二级分类 id 查找二级分类和一级分类
  return computed(() => {
    // 用于存储一级分类和二级分类的对象
    const result = {};
    // 遍历一级分类
    store.state.category.list.forEach((topCategory) => {
      // 遍历二级分类
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

// 获取二级分类商品
function goodsList() {
  // 存储数据
  const goods = ref();
  // 引入路由实例
  const route = useRoute();
  // 请求参数
  const reqSort = ref({ categoryId: route.params.id, page: 0, pageSize: 5 });
  // lodging
  const lodging = ref(false);
  // finished
  const finished = ref(false);

  // 发起请求方法
  const goodsData = () => {
    lodging.value = true;
    // 发起请求
    getSubCategorySort(reqSort.value).then((data) => {
      console.log(data.result);
      // 判断如果页码是1
      if (reqSort.value.page === 1) {
        goods.value = data.result;
        // 当页码重置为1时重置finished
        finished.value = false;
      } else {
        // 实现数据累加
        goods.value = {
          ...data.result,
          items: [...goods.value.items, ...data.result.items],
        };
      }
      lodging.value = false;

      // 当页码是最后一页
      if (reqSort.value.page === data.result.pages) {
        finished.value = true;
      }
    });
  };

  // 当筛选或排序更新时的方法
  const updateSort = (target) => {
    reqSort.value = {
      ...reqSort.value,
      ...target,
      page: 1,
    };
  };

  // 加载更多方法
  const infinite = () => {
    // 当前页加1
    reqSort.value = {
      ...reqSort.value,
      page: reqSort.value.page + 1,
    };
  };

  // goodsData();

  // 检测路由参数变化时
  onBeforeRouteUpdate((to) => {
    console.log(to);
    reqSort.value = {
      categoryId: to.params.id,
      page: 1,
    };
  });

  watch(
    () => reqSort.value,
    () => {
      goodsData();
    }
  );

  return { goods, updateSort, infinite, lodging, finished };
}
</script>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
