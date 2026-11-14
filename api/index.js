// Vercel's Node runtime uses this entry point for every /api/* request.
const app = require("../server/server");

module.exports = (req, res) => {
  // Rewrites may preserve the /api prefix depending on the Vercel runtime.
  // Express routes in server.js intentionally stay environment-agnostic.
  if (req.url === "/api") req.url = "/";
  if (req.url.startsWith("/api/") && !req.url.startsWith("/api/membership")) req.url = req.url.slice(4);
  return app(req, res);
};
