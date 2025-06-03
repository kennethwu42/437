import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        campsite: resolve(__dirname, 'campsite.html'),
        login: resolve(__dirname, "login.html"),
        newuser: resolve(__dirname, "newuser.html"),
        activities: resolve(__dirname, 'activities.html')
      }
    }
  }
})
