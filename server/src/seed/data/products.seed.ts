export interface ProductSeed {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  popularity: number;
}

/** Reliable Unsplash URLs — use images.unsplash.com with explicit photo IDs */
const images = {
  smartwatch:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
  headphones:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
  tshirt:
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=80",
  leatherTote:
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80",
  sneakers:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
  filmCamera:
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80",
  deskLamp:
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=80",
  pourOver:
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80",
  sweater:
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80",
  wallet:
    "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80",
  earbuds:
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
  blanket:
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=80",
  sunglasses:
    "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&auto=format&fit=crop&q=80",
  actionCamera:
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80",
  chinos:
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80",
  candle:
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",
  techOrganizer:
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
  speaker:
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80",
} as const;

export const productsSeed: ProductSeed[] = [
  {
    name: "ProConnect Smartwatch v2",
    description:
      "High-end professional minimal smartwatch with a matte black finish and sleek silicon strap.",
    price: 249.99,
    imageUrl: images.smartwatch,
    category: "Electronics",
    stock: 24,
    popularity: 98,
  },
  {
    name: "Elite Series Headphones",
    description:
      "Premium wireless over-ear headphones with metallic frame and leather cushions.",
    price: 329.99,
    imageUrl: images.headphones,
    category: "Electronics",
    stock: 0,
    popularity: 87,
  },
  {
    name: "Essential Organic Tee",
    description:
      "Premium heavy-weight white cotton t-shirt with visible fabric weave and clean finish.",
    price: 45.0,
    imageUrl: images.tshirt,
    category: "Clothing",
    stock: 120,
    popularity: 76,
  },
  {
    name: "Studio Leather Tote",
    description:
      "Sophisticated genuine leather handbag in deep cognac brown with gold hardware.",
    price: 189.99,
    imageUrl: images.leatherTote,
    category: "Accessories",
    stock: 18,
    popularity: 82,
  },
  {
    name: "Velocity Run Shoes",
    description:
      "Minimalist black performance sneakers with sleek silhouette and clean white sole.",
    price: 120.0,
    imageUrl: images.sneakers,
    category: "Clothing",
    stock: 55,
    popularity: 91,
  },
  {
    name: "RetroFocus Film Camera",
    description:
      "Classic silver film camera with black leather grip and precision analog controls.",
    price: 599.0,
    imageUrl: images.filmCamera,
    category: "Electronics",
    stock: 8,
    popularity: 64,
  },
  {
    name: "Nordic Desk Lamp",
    description:
      "Adjustable matte white desk lamp with warm ambient lighting for modern workspaces.",
    price: 79.99,
    imageUrl: images.deskLamp,
    category: "Home & Living",
    stock: 34,
    popularity: 58,
  },
  {
    name: "Ceramic Pour-Over Set",
    description:
      "Handcrafted ceramic pour-over coffee set with minimalist silhouette and neutral glaze.",
    price: 64.5,
    imageUrl: images.pourOver,
    category: "Home & Living",
    stock: 41,
    popularity: 53,
  },
  {
    name: "Merino Wool Sweater",
    description:
      "Soft merino wool crew-neck sweater in heather grey for everyday layering.",
    price: 98.0,
    imageUrl: images.sweater,
    category: "Clothing",
    stock: 27,
    popularity: 69,
  },
  {
    name: "Slim Leather Wallet",
    description:
      "Compact bifold wallet in full-grain leather with RFID-blocking lining.",
    price: 54.0,
    imageUrl: images.wallet,
    category: "Accessories",
    stock: 63,
    popularity: 61,
  },
  {
    name: "Noise-Canceling Earbuds",
    description:
      "Compact true-wireless earbuds with adaptive noise cancellation and wireless charging case.",
    price: 179.99,
    imageUrl: images.earbuds,
    category: "Electronics",
    stock: 0,
    popularity: 95,
  },
  {
    name: "Linen Throw Blanket",
    description:
      "Breathable stonewashed linen throw in sand tone for sofas and bedrooms.",
    price: 89.0,
    imageUrl: images.blanket,
    category: "Home & Living",
    stock: 22,
    popularity: 47,
  },
  {
    name: "Carbon Fiber Sunglasses",
    description:
      "Featherweight polarized sunglasses with carbon fiber temples and UV400 lenses.",
    price: 149.0,
    imageUrl: images.sunglasses,
    category: "Accessories",
    stock: 15,
    popularity: 72,
  },
  {
    name: "4K Action Camera",
    description:
      "Rugged 4K action camera with stabilization and waterproof housing included.",
    price: 279.0,
    imageUrl: images.actionCamera,
    category: "Electronics",
    stock: 11,
    popularity: 80,
  },
  {
    name: "Relaxed Fit Chinos",
    description:
      "Tailored chinos in olive green with stretch cotton blend and clean tapered leg.",
    price: 72.0,
    imageUrl: images.chinos,
    category: "Clothing",
    stock: 48,
    popularity: 66,
  },
  {
    name: "Scented Soy Candle",
    description:
      "Hand-poured soy candle with cedar and bergamot notes in a reusable glass vessel.",
    price: 32.0,
    imageUrl: images.candle,
    category: "Home & Living",
    stock: 90,
    popularity: 44,
  },
  {
    name: "Travel Tech Organizer",
    description:
      "Foldable travel organizer with compartments for chargers, cables, and adapters.",
    price: 39.99,
    imageUrl: images.techOrganizer,
    category: "Accessories",
    stock: 74,
    popularity: 59,
  },
  {
    name: "Bluetooth Speaker Mini",
    description:
      "Pocket-sized Bluetooth speaker with 12-hour battery and IPX7 water resistance.",
    price: 59.99,
    imageUrl: images.speaker,
    category: "Electronics",
    stock: 36,
    popularity: 70,
  },
];
