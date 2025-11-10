import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"
import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        react(),
        svgr({
            include: '**/*.svg?react',
        })
    ],
    base: "/mood-tracking-app/",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
})