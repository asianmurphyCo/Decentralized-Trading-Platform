import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/database': {
        target: 'http://localhost:5035',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/database': '',
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader('Origin', 'http://localhost:5173');
        },
      },
      '/api': {
        target: 'http://localhost:5035/',
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
        target: 'http://localhost:5036/',
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
        target: 'http://localhost:5036/',
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
        target: 'http://localhost:5036/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/logout': '',
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader('Origin', 'http://localhost:5173');
        },
      },

      '/retrieveProfile': {
        target: 'http://localhost:5037/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/retrieveProfile': '',
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader('Origin', 'http://localhost:5173');
        },
      },

      '/register': {
        target: 'http://localhost:5037/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/register': '',
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader('Origin', 'http://localhost:5173');
        },
      },
    },
  },
});