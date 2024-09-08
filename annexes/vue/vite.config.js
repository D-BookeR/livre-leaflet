import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import copy from "rollup-plugin-copy";

export default defineConfig({
  plugins: [
    vue(),
    copy({
      targets: [
        {
          src: "node_modules/leaflet/dist/images/*",
          dest: "dist",
        },
      ],
      hook: "writeBundle",
    }),
  ],
});
