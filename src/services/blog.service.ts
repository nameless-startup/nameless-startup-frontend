import { api } from "@/lib/api";
import {
  Blog,
  CreateBlogDto,
  UpdateBlogDto,
} from "@/types";
import { blogs } from "@/data/blogs";

export const blogService = {
  index: async (): Promise<Blog[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...blogs]), 400);
    });
  },

  show: async (id: string): Promise<Blog> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const blog = blogs.find((b) => b.id === id);
        if (blog) {
          resolve(blog);
        } else {
          reject(new Error("Blog not found"));
        }
      }, 400);
    });
  },

  create: async (dto: CreateBlogDto): Promise<Blog> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBlog: Blog = {
          ...dto,
          id: String(Date.now()),
        };
        resolve(newBlog);
      }, 500);
    });
  },

  update: async (id: string, dto: UpdateBlogDto): Promise<Blog> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = blogs.findIndex((b) => b.id === id);
        if (index === -1) {
          reject(new Error("Blog not found"));
          return;
        }
        const updated: Blog = { ...blogs[index], ...dto };
        resolve(updated);
      }, 500);
    });
  },

  destroy: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exists = blogs.some((b) => b.id === id);
        if (exists) {
          resolve();
        } else {
          reject(new Error("Blog not found"));
        }
      }, 400);
    });
  },
};