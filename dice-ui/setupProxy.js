/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyManagement = {
  target: import.meta.env.VITE_MANAGEMENT_URL || 'http://localhost:8079',
  changeOrigin: true,
  secure: false,
  logLevel: 'debug',
  onError: (err, _req, _res) => {
    console.error(err);
  },
};

const proxyEntry = {
  target: import.meta.env.VITE_ENTRY_URL || 'http://localhost:8080',
  changeOrigin: true,
  secure: false,
  logLevel: 'debug',
  onError: (err, _req, _res) => {
    console.error(err);
  },
}

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware(proxyManagement),
  );

  app.use(
    '/api/v1/entry',
    createProxyMiddleware(proxyEntry),
  );
};
