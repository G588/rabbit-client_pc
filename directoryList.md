|-- rabbit-client-pc
    |-- .browserslistrc
    |-- .eslintrc.js
    |-- .gitignore
    |-- babel.config.js
    |-- directoryList.md
    |-- jsconfig.json
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- vue.config.js
    |-- yarn-error.log
    |-- yarn.lock
    |-- .idea
    |   |-- .gitignore
    |   |-- jsLibraryMappings.xml
    |   |-- misc.xml
    |   |-- modules.xml
    |   |-- prettier.xml
    |   |-- rabbit-client-pc.iml
    |   |-- vcs.xml
    |   |-- watcherTasks.xml
    |   |-- workspace.xml
    |   |-- dictionaries
    |   |   |-- Administrator.xml
    |   |-- inspectionProfiles
    |   |   |-- Project_Default.xml
    |   |-- jsLinters
    |       |-- eslint.xml
    |-- images
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |-- src
        |-- App.vue
        |-- main.js
        |-- api
        |   |-- constants.js 一级分类假数据
        |   |-- home.js 首页API接口函数
        |-- assets 静态资源目录
        |   |-- logo.png
        |   |-- images
        |   |   |-- 200.png
        |   |   |-- center-bg.png
        |   |   |-- load.gif
        |   |   |-- loading.gif
        |   |   |-- login-bg.png
        |   |   |-- logo.png
        |   |   |-- none.png
        |   |   |-- qrcode.jpg
        |   |-- styles 样式
        |       |-- common.less 重置样式
        |       |-- mixin.less 鼠标经过上移阴影动画样式
        |       |-- variables.less 公共样式变量
        |-- components 复用组件
        |   |-- AppFooter.vue 底部布局组件
        |   |-- AppHeader.vue 头部布局组件
        |   |-- AppHeaderNav.vue 顶部通栏组件
        |   |-- AppHeaderSticky.vue 吸顶导航组件
        |   |-- AppLayout.vue 
        |   |-- AppTopNav.vue 吸顶导航组件
        |   |-- directives
        |   |   |-- lazy.js
        |   |-- library
        |       |-- index.js 进行全局配置逻辑
        |       |-- XtxCarousel.vue 应用级轮播图组件
        |       |-- XtxMore.vue 应用级查看全部组件
        |       |-- XtxSkeleton.vue 应用级骨架屏组件
        |-- hooks 公共逻辑
        |   |-- useLazyData.js 封装数据懒加载方法
        |   |-- useScrollTop.js 封装获取滚动距离方法
        |-- router 路由
        |   |-- index.js
        |-- store 公共数据状态管理
        |   |-- cart.js 购物车模块状态
        |   |-- category.js 分类模块状态
        |   |-- index.js 创建Store配置模块
        |   |-- user.js 用户模块状态
        |-- test
        |-- utils 工具函数
        |   |-- request.js 封装请求函数
        |-- views 页面级组件
            |-- category 分类页
            |   |-- SubCategoryPage.vue 二级分类页面组件
            |   |-- TopCategoryPage.vue 一级分类页面组件
            |-- home 
                |-- HomePage.vue 首页
                |-- components 
                    |-- HomeBanner.vue 首页轮播图页面组件
                    |-- HomeBrand.vue 首页热门品牌页面组件
                    |-- HomeCategory.vue 首页分类页面组件
                    |-- HomeGoods.vue 首页产品区块右侧内容页面组件
                    |-- HomeHot.vue 首页人气推荐页面组件
                    |-- HomeNew.vue 首页新鲜好物页面组件
                    |-- HomePanel.vue 首页公共面板页面组件
                    |-- HomeProduct.vue 首页产品区块基础布局页面组件
                    |-- HomeSkeleton.vue 首页新鲜好物和人气推荐要使用的骨架布局页面组件
