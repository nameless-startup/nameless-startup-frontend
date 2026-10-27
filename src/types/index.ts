export interface Place {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  location: string;
  rating: number;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  location: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  role: "admin" | "user";
  avatar?: string;
}

export interface LoginDto {
  phone: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface OtpRequestDto {
  phone: string;
}

export interface OtpVerifyDto {
  phone: string;
  code: string;
}

export interface OtpResponse {
  message: string;
  code?: string;
}

export interface OtpVerifyResponse {
  verified: boolean;
  message: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface CreateBlogDto {
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

export interface UpdateBlogDto {
  title?: string;
  excerpt?: string;
  image?: string;
  author?: string;
  date?: string;
  readTime?: string;
  category?: string;
}

export interface CreatePlaceDto {
  name: string;
  description: string;
  image: string;
  category: string;
  location: string;
  rating: number;
}

export interface UpdatePlaceDto {
  name?: string;
  description?: string;
  image?: string;
  category?: string;
  location?: string;
  rating?: number;
}

export interface CreateProductDto {
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  category?: string;
}

export interface CreateShopDto {
  name: string;
  description: string;
  image: string;
  category: string;
  location: string;
}

export interface UpdateShopDto {
  name?: string;
  description?: string;
  image?: string;
  category?: string;
  location?: string;
}