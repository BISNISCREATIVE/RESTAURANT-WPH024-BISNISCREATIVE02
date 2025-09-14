import type { RequestHandler } from "express";
import { promises as fs } from "fs";
import path from "path";

const DB_PATH = path.join(import.meta.dirname, "../data/dummy.json");

type Category = { id: number; name: string; slug: string };
interface Restaurant {
  id: number;
  name: string;
  city?: string | null;
  rating?: number | null;
  images?: string[];
  categories?: number[]; // category ids
}

async function ensureDb() {
  try {
    await fs.access(DB_PATH);
  } catch {
    const initial = {
      categories: [
        { id: 1, name: "Nearby", slug: "nearby" },
        { id: 2, name: "Discount", slug: "discount" },
        { id: 3, name: "Best Seller", slug: "best-seller" },
        { id: 4, name: "Delivery", slug: "delivery" },
        { id: 5, name: "Lunch", slug: "lunch" }
      ],
      restaurants: [
        {
          id: 1,
          name: "Burger King",
          city: "Jakarta Selatan",
          rating: 4.9,
          images: [
            "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800&auto=format&fit=crop"
          ],
          categories: [1, 3]
        }
      ]
    };
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(initial, null, 2), "utf-8");
  }
}

async function readDb() {
  await ensureDb();
  const raw = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(raw) as { categories: Category[]; restaurants: Restaurant[] };
}

async function writeDb(data: { categories: Category[]; restaurants: Restaurant[] }) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export const listCategories: RequestHandler = async (_req, res) => {
  const db = await readDb();
  res.json({ success: true, data: db.categories });
};

export const createCategory: RequestHandler = async (req, res) => {
  const db = await readDb();
  const { name, slug } = req.body || {};
  const id = (db.categories.at(-1)?.id || 0) + 1;
  const cat: Category = { id, name, slug: slug || String(name).toLowerCase().replace(/\s+/g, "-") };
  db.categories.push(cat);
  await writeDb(db);
  res.status(201).json({ success: true, data: cat });
};

export const updateCategory: RequestHandler = async (req, res) => {
  const db = await readDb();
  const id = Number(req.params.id);
  const idx = db.categories.findIndex((c) => c.id === id);
  if (idx === -1) return res.status(404).json({ success: false, message: "Not found" });
  db.categories[idx] = { ...db.categories[idx], ...req.body };
  await writeDb(db);
  res.json({ success: true, data: db.categories[idx] });
};

export const deleteCategory: RequestHandler = async (req, res) => {
  const db = await readDb();
  const id = Number(req.params.id);
  db.categories = db.categories.filter((c) => c.id !== id);
  await writeDb(db);
  res.json({ success: true });
};

export const listRestaurants: RequestHandler = async (_req, res) => {
  const db = await readDb();
  res.json({ success: true, data: db.restaurants });
};

export const createRestaurant: RequestHandler = async (req, res) => {
  const db = await readDb();
  const id = (db.restaurants.at(-1)?.id || 0) + 1;
  const r: Restaurant = { id, ...req.body };
  db.restaurants.push(r);
  await writeDb(db);
  res.status(201).json({ success: true, data: r });
};

export const updateRestaurant: RequestHandler = async (req, res) => {
  const db = await readDb();
  const id = Number(req.params.id);
  const idx = db.restaurants.findIndex((r) => r.id === id);
  if (idx === -1) return res.status(404).json({ success: false, message: "Not found" });
  db.restaurants[idx] = { ...db.restaurants[idx], ...req.body };
  await writeDb(db);
  res.json({ success: true, data: db.restaurants[idx] });
};

export const deleteRestaurant: RequestHandler = async (req, res) => {
  const db = await readDb();
  const id = Number(req.params.id);
  db.restaurants = db.restaurants.filter((r) => r.id !== id);
  await writeDb(db);
  res.json({ success: true });
};
