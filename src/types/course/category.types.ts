// src/types/admin/category.types.ts

export interface Category {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  loading: boolean;
  error: string | null;
}

export interface CategoryContextProps extends CategoryState {
  fetchCategories: () => Promise<void>;
  fetchCategoryById: (id: string) => Promise<void>;
  createCategory: (data: { name: string }) => Promise<void>;
  updateCategory: (id: string, data: { name: string }) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}
