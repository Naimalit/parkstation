import { promises as fs } from "fs";
import path from "path";
import { list, put } from "@vercel/blob";

export type TableCapacity = 2 | 4 | 6;

export interface Table {
  id: number;
  number: number;
  capacity: TableCapacity;
  active: boolean;
}

export interface MenuCategory {
  id: string;
  name_sq: string;
  name_mk: string;
  name_en: string;
  sort_order: number;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name_sq: string;
  name_mk: string;
  name_en: string;
  price: number;
  price_large?: number;
  is_mixer?: boolean;
  active: boolean;
}

export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export interface TableReservation {
  id: string;
  table_id: number;
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  notes?: string;
  status: ReservationStatus;
  created_at: string;
}

export interface VenueReservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  event_type: string;
  notes?: string;
  status: ReservationStatus;
  created_at: string;
}

export interface Store {
  tables: Table[];
  categories: MenuCategory[];
  menuItems: MenuItem[];
  tableReservations: TableReservation[];
  venueReservations: VenueReservation[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "store.json");
const BLOB_PATHNAME = "data/store.json";

export const defaultStore: Store = {
  tables: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    number: i + 1,
    capacity: ([2, 4, 4, 6, 4, 2, 6, 4, 2, 4] as TableCapacity[])[i],
    active: true,
  })),
  categories: [
    {
      id: "drinks",
      name_sq: "DRINKS & MORE",
      name_mk: "ПИЈАЛОЦИ & ПОВЕЌЕ",
      name_en: "DRINKS & MORE",
      sort_order: 1,
    },
    {
      id: "mixers",
      name_sq: "Pijet për cocktail",
      name_mk: "Пијалоци за коктел",
      name_en: "Cocktail mixers",
      sort_order: 2,
    },
    {
      id: "treats",
      name_sq: "TREATS & EATS",
      name_mk: "СЛАДКИ & ЗАКUSKI",
      name_en: "TREATS & EATS",
      sort_order: 3,
    },
  ],
  menuItems: [
    {
      id: "ice-coffee",
      category_id: "drinks",
      name_sq: "Ice Coffee",
      name_mk: "Ice Coffee",
      name_en: "Ice Coffee",
      price: 100,
      active: true,
    },
    {
      id: "kafe-turke",
      category_id: "drinks",
      name_sq: "Kafe Turke",
      name_mk: "Турско кафе",
      name_en: "Turkish Coffee",
      price: 50,
      active: true,
    },
    {
      id: "caj",
      category_id: "drinks",
      name_sq: "Çaj",
      name_mk: "Чај",
      name_en: "Tea",
      price: 50,
      active: true,
    },
    {
      id: "cocktails",
      category_id: "drinks",
      name_sq: "Cocktails",
      name_mk: "Коктели",
      name_en: "Cocktails",
      price: 150,
      active: true,
    },
    ...["Ujë", "Coca Cola", "Golden Eagle", "Sprite", "Fanta", "Schweppes"].map(
      (name, i) => ({
        id: `mixer-${i}`,
        category_id: "mixers",
        name_sq: name,
        name_mk: name,
        name_en: name,
        price: 0,
        is_mixer: true,
        active: true,
      })
    ),
    {
      id: "slushie",
      category_id: "treats",
      name_sq: "Slushie",
      name_mk: "Slushie",
      name_en: "Slushie",
      price: 50,
      price_large: 80,
      active: true,
    },
    {
      id: "limonade",
      category_id: "treats",
      name_sq: "Limonadë",
      name_mk: "Лимонада",
      name_en: "Lemonade",
      price: 30,
      price_large: 50,
      active: true,
    },
    {
      id: "fruta-mali",
      category_id: "treats",
      name_sq: "Fruta mali",
      name_mk: "Шумски плодови",
      name_en: "Forest fruits",
      price: 30,
      price_large: 50,
      active: true,
    },
    {
      id: "akullore",
      category_id: "treats",
      name_sq: "Akullore",
      name_mk: "Сладолед",
      name_en: "Ice cream",
      price: 50,
      price_large: 60,
      active: true,
    },
    {
      id: "mini-pancakes",
      category_id: "treats",
      name_sq: "Mini pancakes",
      name_mk: "Mini pancakes",
      name_en: "Mini pancakes",
      price: 70,
      price_large: 200,
      active: true,
    },
  ],
  tableReservations: [],
  venueReservations: [],
};

function useBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readStoreFromBlob(): Promise<Store | null> {
  if (!useBlobStorage()) return null;

  try {
    const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 1 });
    const blob = blobs.find((item) => item.pathname === BLOB_PATHNAME);
    if (!blob) return null;

    const response = await fetch(blob.url, { cache: "no-store" });
    if (!response.ok) return null;
    return (await response.json()) as Store;
  } catch {
    return null;
  }
}

async function writeStoreToBlob(store: Store): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(store, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

async function ensureLocalStore(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.writeFile(STORE_PATH, JSON.stringify(defaultStore, null, 2), "utf-8");
  }
}

async function readStoreFromFile(): Promise<Store> {
  await ensureLocalStore();
  const raw = await fs.readFile(STORE_PATH, "utf-8");
  return JSON.parse(raw) as Store;
}

async function writeStoreToFile(store: Store): Promise<void> {
  await ensureLocalStore();
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
}

async function getSeedStore(): Promise<Store> {
  try {
    return await readStoreFromFile();
  } catch {
    return defaultStore;
  }
}

export async function readStore(): Promise<Store> {
  if (useBlobStorage()) {
    const blobStore = await readStoreFromBlob();
    if (blobStore) return blobStore;

    const seed = await getSeedStore();
    await writeStoreToBlob(seed);
    return seed;
  }

  return readStoreFromFile();
}

export async function writeStore(store: Store): Promise<void> {
  if (useBlobStorage()) {
    await writeStoreToBlob(store);
    return;
  }

  await writeStoreToFile(store);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
