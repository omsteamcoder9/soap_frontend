import { fetchActiveCategories } from '@/lib/categoryService';
import { getAllProducts } from '@/lib/productService'; // Add this import
import HeaderClient from './HeaderClient';

interface Category {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
}

export default async function HeaderWrapper() {
  let categories: Category[] = [];
  
  try {
    // Fetch all active categories
    const allCategories = await fetchActiveCategories();
    
    // Filter categories that have products
    const categoriesWithProducts: Category[] = [];
    
    for (const category of allCategories) {
      const response = await getAllProducts({ category: category._id });
      if (response.data && response.data.length > 0) {
        categoriesWithProducts.push(category);
      }
    }
    
    categories = categoriesWithProducts;
  } catch (error) {
    console.error('Error loading categories:', error);
  }
  
  return <HeaderClient initialCategories={categories} />;
}