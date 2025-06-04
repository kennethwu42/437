import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/auth": "http://localhost:3000",
      "/images": "http://localhost:3000"
      
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        login: path.resolve(__dirname, "login.html"),
        newuser: path.resolve(__dirname, "newuser.html")
      }
    }
  }
});
