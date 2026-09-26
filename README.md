# jamescorino.dev

Personal site, live at [jamescorino.dev](https://jamescorino.dev). React and Vite, deployed on Vercel.

## Stack

- **React 19** and **React Router 7**
- **GSAP 3.15** with `TextPlugin` and `@gsap/react` for the page-entry sequence
- **marked** for rendering notes written in markdown
- **Vite 8**
- **Vercel Analytics**

## Routes

| Route | Page |
|---|---|
| `/` | About, with the animated intro |
| `/builds` | Project cards |
| `/notes` | Note index |
| `/notes/:slug` | A single note, rendered from markdown |

## The entry animation

Every page runs the same sequence through `usePageAnimation`: type the `h1`, fade in the `h2`, type it, highlight it, swap the highlight for an underline, stagger in the content, type the call to action, reveal the footer.

It is one GSAP timeline rather than chained callbacks. `useGSAP` scopes it to the page element, so navigating away reverts the timeline and kills any in-flight tweens without manual cleanup, and selectors inside the hook resolve within that scope rather than the whole document.

Headings are sized from `--fit-chars`, a CSS custom property the hook sets to the heading's character count. The font size is derived from it in CSS, so a long heading shrinks to fit without measuring the DOM, forcing a reflow, or running a fitting loop.

Under `prefers-reduced-motion: reduce` the timeline jumps to `progress(1)`, landing on the finished state with every callback fired and nothing animating.

Headings carry an `aria-label` with their final text, since the elements start empty and are filled character by character.

## Adding content

### A project

Add an entry to `src/data/ProjectsList.js`:

```js
{
  name: 'project name',
  year: '2026',
  desc: 'One-line summary shown on the card.',
  details: ['Optional longer paragraphs.'],
  tags: ['react', 'vite'],
  link: 'https://github.com/Jamescorino8/repo',
}
```

### A note

Drop a markdown file into `src/notes/`. The filename becomes the slug, so `src/notes/some-thought.md` is served at `/notes/some-thought`.

```markdown
---
title: Some thought
date: 2026-09-20
---

Body text, in markdown.
```

`src/data/notes.js` picks these up with `import.meta.glob`, parses the frontmatter, and sorts newest first. Entries without a real `YYYY-MM-DD` date sort last, which is how placeholders stay at the bottom.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── components/     Navbar, Footer, ProjectCard
├── data/           ProjectsList.js, NotesList.js, notes.js
├── hooks/          usePageAnimation.js, useTheme.js
├── notes/          markdown notes, one file per route
├── pages/          Index, Builds, Notes, NotePage
├── Layout.jsx
├── main.jsx
└── index.css
```

## Deployment

Deployed on Vercel. `vercel.json` rewrites every route to `index.html` so client-side routing works on direct navigation and refresh. Pushing to `main` triggers a deploy.