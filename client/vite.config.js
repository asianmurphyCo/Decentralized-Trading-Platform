import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/database': {
        target: 'http://localhost:5035',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/database': ''
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader('Origin', 'http://localhost:5173');
        }
      }
    }
  }
});