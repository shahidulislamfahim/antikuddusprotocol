import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "anti-kuddus-protocol";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? `/${repoName}/` : "/",
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
});
