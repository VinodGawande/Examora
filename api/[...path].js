// Catch-all Vercel function for /api/auth/*, /api/results/* and
// /api/membership/* requests.
const app = require("../server/server");

module.exports = (req, res) => {
  if (req.url.startsWith("/api/") && !req.url.startsWith("/api/membership")) {
    req.url = req.url.slice(4);
  }

  return app(req, res);
};
