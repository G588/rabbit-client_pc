import { requestWithoutToken } from "@/utils/request";

/**
 * 获取分类列表
 * @returns {Promise}
 */
export function getCategoriesReq() {
  return requestWithoutToken("/home/category/head", "get");
}

/**
 * 获取品牌推荐
 * @param limit 限制请求数据的数量
 * @return {Promise}
 */
export function getBrands(limit = 6) {
  return requestWithoutToken("/home/brand", "get", { limit });
}

/**
 * 获取轮播图数据
 * @param distributionSite 广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
 * @returns {Promise}
 */
export function getBanners(distributionSite = 1) {
  return requestWithoutToken("/home/banner", "get", { distributionSite });
}

/**
 * 获取新鲜好物数据
 * @param limit 默认传的个数
 * @returns {Promise}
 */
export function getNewGoods(limit = 4) {
  return requestWithoutToken("/home/new", "get", { limit });
}

/**
 * 获取人气推荐数据
 * @returns {Promise}
 */
export function getNewHots() {
  return requestWithoutToken("/home/hot", "get");
}

/**
 * 获取产品区块数据
 * @returns {Promise}
 */
export function getProduct() {
  return requestWithoutToken("/home/goods", "get");
}

/**
 * 获取主题商品
 * @returns {Promise}
 */
export function getBrandTheme(limit) {
  return requestWithoutToken("/home/special", "get", { limit });
}

/**
 * 获取二级分类筛选条件
 * @returns {Promise}
 */
export function getSubFilter(id) {
  return requestWithoutToken("/category/sub/filter", "get", { id });
}
