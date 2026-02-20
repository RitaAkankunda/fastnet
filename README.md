# fastnet

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
4. Build for production:
	```bash
	npm run build
	```
5. Serve the built assets locally:
	```bash
	npm run preview
	```
