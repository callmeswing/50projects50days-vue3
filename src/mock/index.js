import Mock from "mockjs";
import { projectCards } from "../data/cardsData";
import { sounds } from "../data/soundBoardData";
import { dadJokes } from "../data/dadJokeData";

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
  {
    url: /^\/api\/sound-board\/sounds$/,
    type: "get",
    response: {
      code: 200,
      message: "success",
      data: sounds,
    },
  },
  {
    url: /^\/api\/dad-jokes$/,
    type: "get",
    response: {
      code: 200,
      message: "success",
      data: dadJokes,
    },
  },
];

Mock.setup({
  timeout: "200-500", // 模拟随机延迟
});

interceptors.forEach((interceptor) => {
  Mock.mock(interceptor.url, interceptor.type || "get", interceptor.response); // type 要小写
});
console.log("🔥 Mockjs 接口模拟完毕！");
