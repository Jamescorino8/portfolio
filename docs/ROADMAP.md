# Roadmap — Sep 2026

Content was refreshed in Sep 2026 against the resume and LinkedIn. This file tracks what's next.

## 1. Where to take the site next

Roughly in priority order.

### Content
- **Builds page revision (next up).** Add the new projects: SKKU research (Grounding DINO batch-inference tool) and Transit Weather Analysis. Rewrite the CPU simulator entry to match the resume (gate-level ALU, pipeline, L1/L2 cache, up to 20x fewer cycles). Put the strongest 3–4 entries first and move coursework into an "older" group.
- **Fix the portfolio project link.** It still points at `tree/main/portfolio`, but the repo was flattened, so the link is broken. It should be `https://github.com/Jamescorino8/portfolio`.
- **First real note.** The notes page only has a placeholder. A short write-up of the Grounding DINO findings would work well here: the crowd-density failure on ~30–40px faces, and why threshold tuning couldn't recover it.
- **Resume link.** Add `public/resume.pdf` and link it from the nav or footer, so recruiters don't have to go through LinkedIn.
- **"20 yo".** This goes stale every year. Either compute it from a birth date or drop it.

### Features
- **Notes as markdown.** Keep each note in `src/notes/*.md`, load them with `import.meta.glob`, and add a `/notes/:slug` route. Writing a note then means adding one file, with no JSX.
- **Project images.** Add a thumbnail or figure per card, such as an annotated detection output or a cache-hit chart.
- **Experience section.** Add a short timeline on the about page (SKKU research intern, BOCES technical intern, SKKU summer semester), or give it its own `/experience` route.

### Polish and hygiene
- **Load the font.** `index.css` uses `'Space Mono'`, but nothing loads it, so visitors who don't have it installed get a generic monospace font. Add the Google Fonts `<link>` in `index.html`, or self-host it.
- **SEO and sharing.** The h1, h2 and CTA start empty and are typed in by JS, so crawlers and link previews see almost nothing. Add Open Graph and Twitter meta tags plus an `og:image`. The animation rewrite below also fixes the empty-DOM problem.
- **Accessibility.** Respect `prefers-reduced-motion` by skipping straight to the final state, and consider skipping the intro on repeat visits within a session.
- **Lint.** `npm run lint` currently reports 4 errors, all in `usePageAnimation.js`. They go away with the rewrite below.

## 2. Animation rewrite plan

### Problem
`usePageAnimation.js` plus `useFitText.js` come to about 280 lines. Most of that is hand-written orchestration: AbortControllers, timeout fallbacks, `settled` guards, StrictMode `hasRun` workarounds, and a font-scaling ratio passed between two hooks. Every page also has to create 5 refs and wire them in.

### Recommendation: GSAP timeline + TextPlugin + `useGSAP`
All of GSAP, including its plugins, is free to use. A timeline replaces every hand-written `await delay()` and `typeAsync()` step:

- `TextPlugin` does the typewriter effect, which replaces TypeIt.
- `useGSAP()` from `@gsap/react` reverts everything on unmount and is StrictMode-safe. That removes all of the abort, timeout and `hasRun` code.
- A `scope` ref lets the animation target elements by class name, so pages need no refs.

Sketch of the whole hook:

```js
// src/hooks/usePageIntro.js
import { useRef } from 'react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(TextPlugin, useGSAP)

const CPS = 20 // characters per second
const type = (text) => ({ text, duration: text.length / CPS, ease: 'none' })

export function usePageIntro({ h1, h2, cta = 'wanna keep in touch?' }) {
  const scope = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline()
        .to('.intro-h1', type(h1), 0.3)
        .from('.intro-h2', { autoAlpha: 0, height: 0, duration: 0.35 })
        .to('.intro-h2', type(h2))
        .call(() => scope.current.querySelector('.intro-h2').classList.add('underlined'), null, '+=0.4')
        .from('.stagger-item', { autoAlpha: 0, y: 6, stagger: 0.1 })
        .to('.cta', type(cta))
        .from('footer', { autoAlpha: 0, duration: 0.5 })
    })
    // Under reduced motion, nothing runs and the final state (real text in the DOM) shows immediately.
  }, { scope })

  return scope
}
```

A page then becomes:

```jsx
const scope = usePageIntro({ h1: 'you have found me!', h2: 'about me' })
return <div ref={scope}> … <h1 className="intro-h1" /> … </div>
```

### Steps
1. `npm i gsap @gsap/react`, then `npm uninstall typeit`.
2. Add `usePageIntro.js` as sketched above. Keep the blinking cursor by toggling `.typing` in each tween's `onStart`/`onComplete`, or drop the cursor.
3. Replace `useFitText` with CSS: `h1 { font-size: clamp(1.25rem, 6vw, 3rem); white-space: nowrap; }`. Tune the `vw` value against the longest heading ("what am i thinking about?").
4. Migrate Index, Builds and Notes one at a time. Each page loses its 5 refs, and `Footer` no longer needs `forwardRef`.
5. Delete `usePageAnimation.js`, `useFitText.js`, the `.expanded`, `.printed`, `.revealed` and `.highlighted` state classes, and the `hidden` default styles in `index.css`. GSAP's `.from()` sets the starting states itself.
6. Update the README stack list, then check that `npm run lint` and `npm run build` pass.

Expected result: about 280 lines of hooks become about 30, TypeIt is removed, and the sequence reads top to bottom in one place.

### Alternative: Motion (`motion/react`)
Motion is more idiomatic React: variants with `staggerChildren`, and elements appear as state advances. It has no built-in typewriter, though, so you'd write a small `<Typewriter>` component and chain steps through state. That's cleaner for reveals but clunkier for a strict sequence like this one. GSAP's timeline fits this intro better.
