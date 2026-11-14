# Vercel deployment

This project now deploys the React app and Express API together. The frontend uses `/api` in production, so it no longer depends on the old Render URL.

## Vercel project settings

- Root Directory: `online-exam-client` (the folder containing this file)
- Framework preset: Create React App
- Build command: `npm run build`
- Output directory: `build`

## Environment variables

Add these in Vercel under Project Settings → Environment Variables for Production:

```text
MONGO_URI=mongodb+srv://...
DEFAULT_ADMIN_NAME=Platform Admin
DEFAULT_ADMIN_EMAIL=your-admin-email@example.com
DEFAULT_ADMIN_PASSWORD=use-a-long-random-password
```

The MongoDB Atlas network access list must allow Vercel connections. For a portfolio demo, use a dedicated database user with a restricted database, not personal credentials.

After adding the variables, redeploy. Open `/api` on the deployed domain; it should return `Backend running with MongoDB`. Then test registration and login from the site.

If the backend is hosted separately later, set `REACT_APP_API_URL` to that API origin and redeploy the frontend.
