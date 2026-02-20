# fastnet

## Live deployments

- **Frontend:** https://fast-net-routing.netlify.app — Netlify-hosted SPA that publishes `dist/` with `_redirects` so routing stays within the app.
- **Backend:** https://fastnet-backend.vercel.app — Vercel serverless Express API handling `/initiate-payment`, `/check-status`, and `/webhook`.

## About

fastnet is a single-page experience that showcases a captive portal preview and builder for FASTNET, a high-speed fiber/wireless provider. The UI is built with React components and mirrors the payment, voucher, and success flows that an operator would expose to their customers.

## Technologies

- **Frontend**
	- **React 18** for the interactive portal builder views.
	- **Vite** as the bundler and dev server powering fast refresh and optimized builds.
	- **TypeScript** for typings across components, hooks, and helpers.
- **Backend**
	- **Express** + **cors** powering the lightweight backend simulation under `server/index.js` (used alongside the UI via `npm run dev:all`).

## Getting started

1. Install dependencies:
	```bash
	npm install
	```
2. Run the Vite dev server:
	```bash
	npm run dev
	```
	Visit http://localhost:5173/ to see the portal preview.
3. Start both the UI and Express mocks together (optional):
	```bash
	npm run dev:all
	```

## Deployment

### Frontend (Netlify)

1. Build the SPA locally:
	```bash
	npm run build
	```
2. Connect your Git repo to Netlify and configure the build command as `npm run build` with `dist` as the publish directory, or drag the `dist/` folder onto the Netlify UI for a manual upload.
3. Add a `_redirects` file inside `dist/` with `/* /index.html 200` so the single-page router always falls back to the React entry point.
4. Use `npm run preview` if you want to sanity-check the production bundle before deploying.

### Backend (Vercel)

1. Ensure `server/index.js` exports an Express app and respects `process.env.PORT` (already wired to Vite’s dev server), then add a `vercel.json` at the repo root such as:
	```json
	{
	  "functions": {
	    "server/index.js": {
	      "runtime": "nodejs20.x",
	      "memory": 512
	    }
	  },
	  "rewrites": [
	    { "source": "/api/:path*", "destination": "/server/index.js" }
	  ]
	}
	```
2. Deploy:
	- Install the Vercel CLI (`npm install -g vercel`).
	- Run `vercel --prod` from the repo root and follow the prompts to select your team, project, and root directory (keep it as the repository root so `server/index.js` is reachable).
3. After deployment, point your frontend (Netlify) or other clients at the Vercel endpoint (e.g., `https://fastnet-backend.vercel.app/api/...`).

The separation gives you a snappy static frontend on Netlify while the Express API runs in Vercel’s serverless environment.

## Live deployments

- **Frontend:** fast-net-routing.netlify.app — the Netlify site serving the React bundle and configured with `_redirects` so routing stays within the SPA.
- **Backend:** fastnet-backend (https://fastnet-backend.vercel.app) — the Vercel serverless function exposing `/initiate-payment`, `/check-status`, and `/webhook` for the portal preview.
