'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getProduct, updateProduct, UpdateProductInput } from '@/lib/api';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState<UpdateProductInput>({
    name: '',
    price: 0,
    description: '',
    status: 'ACTIVE',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProduct(id);
      setFormData({
        name: data.name,
        price: data.price,
        description: data.description,
        status: data.status,
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await updateProduct(id, formData);
      router.push(`/products/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Chỉnh Sửa Sản Phẩm</h1>
          <Link href={`/products/${id}`}>
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              ← Quay Về
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          {error && (
            <div className="mb-6 bg-red-100 text-red-800 p-4 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Tên Sản Phẩm *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
                placeholder="Nhập tên sản phẩm"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Giá *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
                placeholder="Nhập giá sản phẩm"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Mô Tả
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
                placeholder="Nhập mô tả sản phẩm (tùy chọn)"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Trạng Thái
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-3 rounded-lg"
              >
                {submitting ? 'Đang Cập Nhật...' : 'Cập Nhật Sản Phẩm'}
              </button>
              <Link href={`/products/${id}`} className="flex-1">
                <button
                  type="button"
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg"
                >
                  Hủy
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
