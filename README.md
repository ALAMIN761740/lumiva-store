# Lumiva — Beauty & Personal-Care Store (React + Vite)

A complete, responsive e-commerce storefront for cosmetics and personal care for
**women, men and babies**. Works on phones, tablets and desktops.

The storefront keeps the original React 18 + Vite structure and shopping flow, and adds a
refreshed rose/gold design, a redesigned hero, and a live product catalogue merged with the
local demo catalogue.

---

## How to run

Requires **Node.js 18+**.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # test the production build locally
```

No new runtime dependencies were added. The app uses React, React Router and Lucide icons,
with plain CSS (no Tailwind or CSS framework).

---

## What's included

| Feature | Status |
|---|---|
| Home (redesigned hero, why-us strip, audiences, categories, best sellers, promo, new arrivals, routine, SEO) | ✅ |
| Shop with search, category / audience / brand filters, sorting, load-more | ✅ |
| Product page (quantity, buy now, WhatsApp order, related products) | ✅ |
| Live DummyJSON catalogue merged with local demo products | ✅ |
| Cart + wishlist (IDs only, restored from the browser) | ✅ |
| Checkout — Cash on Delivery, inside/outside Dhaka charge, BD phone validation | ✅ |
| Order confirmation + Track Order | ✅ demo (browser-only, see below) |
| Login / Register / My Account | ✅ demo (browser-only, see below) |
| Skin Quiz, Contact (via WhatsApp), About, FAQ, Shipping, Returns, Terms, Privacy | ✅ |
| Mobile bottom navigation, drawer menu, filter bottom-sheet | ✅ |
| SEO basics (per-page titles/descriptions, robots.txt, manifest, favicon) | ✅ |
| Skeleton loaders, API error state + Try again, automatic local fallback | ✅ |
| Responsive from 320 px, 44 px mobile touch targets, reduced-motion support | ✅ |

---

## Design tokens

The theme lives in `src/index.css` under `:root`:

```css
--primary: #C2185B;        /* rose */
--primary-dark: #8E0F43;
--primary-soft: #FDEAF1;
--accent: #D4A24C;         /* gold */
--ink: #231A22;
--muted: #6E6370;
--bg: #FFF8FA;
--card: #FFFFFF;
--line: #EFE3EA;
--success: #12A150;
--danger: #D92D20;
```

Fonts: **Playfair Display** for headings, **Inter** for body text, **Hind Siliguri** as the
Bangla fallback. Corners are 14–18 px, shadows are soft, and interactive controls are at
least 44 px tall on mobile.

### Hero image

The attached image was converted to a transparent WebP and saved as `public/hero.webp`
(1122×1402). To use a different photo, replace that file and keep the same aspect ratio.
The `<img>` in `src/pages/Home.jsx` already has `width`, `height`, `alt`,
`fetchpriority="high"`, eager loading, and `object-fit: cover`.

---

## Live products (DummyJSON)

`src/services/productService.js` fetches the live catalogue from
`https://dummyjson.com` and maps it into the same shape as the local products.

Endpoints used:

- Categories: `/products/categories`
- Category lists: `/products/category/beauty`, `/skin-care`, `/fragrances`,
  `/womens-jewellery`, `/sunglasses`, `/mens-watches`
- Single product: `/products/:id` (used for uncached detail pages)
- Search: `/products/search?q=…`
- Paged / sorted: `/products?limit=…&skip=…&sortBy=…&order=…`

API products:

- get IDs prefixed with `api-` (for example `api-1`);
- are mapped to the existing categories and audiences;
- receive deterministic tags, ratings/review counts, stock and NEW/BEST flags;
- use DummyJSON thumbnails, while local demo products keep their token-coloured artwork.

`src/context/ProductContext.jsx` merges local and live products and exposes
`{ products, loading, error }` through `useProducts()`. It also provides `retry`,
`getById`, `ensureProduct`, `categories`, `brands` and `relatedTo`.

Caching and fallback:

- Products are cached in memory and `sessionStorage` for 6 hours.
- If the API fails or times out, the storefront automatically falls back to the local
  catalogue and shows a friendly notice with **Try again**.
- The local catalogue is always shown immediately, so the page is never blank.

### Currency

All USD prices are converted with one constant in `src/config/site.js`:

```js
export const USD_TO_BDT = 125
```

Prices are rounded to the nearest ৳10 and shown like `৳ 1,250`.

---

## Local products

The demo catalogue lives in `src/data/products.js` (the `RAW` list). Local products cover
**Baby & Mom**, **Men's Grooming**, **Hair Care** and **Bath & Body**, plus the original
demo items. Each row is:

```
[name, brand, category, audience, price, mrp, size, tags]
```

- `category`: skin-care · make-up · hair-care · bath-body · mens-grooming · baby-care · fragrance · accessories
- `audience`: women · men · baby · unisex
- `tags`: `best`, `new`, plus keywords (`acne`, `spots`, `hydration`, `sun`, `aging`, `sensitive` …)
  used by the Skin Quiz and search.
- **Product photos:** local products use icon artwork by default. Add
  `image: '/products/my-photo.jpg'` and place the file under `public/products/` to show a photo.

Discount % is calculated from `price` and `mrp`.

---

## Demo-only parts — IMPORTANT

The shop is fully clickable, but these parts store data **in the visitor's own browser
(localStorage)** and are **demo only**:

1. **Login / Register** — `src/services/authService.js`
   Accounts are not shared across devices and are not secure enough for production.
   Replace `register`, `login`, `logout` and `updateProfile` with your backend
   (Firebase Auth, Supabase, Node/Express, Laravel …). Nothing else needs to change.
2. **Orders** — `src/services/orderService.js`
   Orders are saved only in the customer's browser, so **you will not receive them**.
   In `createOrder()` send the order to your backend, Google Sheet/Apps Script, email service
   or a WhatsApp/Telegram bot. `trackOrder()` / `listOrders()` should read from the same place.
3. **Payments** — checkout supports **Cash on Delivery only**. Add bKash / Nagad /
   SSLCommerz in `src/pages/Checkout.jsx` (there is a TODO marker).

The policy pages in `src/pages/Info.jsx` are template text — review them for your business.

---

## Rebrand quickly

| What | Where |
|---|---|
| Name, phone, email, address, WhatsApp, social links, delivery charges | `src/config/site.js` |
| USD → BDT rate and price rounding | `src/config/site.js` |
| Colours | `:root` variables in `src/index.css` |
| Logo | `src/components/Logo.jsx` |
| Favicon | `public/favicon.svg` |
| Hero photo | `public/hero.webp` |
| Page title / default meta | `index.html` |
| Product catalogue | `src/data/products.js` |

---

## Deploy

`npm run build` creates the `dist/` folder. Upload it to any static host:

- **Vercel / Netlify / Cloudflare Pages** — connect the repo; build command `npm run build`,
  output directory `dist`. (`vercel.json` and `public/_redirects` are included so direct
  links and page refreshes work.)
- **cPanel / shared hosting** — upload the contents of `dist/` and add an `.htaccess` that
  rewrites all routes to `index.html`:

  ```
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  ```

After launch: update `robots.txt`, set your real domain in the meta tags, and optionally add
Google Analytics / Meta Pixel in `index.html`.

---

## Project structure

```
src/
  config/site.js          brand, shipping and USD → BDT settings
  data/products.js        local demo catalogue + audiences/categories
  services/productService.js  DummyJSON fetch, mapping and cache
  services/authService.js     demo auth (replace for production)
  services/orderService.js    demo orders (replace for production)
  context/                Product, Cart, Wishlist, Auth, Toast providers
  hooks/useTitle.js       per-page title + meta description
  components/             Header, Footer, BottomNav, ProductCard, Rating …
  pages/                  Home, Shop, ProductDetail, Cart, Checkout …
  index.css               design tokens and all responsive styles
public/
  hero.webp               redesigned hero image
  favicon.svg, manifest.webmanifest, robots.txt, _redirects
```

See **`CHANGELOG.md`** for the full list of added and changed files.
