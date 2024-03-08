import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '',
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader('Origin', 'http://localhost:5173');
        },
      },
      '/authenticate': {
        target: 'http://localhost:5000/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/authenticate': '',
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader('Origin', 'http://localhost:5173');
        },
      },

      '/verify': {
        target: 'http://localhost:5000/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/verify': '',
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader('Origin', 'http://localhost:5173');
        },
      },

      '/logout': {
        target: 'http://localhost:5000/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/logout': '',
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader('Origin', 'http://localhost:5173');
        },
      },
    },
  },
});