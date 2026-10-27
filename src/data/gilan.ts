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