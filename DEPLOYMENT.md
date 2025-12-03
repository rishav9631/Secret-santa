# Deployment Guide

## 1. Backend (Render)

1.  Push your code to GitHub.
2.  Go to [Render Dashboard](https://dashboard.render.com/).
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub repository.
5.  **Root Directory**: `server`
6.  **Build Command**: `npm install`
7.  **Start Command**: `node index.js`
8.  **Environment Variables**:
    *   `MONGODB_URI`: `mongodb+srv://rishavjha771:8qRIAVWwFDFzWlTq@cluster0.tzjm4zy.mongodb.net/secret-santa?appName=Cluster0`
    *   `FRONTEND_URL`: `https://your-vercel-app.vercel.app` (Add this after deploying frontend)

## 2. Frontend (Vercel)

1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Root Directory**: `./` (default)
5.  **Build Command**: `npm run build` (default)
6.  **Output Directory**: `dist` (default)
7.  **Environment Variables**:
    *   `VITE_API_URL`: `https://your-render-app.onrender.com` (Get this URL from Render dashboard)

## 3. Final Steps

1.  After deploying the frontend, copy its URL.
2.  Go back to Render -> Environment Variables.
3.  Add/Update `FRONTEND_URL` with the Vercel URL.
4.  Redeploy the backend if necessary.
