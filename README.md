# portfolio

Personal portfolio site. Live at [jamescorino.dev](https://jamescorino.dev). Built with React + Vite, deployed on Vercel.

## Stack

- **React 19.2.5** + **React Router 7.15.0**
- **TypeIt 8.8.7** — typewriter effect on page load
- **Vite 8.0.10**
- **Vercel Analytics 2.0.1**

## Pages

| Route | Description |
|-------|-------------|
| `/` | About — animated intro with typewriter effect |
| `/builds` | Project cards |
| `/notes` | Notes |

## Getting started

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Deployment

Deployed on Vercel. The `vercel.json` rewrites all routes to `index.html` for client-side routing. Push to `main` to trigger a deploy.