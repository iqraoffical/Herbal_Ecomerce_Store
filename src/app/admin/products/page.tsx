'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Package, Edit, Trash, X, Search, Eye, EyeOff } from 'lucide-react';

interface Category {
  _id: string;
  name: string;
  slug: { current: string };
}

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  imageUrl?: string;
  price: number;
  originalPrice?: number;
  description: string;
  category?: { _id: string; name: string; slug: { current: string } };
  stockQuantity: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isAvailable?: boolean;
  benefits?: string[];
  ingredients?: string[];
  usage?: string;
  sku?: string;
  weight?: number;
  rating?: number;
  _createdAt: string;
}

const emptyProduct = {
  name: '',
  slug: '',
  price: 0,
  originalPrice: 0,
  description: '',
  category: '',
  stockQuantity: 0,
  isFeatured: false,
  isNewArrival: false,
  isAvailable: true,
  benefits: '',
  ingredients: '',
  usage: '',
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ ...emptyProduct });
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/categories'),
      ]);
      const productsData = await productsRes.json();
      setProducts(Array.isArray(productsData) ? productsData : []);
      setCategories(await categoriesRes.json());
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddForm = () => {
    setEditProduct(null);
    setForm({ ...emptyProduct });
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      slug: product.slug?.current || '',
      price: product.price,
      originalPrice: product.originalPrice || 0,
      description: product.description,
      category: product.category?._id || '',
      stockQuantity: product.stockQuantity,
      isFeatured: product.isFeatured || false,
      isNewArrival: product.isNewArrival || false,
      isAvailable: product.isAvailable !== false,
      benefits: product.benefits?.join('\n') || '',
      ingredients: product.ingredients?.join('\n') || '',
      usage: product.usage || '',
    });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const productData = {
        name: form.name,
        slug: { current: form.slug || form.name.toLowerCase().replace(/\s+/g, '-') },
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        description: form.description,
        category: { _type: 'reference', _ref: form.category },
        stockQuantity: Number(form.stockQuantity),
        isFeatured: form.isFeatured,
        isNewArrival: form.isNewArrival,
        isAvailable: form.isAvailable,
        benefits: form.benefits ? form.benefits.split('\n').filter(Boolean) : [],
        ingredients: form.ingredients ? form.ingredients.split('\n').filter(Boolean) : [],
        usage: form.usage || undefined,
      };

      if (editProduct) {
        const res = await fetch(`/api/admin/products/${editProduct._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.detail || result.error || 'Update failed');
      } else {
        const res = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.detail || result.error || 'Create failed');
      }

      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const toggleAvailability = async (product: Product) => {
    try {
      await fetch(`/api/admin/products/${product._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAvailable: !product.isAvailable }),
      });
      fetchData();
    } catch (error) {
      console.error('Toggle error:', error);
    }
  };

  const deleteProduct = async (product: Product) => {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    try {
      await fetch(`/api/admin/products/${product._id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-700" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <p className="text-gray-500 mt-1">{products.length} products total</p>
        </div>
        <button
          onClick={openAddForm}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add New Product
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No products found</p>
            <button onClick={openAddForm} className="mt-3 text-green-700 text-sm hover:underline">Add your first product</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-600 border-b">
                  <th className="text-left py-3 px-4 font-semibold">Product</th>
                  <th className="text-right py-3 px-4 font-semibold">Price</th>
                  <th className="text-center py-3 px-4 font-semibold hidden sm:table-cell">Stock</th>
                  <th className="text-left py-3 px-4 font-semibold hidden md:table-cell">Category</th>
                  <th className="text-center py-3 px-4 font-semibold hidden lg:table-cell">Status</th>
                  <th className="text-right py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-b from-green-50 to-white rounded-lg border flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <Image
                            src={product.imageUrl || '/Images/herbal_hair_oil.png'}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-contain p-1"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/Images/herbal_hair_oil.png'; }}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate max-w-[200px]">{product.name}</p>
                          <p className="text-xs text-gray-400">{product.slug?.current}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-900">Rs.{(product.price ?? 0).toLocaleString()}</td>
                    <td className="py-3 px-4 text-center hidden sm:table-cell">
                      <span className={`font-medium ${product.stockQuantity <= 5 ? 'text-red-600' : 'text-gray-900'}`}>
                        {product.stockQuantity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 hidden md:table-cell">{product.category?.name || '—'}</td>
                    <td className="py-3 px-4 text-center hidden lg:table-cell">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        product.isAvailable !== false
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {product.isAvailable !== false ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => toggleAvailability(product)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700"
                          title={product.isAvailable !== false ? 'Hide product' : 'Show product'}
                        >
                          {product.isAvailable !== false ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => openEditForm(product)}
                          className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600"
                          title="Edit product"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(product)}
                          className="p-1.5 hover:bg-red-50 rounded-lg text-red-600"
                          title="Delete product"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center overflow-y-auto py-10">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-lg font-bold text-gray-900">
                {editProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="Auto-generated from name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs.) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price (Rs.)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.originalPrice}
                    onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={form.stockQuantity}
                    onChange={(e) => setForm({ ...form, stockQuantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Benefits (one per line)</label>
                  <textarea
                    rows={3}
                    value={form.benefits}
                    onChange={(e) => setForm({ ...form, benefits: e.target.value })}
                    placeholder="Reduces hair fall&#10;Promotes growth&#10;Natural shine"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients (one per line)</label>
                  <textarea
                    rows={3}
                    value={form.ingredients}
                    onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
                    placeholder="Amla&#10;Bhringraj&#10;Coconut Oil"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Usage Instructions</label>
                  <textarea
                    rows={2}
                    value={form.usage}
                    onChange={(e) => setForm({ ...form, usage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isFeatured}
                      onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Featured</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isNewArrival}
                      onChange={(e) => setForm({ ...form, isNewArrival: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">New Arrival</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isAvailable}
                      onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Available</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2.5 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 disabled:opacity-60"
                >
                  {saving ? 'Saving...' : editProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
