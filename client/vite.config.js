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

      '/registerAPI': {
        target: 'http://localhost:5037/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/registerAPI': '',
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader('Origin', 'http://localhost:5173');
        },
      },

      '/sellAsset': {
        target: 'http://localhost:5038/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/sellAsset': '',
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader('Origin', 'http://localhost:5173');
        },
      },

      '/marketRetrieve': {
        target: 'http://localhost:5038/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/marketRetrieve': '',
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader('Origin', 'http://localhost:5173');
        },
      },

      '/transactionHistoryAPI': {
        target: 'http://localhost:5038/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/transactionHistoryAPI': '',
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader('Origin', 'http://localhost:5173');
        },
      },

      '/uploadTransaction': {
        target: 'http://localhost:5038/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/uploadTransaction': '',
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader('Origin', 'http://localhost:5173');
        },
      },
    },
  },
});