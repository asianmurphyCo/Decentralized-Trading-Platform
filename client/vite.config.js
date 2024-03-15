import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import "dotenv/config";
const server = process.env.REACT_APP_API;

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/database": {
        target: server,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/database": "",
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader("Origin", "http://localhost:5173");
        },
      },
      "/api": {
        target: server,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": "",
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader("Origin", "http://localhost:5173");
        },
      },
      "/authenticate": {
        target: server,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/authenticate": "",
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader("Origin", "http://localhost:5173");
        },
      },
      "/verify": {
        target: server,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/verify": "",
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader("Origin", "http://localhost:5173");
        },
      },
      "/logout": {
        target: server,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/logout": "",
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader("Origin", "http://localhost:5173");
        },
      },

      "/retrieveProfile": {
        target: server,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/retrieveProfile": "",
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader("Origin", "http://localhost:5173");
        },
      },

      "/registerAPI": {
        target: server,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/registerAPI": "",
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader("Origin", "http://localhost:5173");
        },
      },

      "/sellAsset": {
        target: server,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/sellAsset": "",
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader("Origin", "http://localhost:5173");
        },
      },

      "/marketRetrieve": {
        target: server,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/marketRetrieve": "",
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader("Origin", "http://localhost:5173");
        },
      },

      "/transactionHistoryAPI": {
        target: server,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/transactionHistoryAPI": "",
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader("Origin", "http://localhost:5173");
        },
      },

      "/uploadTransaction": {
        target: server,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/uploadTransaction": "",
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader("Origin", "http://localhost:5173");
        },
      },
    },
  },
});