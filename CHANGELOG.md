# Changelog — Lumiva storefront refresh

**Date:** 6 November 2026
**Type:** Visual polish + live product catalogue integration (existing React 18 + Vite project upgraded, not rewritten)

---

## What changed

### 1. Fixed rose / gold design system
- Replaced the previous theme with the requested tokens in `src/index.css`:
  `--primary:#C2185B`, `--primary-dark:#8E0F43`, `--primary-soft:#FDEAF1`,
  `--accent:#D4A24C`, `--ink:#231A22`, `--muted:#6E6370`, `--bg:#FFF8FA`,
  `--card:#FFFFFF`, `--line:#EFE3EA`, `--success:#12A150`, `--danger:#D92D20`.
- Typography: **Playfair Display** headings, **Inter** body, **Hind Siliguri** Bangla fallback.
- Rounded 14–18 px surfaces, soft shadows, WCAG-AA-friendly ink/muted text, 44 px mobile controls.
- Added reduced-motion support (`prefers-reduced-motion`) for all animations and transitions.

### 2. Redesigned hero
- Two-column desktop layout; image moves above the copy on tablet/mobile.
- Attached beauty image converted to transparent **`public/hero.webp`** (1122×1402, ~309 KB).
- Rounded image frame with token-based rose glow and four floating glass chips
  (Women, Men, Baby & Mom, free delivery).
- `<img>` includes intrinsic `width`/`height`, descriptive `alt`, `fetchpriority="high"`,
  eager loading and `object-fit: cover`.
- Mobile: full-width buttons, chips kept inside the viewport, no horizontal overflow at 320 px.

### 3. Live DummyJSON catalogue + local products
- Added **`src/services/productService.js`**:
  - DummyJSON category endpoints (`beauty`, `skin-care`, `fragrances`,
    `womens-jewellery`, `sunglasses`, `mens-watches`), categories, single product,
    search, and paged `limit` / `skip` / `sortBy` / `order` helpers.
  - Maps API records to the existing product shape, prefixes IDs with `api-`,
    maps categories to existing storefront categories/audiences, generates tags,
    ratings, stock, discounts and BDT prices.
  - Six-hour memory + `sessionStorage` cache, forced refresh support, `response.ok`
    checks and `AbortController` signal propagation.
- Added **`src/context/ProductContext.jsx`** (`ProductProvider` / `useProducts`):
  - Immediately shows the local catalogue, then merges live API products.
  - Exposes `{ products, loading, error }` plus `retry`, `getById`, `ensureProduct`,
    `categories`, `brands` and `relatedTo`.
  - Automatic local-only fallback on API failure; friendly error + **Try again**.
  - Single-product fetch for direct/uncached detail URLs.
- Local catalogue remains authored in **`src/data/products.js`**:
  Baby & Mom, Men's Grooming, Hair Care and Bath & Body, now with deterministic
  ratings, review counts, stock and `source: 'local'`.
- Cart and wishlist still persist **IDs only**; `CartContext` resolves current product
  data through `useProducts()`.

### 4. Currency
- Added the single **`USD_TO_BDT = 125`** constant in `src/config/site.js`.
- USD prices are converted and rounded to the nearest ৳10; display format is `৳ 1,250`.

### 5. Pages and UX polish
- **Home:** Hero → Why choose us → Shop for Everyone → Top Categories →
  Best Sellers (highest rating) → promo → New Arrivals → audience rows →
  routine steps → SEO copy.
- **Shop:** filters generated from merged catalogue data, search, sort,
  load-more, skeleton loading and API error notice.
- **Product detail:** single-product fetch fallback, API image handling,
  stock/low-stock states, ratings, discount, related products.
- **Wishlist:** correct empty state while the catalogue is still loading.
- **Skin Quiz:** now reads the merged catalogue.
- Added reusable **`src/components/Rating.jsx`**; product cards show stars,
  review counts, stock warnings and NEW/OFF badges.
- Product visuals: API thumbnails render on white with `object-fit: contain`;
  local demo products keep token-coloured icon artwork; image errors fall back
  to the placeholder.
- Added skeleton grids/rows and API-offline notices.
- Per-page document title + meta description via `src/hooks/useTitle.js`.
- Lazy-loading for non-hero images; eager loading only for the hero and large
  detail image.

### 6. Metadata / PWA
- `index.html`: updated theme colour, description, Open Graph tags, fonts;
  removed the global hero preload to avoid unused-preload warnings on other routes.
- Updated `public/favicon.svg` and `public/manifest.webmanifest` to the rose/gold theme.

### 7. Navbar active-state fix
- Fixed the top navigation where **every** `/shop?...` link was highlighted at once.
  `NavLink` only matches the pathname, and all shop filters share `/shop`.
- Replaced it with query-aware matching that selects a **single** active item
  (e.g. `?aud=women` → only “Women”, `?cat=skin-care` → only “Skin Care”).
- `All Products` is highlighted only when `/shop` has no audience/category/tag/search filter.
- Added the matching active state to the mobile drawer too, and `aria-current="page"`
  is now applied only to the genuinely active link.

---

## Files added

| File | Purpose |
|---|---|
| `src/services/productService.js` | DummyJSON fetch, mapping, caching, single-product/search/paged helpers |
| `src/context/ProductContext.jsx` | Merged catalogue context, retry, fallback, derived categories/brands/related |
| `src/components/Rating.jsx` | Accessible star rating with review count |
| `public/hero.webp` | Attached hero image, converted to transparent WebP |
| `package-lock.json` | Locked dependency tree (no new runtime dependencies) |
| `CHANGELOG.md` | This changelog |

## Files modified

| File | Change |
|---|---|
| `src/index.css` | Full rose/gold token theme, hero, skeletons, rating, API, responsive and reduced-motion styles; single-active navbar/drawer styles |
| `src/components/Header.jsx` | Query-aware single active state for the top navbar and mobile drawer |
| `src/pages/Home.jsx` | New hero, why-us strip, merged-catalogue sections and required section order |
| `src/pages/Shop.jsx` | Merged catalogue, dynamic filters, error/retry, skeletons, search/sort/load-more |
| `src/pages/ProductDetail.jsx` | Uncached single-product fetch, stock/rating states, API visuals, related row |
| `src/pages/Wishlist.jsx` | Loading/empty-state edge case; merged catalogue resolution |
| `src/pages/SkinQuiz.jsx` | Uses `useProducts()` instead of the static list |
| `src/components/ProductCard.jsx` | Ratings, badges, stock warnings, API-safe visuals |
| `src/components/ProductVisual.jsx` | API image vs local placeholder, error fallback, lazy/eager loading |
| `src/components/Section.jsx` | Skeleton grid/row support |
| `src/config/site.js` | `USD_TO_BDT`, `roundToTen`, `usdToBdt`, safer `money` formatting |
| `src/data/products.js` | Token-based audience colours + enriched local product data |
| `src/context/CartContext.jsx` | Resolves products from the merged catalogue |
| `src/main.jsx` | Adds `ProductProvider`; enables React Router v7 future flags |
| `src/hooks/useTitle.js` | Per-page title, description, and OG meta updates |
| `index.html` | Theme colour, meta/OG tags, font stack; removed global hero preload |
| `public/favicon.svg` | Rose/gold favicon |
| `public/manifest.webmanifest` | Updated app name/theme colours |
| `README.md` | How to run, live API/merge notes, theme tokens, demo-only caveats |
| `package.json` | Project metadata cleanup (no new dependencies) |

---

## Verification

- `npm run build` completed successfully with Vite 5.4.21 — no errors or warnings.
- Production bundle: CSS ~34 KB, main JS ~77 KB, vendor ~164 KB (gzip ~7 / 24 / 54 KB).
- Headless browser checks at **320 px** and **1440 px**:
  - No horizontal overflow at 320 px (`scrollWidth === innerWidth`).
  - Hero image appears above the copy on mobile and in the right column on desktop.
  - Full-width mobile hero buttons (296 px at 320 px viewport).
  - Bottom navigation items measure 49 px tall (≥ 44 px target).
  - Hero image has `width`, `height`, `alt`, `fetchpriority="high"` and eager loading.
  - API products render with DummyJSON thumbnails (`api-3`, `api-119`, `api-156`, …).
  - Direct load of `/product/api-1` renders *Essence Mascara Lash Princess* with API
    description, stock, rating and related products.
  - No console errors or warnings after the router-future-flag and preload fixes.
  - Navbar active-state checks: `/shop` → only “All Products”; `?aud=women` → only “Women”;
    `?cat=skin-care` → only “Skin Care”; `?tag=best` → only “Best Sellers”;
    `/skin-quiz` → only “Skin Quiz”.
- Merged catalogue count in the test session: **88 products** (61 local + 27 live API).

---

## Notes

- No new heavy dependencies: only existing `react`, `react-dom`, `react-router-dom`,
  `lucide-react`; styling is plain CSS (no Tailwind).
- LocalStorage auth/orders remain **demo only** — see README section “Demo-only parts”.
- API products come from `https://dummyjson.com` and require a network connection.
  If the API is unavailable, the storefront automatically keeps working with the
  local demo catalogue.
