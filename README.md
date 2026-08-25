# Norte

Ten demonstration landing pages, each with its own visual identity, built from a single
component library and one design-token system.

**Live: [norte-dde.pages.dev](https://norte-dde.pages.dev)**

Every brand, price, testimonial and statistic in the demos is **fictional on purpose** — the
project exists to show design range and front-end engineering, not to impersonate real companies.

> Code and comments are in Portuguese. This README is in English.

---

## What is interesting here

**Ten identities, zero literal colors in components.** Each demo is a `[data-theme]` block of
CSS custom properties, not a set of bespoke components. Adding an eleventh identity means writing
a token block — never a new component variant. Tokens are named by _role_
(`--c-ink-2`, `--c-line`, `--c-accent`), so a component never knows which theme it is rendering in.

**Contrast is measured, not estimated — and it gates the build.**
[`scripts/check-contrast.mjs`](scripts/check-contrast.mjs) parses `index.css` directly and checks
every token pair against WCAG AA across all ten themes:

```
208 combinações checadas · 0 abaixo de 4.5:1 — tudo passando
```

It was written after an audit found **55 failing pairs** that all looked fine to the eye. Ratios
between 2.85:1 and 4.41:1 are exactly the band where estimation fails.

**The service worker cannot go stale silently.** A post-build step
([`scripts/build-sw.mjs`](scripts/build-sw.mjs)) injects the hashed asset list into the worker.
Two caches on purpose: a versioned shell cache replaced on every deploy, and an **unversioned
media cache** so a new deploy does not discard megabytes of photos already on someone's phone.
The document is fetched network-first, so a new deploy appears without clearing anything.

**The same audit fixed 45 invalid heading/interactive nestings.** The "whole card is a button"
pattern had put `<h3>` inside the interactive element — invalid content model, and screen readers
announced the entire card as one name. Inverted to `<h3><button>` with `after:absolute
after:inset-0`.

## Stack

React · TypeScript · Vite · Tailwind CSS v4 · React Router · Framer Motion · Lucide.
No backend, no database, no authentication. The value here is finish, not infrastructure.

## Running

```bash
npm install
npm run dev        # http://localhost:5273
```

| Script              | What it does                                                       |
| ------------------- | ------------------------------------------------------------------ |
| `npm run dev`       | development server                                                 |
| `npm run build`     | typecheck + production build + service-worker asset list           |
| `npm run typecheck` | types only                                                         |
| `npm run contraste` | measures every token pair in every theme against WCAG AA           |
| `npm run photos`    | downloads the photos to `public/photos` (~22 MB, webp, two widths) |

Photos are **not committed**. The app serves them locally when present and falls back to the
origin CDN when they are not, so the project runs without ever fetching them.

## Routes

| Route                | Demo                        | Visual direction                              |
| -------------------- | --------------------------- | --------------------------------------------- |
| `/`                  | Showcase                    | Dark editorial, amber                         |
| `/demo/saas-ai`      | AI operations platform      | Dark premium, bento grid, product UI in CSS   |
| `/demo/agencia`      | Brand studio                | Paper editorial, display serif, electric blue |
| `/demo/clinica`      | Integrative medicine clinic | Clean, deep green, form above the fold        |
| `/demo/imobiliaria`  | High-end real estate        | Dark luxury, gold, full-bleed photography     |
| `/demo/ecommerce`    | Coffee subscription         | Warm, large product, direct comparison        |
| `/demo/consultoria`  | Management consultancy      | Corporate, navy + gold, audited numbers       |
| `/demo/adega`        | Wine shop with own delivery | Nocturnal, cyan neon, delivery zone map       |
| `/demo/barbearia`    | Barbershop and club         | Leather and brass, condensed, booking         |
| `/demo/hamburgueria` | Burger restaurant           | Embers, appetite, tabbed menu                 |
| `/demo/petshop`      | Pet shop and vet clinic     | Light and warm, coral + teal                  |

## Architecture

```
src/
  index.css              design system: per-theme tokens (@theme inline)
  lib/
    demos.ts             demo registry (showcase metadata)
    images.ts            photo curation per demo
    motion.ts            shared variants and easing
  components/site/       Navbar, Features, Pricing, Tabs, Section, …
  demos/<slug>/          composition + copy for each demo
  pages/Showcase.tsx     index with per-demo preview thumbnails
scripts/
  check-contrast.mjs     WCAG AA gate
  build-sw.mjs           injects hashed asset list into the service worker
```

The rules the project enforces — and the real bugs that produced each one — are documented in
[CLAUDE.md](CLAUDE.md). Two worth reading even out of context: a class passed by prop does not
reliably beat a base class on the same property, and `position: relative` with `z-index: auto`
does **not** create a stacking context, which is how a toggle pill escaped behind its own parent
background in five demos for months.

## Deploying

Static build, hostable anywhere.

```bash
npm run build
npx wrangler pages deploy dist --project-name=norte
```

`public/_redirects` handles client-side routes. `public/robots.txt` blocks indexing **on
purpose**: the pages carry fictional brands and registration numbers, and nobody should find
"Clínica Aurora" on Google believing it exists.

## Using this code

© Bruno Reis. Published as a **portfolio and reading copy**, not as an open-source template.

You are welcome to read it, learn from it, and quote it with attribution. Reusing the designs or
the page compositions commercially, in whole or in part, is not permitted — these are the working
templates of a real practice. If you want to use something here, [get in
touch](mailto:brunoereiss@gmail.com); the answer is usually yes.
