import { Product, CreateProductDto, UpdateProductDto } from "@/types";
import { products } from "@/data/products";

export const productService = {
  index: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...products]), 400);
    });
  },

  show: async (id: string): Promise<Product> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = products.find((p) => p.id === id);
        if (product) {
          resolve(product);
        } else {
          reject(new Error("Product not found"));
        }
      }, 400);
    });
  },

  create: async (dto: CreateProductDto): Promise<Product> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct: Product = {
          ...dto,
          id: String(Date.now()),
        };
        resolve(newProduct);
      }, 500);
    });
  },

  update: async (id: string, dto: UpdateProductDto): Promise<Product> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = products.findIndex((p) => p.id === id);
        if (index === -1) {
          reject(new Error("Product not found"));
          return;
        }
        const updated: Product = { ...products[index], ...dto };
        resolve(updated);
      }, 500);
    });
  },

  destroy: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exists = products.some((p) => p.id === id);
        if (exists) {
          resolve();
        } else {
          reject(new Error("Product not found"));
        }
      }, 400);
    });
  },
};