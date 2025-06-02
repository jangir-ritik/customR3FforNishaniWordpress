import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          "three-vendor": [
            "three",
            "@react-three/fiber",
            "@react-three/drei",
            "@react-three/postprocessing",
          ],
        },
      },
    },
  },
  assetsInclude: ["**/*.gltf"],
  server: {
    port: process.env.PORT || 5137,
    host: true,
  },
});
