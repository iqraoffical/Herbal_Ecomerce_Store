'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Eye, ShoppingBag, MessageCircle, Trash } from 'lucide-react';
import { getWhatsAppUrl, getOrderStatusMessage } from '@/lib/whatsapp';

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  items: { quantity: number; productName?: string }[];
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
}

const statuses = ['all', 'pending', 'confirmed', 'dispatched', 'shipped', 'delivered', 'cancelled'];

const statusBadge = (status: string) => {
  const styles: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
    dispatched: 'bg-orange-100 text-orange-800 border-orange-200',
    shipped: 'bg-purple-100 text-purple-800 border-purple-200',
    delivered: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  };
  return styles[status] || 'bg-gray-100 text-gray-800';
};

const paymentBadge = (status: string) => {
  const styles: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    paid: 'bg-green-100 text-green-800 border-green-200',
    received: 'bg-green-100 text-green-800 border-green-200',
    refunded: 'bg-gray-100 text-gray-600 border-gray-200',
  };
  return styles[status] || 'bg-gray-100 text-gray-800';
};

const contactOnWhatsApp = (phone: string, customerName: string) => {
  const msg = getOrderStatusMessage({
    orderNumber: '',
    customerName,
    orderStatus: 'confirmed',
  });
  window.open(getWhatsAppUrl(`Hi ${customerName}! ${msg}`), '_blank');
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (searchTerm) params.set('search', searchTerm);

      const res = await fetch(`/api/admin/orders?${params}`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Fetch orders error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders();
  };

  const getItemCount = (items: { quantity: number }[]) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const deleteOrder = async (order: Order) => {
    if (!confirm(`Delete order "${order.orderNumber}" by ${order.customerName}? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/orders/${order._id}/status`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      fetchOrders();
    } catch (error) {
      alert('Failed to delete order');
      console.error('Delete order error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
        <p className="text-gray-500 mt-1">Manage and track all customer orders</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Status Filter */}
          <div className="flex gap-2 flex-wrap">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  statusFilter === s
                    ? 'bg-green-700 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search order # or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700" />
          </div>
        ) : orders.length === 0 ? (
          <div className="py-16 text-center">
            <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No orders found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-600 border-b">
                  <th className="text-left py-3.5 px-4 font-semibold">Order #</th>
                  <th className="text-left py-3.5 px-4 font-semibold">Customer</th>
                  <th className="text-left py-3.5 px-4 font-semibold hidden md:table-cell">Phone</th>
                  <th className="text-center py-3.5 px-4 font-semibold hidden sm:table-cell">Items</th>
                  <th className="text-right py-3.5 px-4 font-semibold">Total</th>
                  <th className="text-center py-3.5 px-4 font-semibold">Delivery</th>
                  <th className="text-center py-3.5 px-4 font-semibold">Payment</th>
                  <th className="text-center py-3.5 px-4 font-semibold hidden lg:table-cell">Date</th>
                  <th className="text-center py-3.5 px-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-green-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-gray-900">{order.orderNumber}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-xs text-gray-400">{order.customerEmail || order.customerPhone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 hidden md:table-cell">{order.customerPhone}</td>
                    <td className="py-3.5 px-4 text-center hidden sm:table-cell">{getItemCount(order.items)}</td>
                    <td className="py-3.5 px-4 text-right font-semibold text-gray-900">
                      Rs.{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${statusBadge(order.orderStatus)}`}>
                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${paymentBadge(order.paymentStatus)}`}>
                        {order.paymentStatus === 'paid' || order.paymentStatus === 'received' ? '✅ ' : '⏳ '}
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 hidden lg:table-cell whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString('en-PK', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap items-center justify-center gap-1">
                        <button
                          onClick={() => contactOnWhatsApp(order.customerPhone, order.customerName)}
                          className="inline-flex items-center justify-center w-7 h-7 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex-shrink-0"
                          title={`WhatsApp ${order.customerName}`}
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                        </button>
                        <Link
                          href={`/admin/orders/${order._id}`}
                          className="inline-flex items-center gap-1 px-2 py-1.5 bg-green-700 text-white rounded-lg text-xs font-medium hover:bg-green-800 transition-colors flex-shrink-0"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </Link>
                        <button
                          onClick={() => deleteOrder(order)}
                          className="inline-flex items-center justify-center w-7 h-7 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex-shrink-0"
                          title={`Delete ${order.orderNumber}`}
                        >
                          <Trash className="h-3.5 w-3.5" />
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
    </div>
  );
}
