import { resolve } from "node:path";
import react from "@vitejs/plugin-react-swc";

import preserveDirectives from "rollup-preserve-directives";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  const isWatch = process.argv.includes("--watch");
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      preserveDirectives(),
      dts({
        include: ["lib"],
        tsconfigPath: "./tsconfig.json",
        root: "./",
      }),
    ],
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      formats: ["es"],
      rolldownOptions: {},
    },
    ...(isWatch
      ? {
          watch: {
            include: "lib/*",
            clearScreen: true,
          },
        }
      : {}),
    rollupOptions: {
      output: {
        dir: "dist",
        preserveModules: true,
        preserveModulesRoot: "lib",
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
      external: ["react", "react-dom", "react/jsx-runtime", "react/jsx-runtime", "react/jsx-dev-runtime", "lodash"],
    },
    sourcemap: true,
    emptyOutDir: true,
  };
});
