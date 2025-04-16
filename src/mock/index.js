import Mock from "mockjs";
import { projectCards } from "../data/cardsData";

const interceptors = [
  // {
  //   url: /.*/,
  //   type: "get",
  //   response: {
  //     code: 200,
  //     message: "success",
  //   },
  // },
  {
    url: /^\/api\/cards$/,
    type: "get",
    response: {
      code: 200,
      message: "success",
      data: projectCards,
    },
  },
];

Mock.setup({
  timeout: 300, // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
});

interceptors.forEach((interceptor) => {
  Mock.mock(interceptor.url, interceptor.type || "get", interceptor.response); // type 要小写
});
console.log("🔥 Mockjs 接口模拟完毕！");
