// ============================================================
//  Demo catalogue — replace with your real products (or load from an API).
//  Fields: name, brand, cat, aud, price, mrp, size, tags
//  cat  : skin-care | make-up | hair-care | bath-body | mens-grooming | baby-care | fragrance | accessories
//  aud  : women | men | baby | unisex
//  tags : best (Best Seller) · new (New Arrival) · plus concern/type keywords used by filters & the skin quiz
// ============================================================

export const CATEGORIES = [
  { id: 'skin-care', name: 'Skin Care', icon: 'Droplets', blurb: 'Cleansers, serums, sunscreen' },
  { id: 'make-up', name: 'Make Up', icon: 'Palette', blurb: 'Lips, eyes, face' },
  { id: 'hair-care', name: 'Hair Care', icon: 'Waves', blurb: 'Shampoo, oils, masks' },
  { id: 'bath-body', name: 'Bath & Body', icon: 'Bath', blurb: 'Lotions, washes, scrubs' },
  { id: 'mens-grooming', name: "Men's Grooming", icon: 'Scissors', blurb: 'Face, beard, shave' },
  { id: 'baby-care', name: 'Mom & Baby', icon: 'Baby', blurb: 'Gentle care for little ones' },
  { id: 'fragrance', name: 'Fragrance', icon: 'SprayCan', blurb: 'Perfumes & body mists' },
  { id: 'accessories', name: 'Accessories', icon: 'Brush', blurb: 'Brushes, sponges, tools' },
]

// Colours are design tokens (see :root in src/index.css), never raw hex values.
export const AUDIENCES = [
  { id: 'women', name: 'Women', icon: 'Flower2', color: 'var(--primary)', on: 'var(--card)' },
  { id: 'men', name: 'Men', icon: 'User', color: 'var(--ink)', on: 'var(--card)' },
  { id: 'baby', name: 'Baby & Mom', icon: 'Baby', color: 'var(--success)', on: 'var(--card)' },
  { id: 'unisex', name: 'For Everyone', icon: 'Sparkles', color: 'var(--accent)', on: 'var(--ink)' },
]

const RAW = [
  // ---------- Skin care ----------
  ['Gentle Rice Foam Cleanser', 'Hanbloom', 'skin-care', 'unisex', 949, 1100, '150ml', ['cleanser', 'hydration', 'best']],
  ['Salicylic Acid Gel Cleanser', 'Dewdrop', 'skin-care', 'unisex', 999, 1100, '150ml', ['cleanser', 'acne']],
  ['Centella Calming Toner', 'Mooncalm', 'skin-care', 'unisex', 1350, 1500, '200ml', ['toner', 'hydration', 'sensitive']],
  ['Niacinamide 10% Brightening Serum', 'Dewdrop', 'skin-care', 'unisex', 1499, 1800, '30ml', ['serum', 'spots', 'best']],
  ['Vitamin C Glow Ampoule', 'Hanbloom', 'skin-care', 'women', 1449, 1700, '30ml', ['serum', 'spots', 'new']],
  ['Hyaluronic Hydra Serum', 'Mooncalm', 'skin-care', 'unisex', 1299, 1500, '50ml', ['serum', 'hydration']],
  ['Snail Repair Cream', 'Seoul Bloom', 'skin-care', 'unisex', 1550, 1700, '100g', ['moisturizer', 'aging', 'best']],
  ['Ceramide Barrier Cream', 'Mooncalm', 'skin-care', 'unisex', 1149, 1500, '50ml', ['moisturizer', 'hydration', 'sensitive']],
  ['Daily Sun Milk SPF 50+ PA++++', 'Sunveil', 'skin-care', 'unisex', 599, 700, '30g', ['sunscreen', 'sun', 'best']],
  ['Aqua Fresh Sunscreen SPF 50+', 'Sunveil', 'skin-care', 'unisex', 1450, 1700, '50ml', ['sunscreen', 'sun', 'new']],
  ['Tone-Up Sun Cream SPF 50+', 'Sunveil', 'skin-care', 'women', 700, 900, '70ml', ['sunscreen', 'sun']],
  ['Dark Circle Eye Cream', 'Hanbloom', 'skin-care', 'unisex', 1399, 1700, '30ml', ['eye', 'spots', 'aging']],
  ['Pimple Patch (24 pcs)', 'Dewdrop', 'skin-care', 'unisex', 320, 400, '24pcs', ['acne', 'best']],
  ['Hydrating Sheet Mask (10 pcs)', 'Mooncalm', 'skin-care', 'women', 650, 800, '10pcs', ['mask', 'hydration']],
  ['Pore Clay Mask', 'Seoul Bloom', 'skin-care', 'unisex', 1100, 1300, '100ml', ['mask', 'acne']],
  ['Retinol Night Cream', 'Seoul Bloom', 'skin-care', 'women', 1799, 2100, '30ml', ['moisturizer', 'aging', 'new']],
  ['Lip Sleeping Mask', 'Petalyn', 'skin-care', 'women', 850, 950, '20g', ['lip', 'hydration']],

  // ---------- Make up ----------
  ['Velvet Matte Lipstick', 'Petalyn', 'make-up', 'women', 750, 950, '3.5g', ['lip', 'best']],
  ['Glossy Tint Lip Oil', 'Petalyn', 'make-up', 'women', 650, 800, '5ml', ['lip', 'new']],
  ['Perfect Cover BB Cream', 'Petalyn', 'make-up', 'women', 1100, 1400, '50ml', ['face']],
  ['Cushion Foundation SPF 50', 'Petalyn', 'make-up', 'women', 1850, 2200, '15g', ['face', 'new']],
  ['Waterproof Volume Mascara', 'Lashora', 'make-up', 'women', 720, 900, '8g', ['eye', 'best']],
  ['Precision Eyeliner Pen', 'Lashora', 'make-up', 'women', 450, 600, '0.5ml', ['eye']],
  ['12-Shade Eyeshadow Palette', 'Lashora', 'make-up', 'women', 1650, 2000, '12g', ['eye']],
  ['Blush & Highlighter Duo', 'Petalyn', 'make-up', 'women', 980, 1200, '9g', ['face', 'new']],
  ['Defining Brow Pencil', 'Lashora', 'make-up', 'women', 380, 500, '1g', ['eye']],
  ['Long-Wear Setting Spray', 'Petalyn', 'make-up', 'women', 890, 1100, '100ml', ['face']],
  ['Natural Tone Concealer Stick', 'Mensa', 'make-up', 'men', 650, 800, '6g', ['face', 'grooming']],

  // ---------- Hair care ----------
  ['Milk Protein Shampoo', 'Silkroot', 'hair-care', 'unisex', 1900, 2100, '500ml', ['hair', 'damage']],
  ['Anti Hair-Fall Scalp Shampoo', 'Silkroot', 'hair-care', 'unisex', 2100, 2300, '400ml', ['hair', 'hair-fall', 'best']],
  ['Deep Repair Conditioner', 'Silkroot', 'hair-care', 'women', 1650, 1900, '400ml', ['hair', 'damage']],
  ['Argan Shine Hair Oil', 'Silkroot', 'hair-care', 'unisex', 1200, 1400, '100ml', ['hair', 'damage', 'new']],
  ['Keratin Repair Hair Mask', 'Silkroot', 'hair-care', 'women', 1500, 1800, '250ml', ['hair', 'damage']],
  ['Rosemary Scalp Tonic', 'Silkroot', 'hair-care', 'unisex', 1500, 1700, '150ml', ['hair', 'hair-fall']],

  // ---------- Bath & body ----------
  ['Niacinamide Brightening Body Lotion', 'Dewdrop', 'bath-body', 'unisex', 1499, 1700, '300ml', ['body', 'spots', 'best']],
  ['Vitamin C Shower Gel', 'Dewdrop', 'bath-body', 'unisex', 799, 950, '400ml', ['body']],
  ['Shea Butter Hand Cream', 'Petalyn', 'bath-body', 'women', 450, 550, '60ml', ['body', 'hydration']],
  ['Coffee Body Scrub', 'Hanbloom', 'bath-body', 'unisex', 950, 1100, '250g', ['body', 'new']],
  ['White Musk Perfumed Body Mist', 'Petalyn', 'bath-body', 'women', 1300, 1600, '200ml', ['body']],

  // ---------- Men's grooming ----------
  ['Charcoal Face Wash for Men', 'Mensa', 'mens-grooming', 'men', 650, 800, '100ml', ['cleanser', 'acne', 'grooming', 'best']],
  ['Oil-Control Moisturizer for Men', 'Mensa', 'mens-grooming', 'men', 890, 1050, '75ml', ['moisturizer', 'grooming']],
  ['Beard Growth Oil', 'Mensa', 'mens-grooming', 'men', 950, 1200, '30ml', ['grooming', 'new']],
  ['Soothing After-Shave Balm', 'Mensa', 'mens-grooming', 'men', 750, 900, '100ml', ['grooming']],
  ['Matte Hair Styling Clay', 'Mensa', 'mens-grooming', 'men', 850, 1000, '80g', ['grooming', 'hair']],
  ['Sunscreen Gel for Men SPF 50', 'Mensa', 'mens-grooming', 'men', 799, 950, '50ml', ['sunscreen', 'sun', 'grooming']],
  ['Fresh Sport Deodorant Spray', 'Mensa', 'mens-grooming', 'men', 550, 700, '150ml', ['grooming']],
  ['Sensitive Shaving Foam', 'Mensa', 'mens-grooming', 'men', 450, 550, '200ml', ['grooming', 'sensitive']],

  // ---------- Baby & mom ----------
  ['Gentle Baby Wash & Shampoo', 'Tiny Petal', 'baby-care', 'baby', 650, 800, '250ml', ['baby', 'best']],
  ['Oat Baby Lotion', 'Tiny Petal', 'baby-care', 'baby', 590, 700, '200ml', ['baby', 'hydration']],
  ['Diaper Rash Cream', 'Tiny Petal', 'baby-care', 'baby', 450, 550, '60g', ['baby', 'new']],
  ['Talc-Free Baby Powder', 'Tiny Petal', 'baby-care', 'baby', 350, 420, '200g', ['baby']],
  ['Baby Massage Oil', 'Tiny Petal', 'baby-care', 'baby', 520, 650, '150ml', ['baby']],
  ['Water Baby Wipes (80 pcs)', 'Tiny Petal', 'baby-care', 'baby', 280, 350, '80pcs', ['baby', 'best']],
  ['Baby Mineral Sunscreen SPF 30', 'Tiny Petal', 'baby-care', 'baby', 890, 1050, '50ml', ['baby', 'sun', 'sunscreen']],
  ['Mama Stretch Mark Butter', 'Tiny Petal', 'baby-care', 'women', 1250, 1500, '150ml', ['baby', 'body']],

  // ---------- Fragrance ----------
  ['Oud Noir Eau de Parfum', 'Maison Lumi', 'fragrance', 'men', 2800, 3300, '50ml', ['perfume', 'new']],
  ['Rose Petal Eau de Parfum', 'Maison Lumi', 'fragrance', 'women', 2600, 3100, '50ml', ['perfume', 'best']],
  ['Fresh Citrus Eau de Toilette', 'Maison Lumi', 'fragrance', 'unisex', 1990, 2400, '50ml', ['perfume']],

  // ---------- Accessories ----------
  ['Makeup Brush Set (10 pcs)', 'Lashora', 'accessories', 'women', 1250, 1600, '10pcs', ['tool']],
  ['Soft Beauty Blender Sponge', 'Lashora', 'accessories', 'women', 350, 450, '1pc', ['tool']],
  ['Silicone Face Cleansing Brush', 'Hanbloom', 'accessories', 'unisex', 990, 1300, '1pc', ['tool', 'new']],
]

const COPY = {
  'skin-care': {
    about: 'A dermatologically minded formula designed for everyday use in Bangladesh’s warm, humid climate.',
    how: 'Apply to clean skin as part of your morning or night routine. Patch-test first and follow with sunscreen in the day.',
  },
  'make-up': {
    about: 'Comfortable, buildable colour that stays put through long days and humid weather.',
    how: 'Apply on prepped skin. Build coverage gradually and set with powder or setting spray if needed.',
  },
  'hair-care': {
    about: 'Cares for scalp and strands, helping hair feel stronger, smoother and shinier.',
    how: 'Use on damp hair, massage into scalp or lengths, leave for the time on the label, then rinse well.',
  },
  'bath-body': {
    about: 'Everyday body care that leaves skin soft, nourished and lightly scented.',
    how: 'Use daily after showering, or as directed on the pack.',
  },
  'mens-grooming': {
    about: 'Simple, effective grooming essentials made for men’s skin, hair and beard.',
    how: 'Use as part of your daily routine. Avoid contact with eyes and rinse if irritation occurs.',
  },
  'baby-care': {
    about: 'Mild, gentle care made with sensitive baby skin in mind.',
    how: 'Use as directed. Keep out of reach of children and avoid contact with eyes.',
  },
  fragrance: {
    about: 'A long-lasting scent with a balanced opening, heart and dry-down.',
    how: 'Spray on pulse points from about 15 cm away. Avoid spraying on broken skin.',
  },
  accessories: {
    about: 'Practical beauty tools that make application smoother and cleaner.',
    how: 'Wash regularly with mild soap and let dry fully before storing.',
  },
}

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

// Deterministic demo ratings/stock keep local products looking as complete as
// the live DummyJSON products. Replace these with real values when you add a CMS.
const RATINGS = [4.7, 4.4, 4.8, 4.3, 4.6, 4.5, 4.9, 4.2]

export const PRODUCTS = RAW.map(([name, brand, cat, aud, price, mrp, size, tags], i) => {
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0
  return {
    id: slug(`${brand}-${name}`),
    name,
    brand,
    cat,
    aud,
    price,
    mrp,
    size,
    tags,
    discount,
    isBest: tags.includes('best'),
    isNew: tags.includes('new'),
    about: COPY[cat].about,
    how: COPY[cat].how,
    rating: RATINGS[i % RATINGS.length],
    reviews: 12 + ((i * 13) % 180),
    stock: i % 11 === 0 ? 4 + (i % 5) : 14 + ((i * 7) % 80),
    image: null,
    source: 'local',
  }
})

export const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))].sort()
export const getProduct = (id) => PRODUCTS.find((p) => p.id === id)
export const getCategory = (id) => CATEGORIES.find((c) => c.id === id)
export const related = (p, n = 8) =>
  PRODUCTS.filter((x) => x.id !== p.id && (x.cat === p.cat || x.aud === p.aud))
    .sort((a, b) => (b.cat === p.cat) - (a.cat === p.cat))
    .slice(0, n)
