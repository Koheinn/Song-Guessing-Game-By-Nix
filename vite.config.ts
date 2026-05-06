/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import url from 'url';
import {defineConfig, loadEnv} from 'vite';

function vercelDevPlugin() {
  return {
    name: 'vercel-dev',
    configureServer(server) {
      server.middlewares.use('/api', async (req, res, next) => {
        if (!req.url) return next();
        try {
          const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
          let requestedPath = parsedUrl.pathname;
          // Clean duplicated /api if req.url already had it stripped by middleware, wait middleware mounts it as /api so req.url is the rest
          if (requestedPath.startsWith('/api')) {
             requestedPath = requestedPath.replace('/api', '');
          }
          
          let filePath = path.join(__dirname, 'api', requestedPath);
          if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.js')) {
            filePath += '.js';
          }
          if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.ts')) {
            filePath += '.ts';
          }
          
          if (fs.existsSync(filePath)) {
            // Force bust cache for dev
            const handlerModule = await import(url.pathToFileURL(filePath).href + '?t=' + Date.now());
            const handler = handlerModule.default;
            
            // Mock Vercel's req/res extensions
            req.query = Object.fromEntries(parsedUrl.searchParams.entries());
            
            res.status = (code) => {
              res.statusCode = code;
              return res;
            };
            
            res.json = (data) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
            };
            
            await handler(req, res);
          } else {
            next();
          }
        } catch (e) {
          console.error('API Error:', e);
          res.statusCode = 500;
          res.end(String(e));
        }
      });
    }
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), vercelDevPlugin()],
    define: {

      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/setupTests.ts',
    },
  };
});
