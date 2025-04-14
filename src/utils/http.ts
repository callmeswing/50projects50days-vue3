import axios from "axios";

const http = axios.create({
  baseURL: "/api",
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
    return response.data;
  },
  (error) => {
    // 可以在这里处理请求错误，比如提示信息
    return Promise.reject(error);
  }
);

export default http;
