# Magnifi website — rules for AI assistants

This folder is the Magnifi marketing website: plain HTML + CSS + a little JavaScript, no build step.
It is edited by non-designers with AI help, so **consistency matters more than cleverness**.
Before changing anything, read this file, then copy the patterns that already exist rather than inventing new ones.

## Files

| File | What it is |
|---|---|
| `magnifi-homepage.html`, `magnifi-for-business.html`, `magnifi-for-advisors.html` | Main pages |
| `feature-*.html` | One page per product feature (capacity planning, multi-level reporting, rolling cashflow) |
| `nav.html` | Shared site header, desktop menus and mobile menu. Loaded into every page by `scripts.js` |
| `footer.html` | Shared site footer. Loaded into every page by `scripts.js` |
| `styles.css` | **Design tokens** (all colours, type, spacing, radius, shadows), base styles, layout, and shared components (cards, chips, tags, buttons, lists) |
| `component-styles.css` | Header, footer and page-section components (hero, steps, stats, pricing, FAQ, charts …) |
| `scripts.js` | Loads the header/footer, runs the menus and the FAQ accordion |
| `assets/` | All images (logo, product screenshots). Every image lives here |

Outside this folder: `../website-originals/` holds the original supplied mock-ups for reference only — **never edit them or copy markup from them**; they use the old, inconsistent styles. The repo root `styles.css` belongs to the app, not this website.

## Previewing

Open pages with the VS Code **Live Server** extension (port 5501). Opening an HTML file directly from disk (`file:///…`) will not show the header or footer, because they are loaded with `fetch()`, which browsers block for local files.

## The rules

1. **No inline styles.** Never write `style="…"` on any element, including SVGs. Use an existing class; if nothing fits, add a class to the right CSS file.
2. **Every value comes from a token.** Colours, font sizes, font weights, line heights, letter spacing, spacing, radius, borders and shadows must use the variables in `styles.css` (`var(--green)`, `var(--space-4)` …). Never type a hex/rgb colour or a raw size into a component. The only exceptions are fixed geometry inside illustrations (e.g. see-saw positions) and component dimensions such as icon sizes.
3. **Don't add new tokens casually.** If a colour or size is close to an existing token, use the existing one. Only add a token when nothing is close, and add it to the matching group in `:root` with a comment.
4. **Use `rem`, never `px`** (1rem = 16px). The only `px` values allowed are in comments.
5. **Class names are kebab-case**, BEM-lite:
   - block: `.card`, `.section-head`
   - part of a block: `.card-title`, `.section-head p`
   - variant: `.card--featured`, `.btn--primary` (two dashes)
   - state set by JavaScript: `.is-open`, `.is-current`
   No camelCase, no abbreviations (`.kpi-value`, not `.kv`).
6. **Reuse before you create.** Check the component list below first. A new component is only justified when no existing one (or variant) does the job. Never create a near-copy of an existing component with a different name.
7. **Only five breakpoints**, always as `max-width`: `35rem` (phone), `47.5rem` (small tablet), `56.25rem` (tablet — grids and two-column layouts stack), `62.4375rem` (header switches to the burger menu), `74.9375rem` (header tightens). CSS can't use variables in media queries, so type these exact values.
8. **Anything combined with `.wrap` must use `padding-block`, never the `padding` shorthand** — the shorthand wipes out the side margin (`--gutter`).
9. **SVG colours**: icons use `stroke="currentColor"` / `fill="currentColor"` and get their colour from the parent (`.icon-tile`, `.check-list`, `.chip`, `.hero-note` are already green). Charts and illustrations use the colour classes at the bottom of `styles.css` (`.stroke-green-vivid`, `.fill-text-dark`, `.stop-green-light` …). Never put a hex colour in SVG markup. Add `aria-hidden="true"` to decorative SVGs.
10. **Images go in `assets/`** as real files (`.jpg`, `.png`, `.svg`), referenced as `src="assets/name.jpg"` with descriptive `alt` text. Never embed base64 / `data:` images.
11. **`<em>` inside a heading means green highlight**, not italics: `<h1>Forecasting that starts with your <em>people</em>.</h1>`.
12. **Don't change the wording** of existing copy unless asked to — layout/style requests are not copy requests.
13. After editing `scripts.js`, **bump the version** in every page's `<script src="scripts.js?v=11">` (to `v=12`, etc.) so browsers fetch the new file.

## Adding a new page

1. Copy the page skeleton below (or the closest existing page) — never start from `website-originals/`.
2. Fill in `<title>` and the meta tags:
   - homepage: `Magnifi — {tagline}`
   - every other page: `{Page name} — {short tagline} | Magnifi`
   - `description` / `og:description`: one or two plain sentences describing the page.
3. Set `data-page` on `#site-nav` so the menu highlights the page: `home`, `business`, `advisors`, `pricing` or `features` (all feature pages use `features`).
4. Add links to the new page in **all three** places that list pages:
   - `nav.html` → the Features mega menu (`.mega-grid`) **and** the mobile menu (`.mobile-nav-sub`)
   - `footer.html` → the matching column
5. Feature pages follow the existing feature-page order: breadcrumb → hero (with `.tag--lg`, `.lead`, `.hero-summary`, `.proof-list`) → "On this page" nav → sections → FAQ → final call to action.

### Page skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page name — short tagline | Magnifi</title>
<meta name="description" content="One or two sentences describing the page.">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Magnifi">
<meta property="og:title" content="Page name — short tagline | Magnifi">
<meta property="og:description" content="One sentence for link previews.">
<link rel="icon" type="image/png" href="assets/favicon_magnifi_com_au_32x32.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="component-styles.css">
</head>
<body>

<!-- HEADER -->
<div id="site-nav" data-page="features"></div>

<!-- HERO -->
<section class="hero">
  <div class="wrap">
    <div class="eyebrow reveal delay-1">Short label</div>
    <h1 class="reveal delay-2">Main heading with an <em>emphasised</em> word.</h1>
    <p class="lead reveal delay-3">One or two sentences that explain the page.</p>
    <div class="actions reveal delay-4">
      <a class="btn btn--primary" href="#">Start Free</a>
      <a class="btn btn--ghost" href="#">See how it works</a>
    </div>
  </div>
</section>

<!-- SECTION NAME -->
<section>
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">Label</div>
      <h2>Section heading.</h2>
      <p>Optional intro paragraph.</p>
    </div>
    <!-- grid of cards, split layout, etc. -->
  </div>
</section>

<!-- FINAL CALL TO ACTION -->
<section class="cta-section">
  <div class="wrap">
    <h2>Closing heading.</h2>
    <p>One sentence.</p>
    <div class="actions"><a class="btn btn--primary" href="#">Start Free</a></div>
  </div>
</section>

<!-- FOOTER -->
<div id="site-footer"></div>

<script src="scripts.js?v=11"></script>
</body>
</html>
```

Mark each section with a one-line uppercase comment (`<!-- PRICING -->`). Give sections an `id` when something links to them (`#pricing`); the sticky header is already allowed for via `scroll-padding-top`.

## Design tokens (all in `styles.css` → `:root`)

| Group | Tokens |
|---|---|
| Fonts | `--font-heading`, `--font-body` (both Clarity City, loaded by the `@import` on line 2 of `styles.css` — add any new font there) |
| Greens | `--green` (brand/buttons), `--green-dark` (green text on light), `--green-vivid` (icons, ticks, chart lines), `--green-light` (green text on dark), `--green-wash` (soft green fill), `--green-glow` (glow gradients), `--mint`, `--mint-soft` |
| Text | `--text-dark` (headings; also the navy surface colour), `--text-light` (body text), `--slate` (secondary text), `--text-muted` (chart labels) |
| Surfaces | `--bg` (white), `--bg-soft` (light grey), `--bg-tint` (pale green), `--bg-dark` (dark sections/footer), `--line` (borders) |
| On dark | `--text-on-dark`, `--text-on-dark-muted`, `--line-on-dark`, `--surface-on-dark` |
| Status | `--red`, `--red-tint`, `--amber`, `--amber-tint` |
| Font sizes | `--text-2xs` .68 · `--text-xs` .75 · `--text-sm` .82 · `--text-md` .9 · `--text-base` 1 · `--text-lg` 1.18 · `--text-xl` 1.3 · `--text-2xl` 1.5 · `--text-3xl` 1.75 · `--text-4xl` 3 (rem). Headings: `--text-h1`, `--text-h2-lg`, `--text-h2`, `--text-h2-sm`, `--text-h2-xs` |
| Weights | `--weight-regular` 400 · `-medium` 500 · `-semibold` 600 · `-bold` 700 · `-extrabold` 800 |
| Line height | `--leading-none`, `--leading-tight` (headings), `--leading-snug`, `--leading-normal` (body), `--leading-relaxed` |
| Letter spacing | `--tracking-wide`, `--tracking-wider`, `--tracking-widest` (uppercase labels) |
| Spacing | `--space-1` … `--space-30` in whole steps, plus half steps `--space-0-5`, `-1-5`, `-2-5`, `-3-5` for small gaps (the number × 0.25rem: `--space-4` = 1rem, `--space-12` = 3rem, `--space-30` = 7.5rem) |
| Layout | `--wrap` (max width), `--gutter` (side margin, smaller on phones), `--section-pad`, `--section-pad-compact`, `--header-height` |
| Shape | `--radius-xs/sm/md/lg/xl/pill/round`, `--border` (standard 1px line), `--border-width`, `--border-width-thick`, `--border-width-accent` |
| Shadows | `--shadow-sm`, `--shadow`, `--shadow-lg` (layered), `--shadow-primary` (green button), `--glow` |
| Motion | `--transition`, `--z-header`, `--z-menu` |

## Components

### Layout (`styles.css`)

| Class | Use |
|---|---|
| `<section>` | Every page section. Default background is white |
| `.section--soft` / `.section--tint` | Light grey / pale green section (with top & bottom border) |
| `.section--dark` / `.section--navy` | Dark section with green glow; text turns white automatically. `--navy` is the slightly lighter navy |
| `.section--compact` | Shorter padding — for strips (industries, stats, proof badges) and bands |
| `.wrap` | Centred content container — every section's content goes inside one |
| `.section-head` | Eyebrow + h2 + optional p at the top of a section. Variants: `--center`, `--wide`, `--lg` (bigger h2), `--sm` / `--xs` (smaller h2, for text columns beside something) |
| `.split` | Two columns side by side, stacking on tablets. `--top` aligns to the top, `--wide-left` makes the left column wider |
| `.grid` + `.grid--2/3/4/5` | Equal-width card grid. `--tight` for a small gap (inside mock-ups) |
| `.stack` | Vertical list of blocks with a gap |
| `.prose` | Body copy with spaced paragraphs |
| `.actions` | Row of buttons |

### Building blocks (`styles.css`)

| Class | Use |
|---|---|
| `.eyebrow` | Small uppercase label above a heading. `--muted` (grey), `--ruled` (short line before it) |
| `.lead` | Big intro paragraph under a page `h1` |
| `.btn` + `.btn--primary` / `.btn--ghost` | Buttons. `.btn--block` = full width |
| `.card` | White bordered card. Size: `--sm`, `--lg`. Style: `--hover` (lifts), `--raised` (shadow), `--featured` (green border — the recommended option), `--accent` (green left bar), `--soft`, `--tint`, `--dark`, `--navy`, `--feature` (navy gradient hero card), `--on-dark` (translucent, for cards inside a dark section). Layout: `--row` (icon beside text), `--narrow` (single centred card), `--full` (spans the whole grid row) |
| `.card-title` | Heading inside a card (`h3`). `--lg` / `--sm` sizes |
| `.card-header` | Title row with something on the right |
| `.card-footnote` | Small note at the bottom of a card |
| `.icon-tile` | Square icon at the top of a card (put an SVG with `currentColor` or an emoji inside). `--sm`, `--white`, `--red`, `--amber` |
| `.chips` + `.chip` | Rounded labels: industries, badges, statuses, help-article links. `.chip--lg` (bigger, with shadow — strips & badges), `--green`, `--tint`, `--muted`, `--active` (selected filter), `--link` (help-centre link, adds ↗) |
| `.tag` | Tiny uppercase status label (green). `--soon` (amber "Coming soon"), `--muted`, `--tint`, `--lg` (outlined badge at the top of a feature hero) |
| `.check-list` | List with a green tick per item (each `li` starts with the tick SVG) |
| `.dot-list` / `.dot` | List with green dots / a single dot |
| `.link-more` | "Learn more →" link |
| `.trend-up` / `.trend-down` | Green / red text for movements (▲ / ▼) |
| `.reveal` + `.delay-1…5` | Fade-up entrance animation (hero content only) |
| Utilities | `.text-center`, `.mx-auto`, `.mt-0/4/6/8`, `.mb-4/8` — spacing and alignment only; there are deliberately no colour or font utilities |

### Page sections (`component-styles.css`)

| Class | Use |
|---|---|
| `.site-header`, `.mega-menu`, `.nav-dropdown`, `.mobile-nav` | Header — edit in `nav.html` |
| `.site-footer` | Footer — edit in `footer.html` |
| `.breadcrumb` | Feature-page breadcrumb |
| `.hero` | Top section of every page. Put `.split` inside for a hero with a visual beside the text |
| `.hero-note`, `.hero-summary`, `.proof-list` | Small tick line under hero buttons / definition box / row of proof points |
| `.page-nav` | "On this page" jump links on feature pages |
| `.step` + `.step-index` | Homepage-style numbered steps ("01") in a `.grid--4` |
| `.step-sequence` | Vertical numbered steps with a connecting line (feature "How it works") |
| `.step-num` | Round step number (`--green` variant) |
| `.journey-zones` | Free / subscription bar (advisors journey) |
| `.stats` + `.stat` | Stats strip (inside `.section--tint.section--compact`) |
| `.dashboard-mock`, `.kpi` | Dashboard mock-up and KPI tiles (`.kpi--soft` variant) |
| `.chart-panel`, `.chart-svg`, `.legend` | Product chart mock-ups |
| `.screenshot-frame` / `.screenshot-scroll` + `.scroll-hint` | Real screenshots (scroll version for wide tables) |
| `.shot-placeholder` | "[SCREENSHOT] …" placeholder box |
| `.seesaw`, `.balance-notes` | Capacity/income balance illustration |
| `.orbit` | Homepage hero diagram |
| `.formula` | Capacity formula (inside a `.card--dark`) |
| `.funnel` | Rolling-cashflow "two inputs → one output" diagram |
| `.cta-band` | Dark band with a call to action on the right |
| `.price-amt`, `.price-sub` | Pricing cards (use `.card--lg`, `.card--featured` for the recommended plan) |
| `.testimonial` | Quote section. `.placeholder-note` marks placeholder content |
| `.card-quote` | Quote inside a navy card (credibility sections) |
| `.faq` | FAQ: `<details><summary>Question</summary><div class="faq-answer">Answer</div></details>` |
| `.cta-section` | Final call to action at the bottom of every page (`.cta-note` for the small print) |

### Common section recipes

Cards in a grid:

```html
<section class="section--soft">
  <div class="wrap">
    <div class="section-head"><div class="eyebrow">Label</div><h2>Heading.</h2></div>
    <div class="grid grid--3">
      <div class="card card--hover">
        <div class="icon-tile"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 17l5-5 4 4 7-8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <h3 class="card-title">Card heading</h3>
        <p>Card text.</p>
        <a class="link-more" href="#">Learn more →</a>
      </div>
      <!-- more cards -->
    </div>
  </div>
</section>
```

Text beside a visual:

```html
<section>
  <div class="wrap split">
    <div class="section-head section-head--xs">
      <div class="eyebrow">Label</div>
      <h2>Heading.</h2>
      <p>Paragraph.</p>
    </div>
    <div class="screenshot-frame"><img src="assets/example.jpg" alt="What the screenshot shows"></div>
  </div>
</section>
```

Tick list (e.g. in a pricing card):

```html
<ul class="check-list">
  <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>Item text</li>
</ul>
```

## Shared header & footer

- Edit `nav.html` / `footer.html` directly. Changes appear on every page.
- They are *fragments*: no `<html>`, `<head>` or `<body>` wrapper.
- **Keep the comment and `</body>` marker at the end of both files.** Live Server injects a reload script before the first `</body>`; without the marker it injects one before every `</svg>`, which truncates the file (this once broke the Features menu). `scripts.js` strips the marker and the injected script out.
- The header logo size is set by `.logo-img` in `component-styles.css`; images in the header/footer use `assets/logo.jpg`.

## Before you finish

- No `style="` anywhere: `grep -n 'style=' *.html` should find nothing.
- No hard-coded colours in HTML or outside `:root`.
- Every class you used exists in `styles.css` or `component-styles.css`.
- Check the page at phone width (~390px), tablet (~800px) and desktop: nothing should scroll sideways, and the burger menu should appear below 1000px.
- If you changed `scripts.js`, bump `?v=` on every page.
