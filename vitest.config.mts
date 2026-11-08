import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import path from "node:path";

// 在 ESM 配置里没有 __dirname，需要从 import.meta.url 推出来，
// 否则 resolve.alias 解析不到 "@" 别名（见 P2 · T2 常见坑）。
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    // 校验逻辑不碰 DOM，用 node 环境跑得更快。
    environment: "node",
  },
});
