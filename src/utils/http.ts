import axios, { type AxiosRequestConfig } from "axios";
import type { ApiResponse } from "@/types/apiTypes";

const http = axios.create({
  baseURL: "/",
  timeout: 5000,
});

// 添加请求拦截器（如果需要的话）
http.interceptors.request.use(
  (config) => {
    // 在发送请求之前可以做一些事情，比如添加 token 等
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器（如果需要的话）
http.interceptors.response.use(
  (response) => {
    // console.log(response);
    return response.data;
  },
  (error) => {
    // 可以在这里处理请求错误，比如提示信息
    return Promise.reject(error);
  }
);

export default http;

// 🌟 AxiosRequestConfig 建议了解
// 可选配置对象，常用于设置 headers、params、timeout、responseType 等参数
export function typedGet<T>(url: string, config?: AxiosRequestConfig) {
  return http.get<unknown, ApiResponse<T>>(url, config);
}
