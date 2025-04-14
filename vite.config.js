import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 路径别名: 1.此处 2.tsconfig.json(如果是ts项目)
  resolve: {
    alias: {
      "@": "/src",
      "@api": "/src/api",
      "@cp": "/src/components",
      "@views": "/src/views",
      "@styles": "/src/styles",
    },
  },
});
