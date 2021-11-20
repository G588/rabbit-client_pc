// import XtxSkeleton from "@/components/library/XtxSkeleton";
// import XtxCarousel from "@/components/library/XtxCarousel";
// import XtxMore from "@/components/library/XtxMore";
import lazy from "@/components/directives/lazy";
// import XtxBrend from "@/components/library/XtxBread";
// import XtxBreadItem from "@/components/library/XtxBreadItem";
//
// const library = {
//   install(app) {
//     // 骨架屏设置全局应用组件
//     app.component(XtxSkeleton.name, XtxSkeleton);
//     // 轮播图设置全局应用组件
//     app.component(XtxCarousel.name, XtxCarousel);
//     // 查看全部设置全局应用组件
//     app.component(XtxMore.name, XtxMore);
//     app.directive("lazy", lazy);
//     // 注册全局面包屑导航
//     app.component(XtxBrend.name, XtxBrend);
//     app.component(XtxBreadItem.name, XtxBreadItem);
//   },
// };
//
// export default library;

// 批量导入模块
const importFn = require.context("./", false, /\.vue$/);
// 获取匹配的文件的路径
const keys = importFn.keys();

const library = {
  install(app) {
    app.directive("lazy", lazy);
    // 遍历文件的路径
    keys.forEach((key) => {
      // 导入组件
      const component = importFn(key).default;
      // 注册组件
      app.component(component.name, component);
    });
  },
};

export default library;
