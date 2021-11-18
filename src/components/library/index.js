import XtxSkeleton from "@/components/library/XtxSkeleton";
import XtxCarousel from "@/components/library/XtxCarousel";
import XtxMore from "@/components/library/XtxMore";
import lazy from "@/components/directives/lazy";

const library = {
  install(app) {
    // 骨架屏设置全局应用组件
    app.component(XtxSkeleton.name, XtxSkeleton);
    // 轮播图设置全局应用组件
    app.component(XtxCarousel.name, XtxCarousel);
    // 查看全部设置全局应用组件
    app.component(XtxMore.name, XtxMore);
    app.directive("lazy", lazy);
  },
};

export default library;
