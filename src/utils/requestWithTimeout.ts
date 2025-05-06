import http from "./http";
import axios from "axios";

// 模拟500ms取消请求, 默认500ms
export function requestWithTimeout(url: string, timeout = 500) {
  // CancelToken 创建一个取消令牌 source，支持主动取消axios请求
  // 未来版本中 AbortContoller 逐步替代了 CancelToken
  const source = axios.CancelToken.source();

  // 超时Promise，第一个参数_指代这里无需用到得resolve参数，reject是调用失败时得回调函数
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      // 主动取消请求
      source.cancel("请求超时");
      // 抛出超时错误
      reject(new Error("请求超时"));
    }, timeout);
  });

  // 关联cancelToken，requestPromise本身是一个普通的Get请求Promise
  // 如果source.cancel()被调用，请求会被axios中断
  const requestPromise = http.get(url, { cancelToken: source.token });

  // race，谁先完成就用谁的结果
  return Promise.race([requestPromise, timeoutPromise]);
}
