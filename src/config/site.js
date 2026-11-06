// ============================================================
//  সব ব্র্যান্ড তথ্য এখান থেকে বদলান — পুরো সাইটে আপডেট হয়ে যাবে।
//  Change your brand details here; the whole site updates.
// ============================================================
export const SITE = {
  name: 'Lumiva',
  tagline: 'Beauty, Skincare & Baby Care in Bangladesh',
  description:
    'Authentic cosmetics and personal care for women, men and babies. Curated formulas, honest ingredients, delivered across Bangladesh.',
  phone: '+8801700-000000',
  email: 'hello@yourdomain.com',
  address: 'House 00, Road 00, Dhanmondi, Dhaka, Bangladesh',
  whatsapp: '8801700000000', // country code + number, no + or spaces
  social: {
    facebook: 'https://facebook.com/yourpage',
    instagram: 'https://instagram.com/yourpage',
    youtube: 'https://youtube.com/@yourpage',
  },
  currency: '৳',
  shipping: {
    insideDhaka: 80,
    outsideDhaka: 130,
    freeAbove: 3000,
  },
  deliveryNote: 'Inside Dhaka 1–2 days · Outside Dhaka 3–5 working days',
}

// DummyJSON prices are in USD. Change this one constant to re-price the
// imported catalogue. Prices are rounded to the nearest ৳10 for the storefront.
export const USD_TO_BDT = 125

export const roundToTen = (value) => Math.round(Number(value) / 10) * 10

export const usdToBdt = (value) => roundToTen(Number(value) * USD_TO_BDT)

export const money = (n) => `${SITE.currency} ${Number(n || 0).toLocaleString('en-US')}`
