// 导入用户发送请求的底层库
import axios from "axios";
import store from "../store";
import router from "@/router";

// 导出
export const baseURL = "https://pcapi-xiaotuxian-front-devtest.itheima.net/";

// 创建请求对象(不包含token)
const instanceWithoutToken = axios.create({ baseURL });

// 创建请求对象(包含token)
const instanceWidthToken = axios.create({ baseURL });

// 用于返回response.data
const onResponseFulfilled = (response) => response.data;

// 用于捕获错误，传递错误
const onRejected = (error) => Promise.reject(error);

// 请求拦截器(在token里面添加token)
instanceWidthToken.interceptors.response.use((config) => {
  // 获取token
  const token = store.state.user.profile.token;
  // 判断token是否存在
  if (token) {
    // 将token存储在请求头中
    config.headers.Authorization = `Bearer ${token}`;
  }
  //  返回配置
  return config;
}, onRejected);

//  设置响应拦截器(携带token)
instanceWidthToken.interceptors.response.use(onResponseFulfilled, (error) => {
  // 请求失败
  if (error.response.status === 401) {
    //  清除token
    store.commit("user/setUser", {});
    //  跳转路由
    router.push("/login").then(() => {});
  }
  return Promise.reject(error);
});

// 设置响应拦截器(不携带token)
instanceWithoutToken.interceptors.response.use(onResponseFulfilled, onRejected);

// 生成请求函数所需的参数
const generateRequestConfig = (url, method, data) => ({
  url,
  method,
  [method.toLowerCase() === "get" ? "params" : data]: data,
});

// 请求函数携带token
export default function requestWithToken(url, method, data) {
  return instanceWidthToken(generateRequestConfig(url, method, data));
}

// 请求函数不携带token
export function requestWithoutToken(url, method, data) {
  return instanceWithoutToken(generateRequestConfig(url, method, data));
}
