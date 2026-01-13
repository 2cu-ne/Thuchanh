'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Product, getProduct } from '@/lib/api';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProduct(id);
      setProduct(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-100 text-red-800 p-6 rounded-lg mb-6">
            <p>Lỗi: {error}</p>
            <Link href="/">
              <button className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Quay Về
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600 mb-4">Sản phẩm không tồn tại</p>
            <Link href="/">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
                Quay Về
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Chi Tiết Sản Phẩm</h1>
          <Link href="/">
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              ← Quay Về
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <div className="mb-6">
            <h2 className="text-gray-600 text-sm uppercase font-semibold mb-2">Tên Sản Phẩm</h2>
            <p className="text-2xl font-bold text-gray-900">{product.name}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-gray-600 text-sm uppercase font-semibold mb-2">Giá</h3>
              <p className="text-xl font-bold text-gray-900">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(product.price)}
              </p>
            </div>

            <div>
              <h3 className="text-gray-600 text-sm uppercase font-semibold mb-2">Trạng Thái</h3>
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                  product.status === 'ACTIVE'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {product.status}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-gray-600 text-sm uppercase font-semibold mb-2">Mô Tả</h3>
            <p className="text-gray-700">{product.description || 'Không có mô tả'}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-gray-600 text-sm uppercase font-semibold mb-2">Ngày Tạo</h3>
            <p className="text-gray-700">{new Date(product.createdAt).toLocaleString('vi-VN')}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-gray-600 text-sm uppercase font-semibold mb-2">ID</h3>
            <p className="text-gray-700 font-mono text-sm">{product.id}</p>
          </div>

          <div className="flex gap-4">
            <Link href={`/products/${product.id}/edit`}>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded">
                Chỉnh Sửa
              </button>
            </Link>
            <Link href="/">
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded">
                Quay Về
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
