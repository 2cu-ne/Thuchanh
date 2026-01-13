const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  status: string;
  createdAt: string;
}

export interface CreateProductInput {
  name: string;
  price: number;
  description?: string;
  status?: string;
}

export interface UpdateProductInput {
  name?: string;
  price?: number;
  description?: string;
  status?: string;
}

// GET all products
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// GET product by ID
export async function getProduct(id: string): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

// CREATE product
export async function createProduct(data: CreateProductInput): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create product');
    }
    return response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

// UPDATE product
export async function updateProduct(
  id: string,
  data: UpdateProductInput
): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

// DELETE product
export async function deleteProduct(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}
