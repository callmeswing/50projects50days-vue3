import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5050, // 👈 你想使用的端口号
    host: true, // 👈 可选，如果你希望局域网能访问（比如手机调试）
  },
  // 路径别名: 1.此处 2.tsconfig.json(如果是ts项目)
  resolve: {
    alias: {
      "@": "/src",
      "@cp": "/src/components",
      "@views": "/src/views",
      "@styles": "/src/styles",
    },
  },
});
