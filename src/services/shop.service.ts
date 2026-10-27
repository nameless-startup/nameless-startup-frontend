import { Shop, CreateShopDto, UpdateShopDto } from "@/types";
import { shops } from "@/data/shops";

export const shopService = {
  index: async (): Promise<Shop[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...shops]), 400);
    });
  },

  show: async (id: string): Promise<Shop> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shop = shops.find((s) => s.id === id);
        if (shop) {
          resolve(shop);
        } else {
          reject(new Error("Shop not found"));
        }
      }, 400);
    });
  },

  create: async (dto: CreateShopDto): Promise<Shop> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newShop: Shop = {
          ...dto,
          id: String(Date.now()),
        };
        resolve(newShop);
      }, 500);
    });
  },

  update: async (id: string, dto: UpdateShopDto): Promise<Shop> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = shops.findIndex((s) => s.id === id);
        if (index === -1) {
          reject(new Error("Shop not found"));
          return;
        }
        const updated: Shop = { ...shops[index], ...dto };
        resolve(updated);
      }, 500);
    });
  },

  destroy: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exists = shops.some((s) => s.id === id);
        if (exists) {
          resolve();
        } else {
          reject(new Error("Shop not found"));
        }
      }, 400);
    });
  },
};