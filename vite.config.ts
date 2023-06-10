import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "node:url";

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [ react() ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    server: {
        strictPort: true,
        port: 8080,
        host: "::", //'0.0.0.0',
    },

})
