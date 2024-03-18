import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import "dotenv/config";
const server = process.env.REACT_APP_API;
// const client = process.env.REACT_APP_URL;
const client = "http://localhost:5173";

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
          proxyReq.setHeader("Origin", client);
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
          proxyReq.setHeader("Origin", client);
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
          proxyReq.setHeader("Origin", client);
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
          proxyReq.setHeader("Origin", client);
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
          proxyReq.setHeader("Origin", client);
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
          proxyReq.setHeader("Origin", client);
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
          proxyReq.setHeader("Origin", client);
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
          proxyReq.setHeader("Origin", client);
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
          proxyReq.setHeader("Origin", client);
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
          proxyReq.setHeader("Origin", client);
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
          proxyReq.setHeader("Origin", client);
        },
      },
    },
  },
});