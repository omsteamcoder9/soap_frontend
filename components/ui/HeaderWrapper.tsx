import { fetchActiveCategories } from '@/lib/categoryService';
import HeaderClient from './HeaderClient';

interface Category {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
}

export default async function HeaderWrapper() {
  let categories: Category[] = []; // ADD TYPE HERE
  try {
    categories = await fetchActiveCategories();
  } catch (error) {
    console.error('Error loading categories:', error);
  }
  
  return <HeaderClient initialCategories={categories} />;
}