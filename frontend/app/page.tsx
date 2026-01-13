'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product, getProducts, deleteProduct } from '@/lib/api';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      setMessage({ type: 'success', text: 'Sản phẩm đã xóa thành công!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to delete product',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Quản Lý Sản Phẩm</h1>
          <Link href="/products/create">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
              + Tạo Mới
            </button>
          </Link>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Đang tải dữ liệu...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
            <p>Lỗi: {error}</p>
            <button
              onClick={loadProducts}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Products List */}
        {!loading && !error && (
          <div>
            {products.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <p className="text-gray-600 mb-4">Chưa có sản phẩm nào</p>
                <Link href="/products/create">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
                    Tạo sản phẩm đầu tiên
                  </button>
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-gray-900 font-bold">Tên Sản Phẩm</th>
                      <th className="px-6 py-3 text-left text-gray-900 font-bold">Giá</th>
                      <th className="px-6 py-3 text-left text-gray-900 font-bold">Mô Tả</th>
                      <th className="px-6 py-3 text-left text-gray-900 font-bold">Trạng Thái</th>
                      <th className="px-6 py-3 text-center text-gray-900 font-bold">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-900">{product.name}</td>
                        <td className="px-6 py-4 text-gray-900">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(product.price)}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{product.description || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              product.status === 'ACTIVE'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Link href={`/products/${product.id}`}>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded mr-2">
                              Xem
                            </button>
                          </Link>
                          <Link href={`/products/${product.id}/edit`}>
                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2">
                              Sửa
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
