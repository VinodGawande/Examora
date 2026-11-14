// Keep production requests on the same origin so the frontend and the Vercel
// function work together without depending on a stale external API URL.
// A separate API can still be supplied through REACT_APP_API_URL when needed.
const configuredApiUrl = process.env.REACT_APP_API_URL?.trim();
const API_BASE_URL = configuredApiUrl || (process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000");

export const apiUrl = (path) => {
  const base = API_BASE_URL.replace(/\/$/, "");
  let normalizedPath = `/${String(path).replace(/^\//, "")}`;

  // Some existing membership calls already include /api in their path.
  // Avoid generating /api/api/... when the same-origin base is /api.
  if (base === "/api" && normalizedPath.startsWith("/api/")) {
    normalizedPath = normalizedPath.slice(4);
  }

  return `${base}${normalizedPath}`;
};

export default API_BASE_URL;
