import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/database": {
        target: "https://decentralized-trading-platform.onrender.com/",
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
        target: "https://decentralized-trading-platform.onrender.com/",
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
        target: "https://decentralized-trading-platform.onrender.com/",
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
        target: "https://decentralized-trading-platform.onrender.com/",
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
        target: "https://decentralized-trading-platform.onrender.com/",
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
        target: "https://decentralized-trading-platform.onrender.com/",
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
        target: "https://decentralized-trading-platform.onrender.com/",
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
        target: "https://decentralized-trading-platform.onrender.com/",
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
        target: "https://decentralized-trading-platform.onrender.com/",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/marketRetrieve": "",
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader("Origin", "http://localhost:5173");
        },
      },
    },
  },
});