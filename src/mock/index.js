import Mock from "mockjs";
import { projectCards } from "../data/cardsData";

const app = express();

Mock.setup({
  timeout: 300, // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
});

Mock.mock("/api/cards", "get", {
  code: 200,
  message: "success",
  data: projectCards,
});
