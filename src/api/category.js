import { requestWithoutToken } from "@/utils/request";

/**
 * 获取一级分类的具体信息
 * @param id 一级分类ID
 * @return {Promise}
 */
export function getTopCategoryById(id) {
  return requestWithoutToken("/category", "get", { id });
}

/**
 * 获取二级分类筛选条件
 * @param id 二级分类ID
 * @return {Promise}
 */
export function getSubCategoryFilters(id) {
  return requestWithoutToken("/category/sub/filter", "get", { id });
}

/**
 * 获取二级分类排序条件
 * @param sortObj 二级分类排序条件对象
 * @return {Promise}
 */
export function getSubCategorySort(sortObj) {
  return requestWithoutToken("/category/goods", "post", sortObj);
}
