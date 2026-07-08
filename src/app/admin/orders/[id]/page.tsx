'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Printer, PackageCheck, Clock, CheckCircle2, XCircle, MessageCircle, Trash } from 'lucide-react';
import { getWhatsAppUrl, getNewOrderMessage } from '@/lib/whatsapp';

interface OrderItem {
  product?: { _id: string; name: string; imageUrl?: string; slug?: { current: string } };
  productName?: string;
  productImage?: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  items: OrderItem[];
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  trackingId?: string;
  notes?: string;
  createdAt: string;
}

const statusFlow = ['pending', 'confirmed', 'dispatched', 'shipped', 'delivered'];

const statusTimeline = [
  { key: 'pending', label: 'Pending', icon: Clock },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle2 },
  { key: 'dispatched', label: 'Dispatched', icon: PackageCheck },
  { key: 'shipped', label: 'Shipped', icon: PackageCheck },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle2 },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
  dispatched: 'bg-orange-100 text-orange-800 border-orange-200',
  shipped: 'bg-purple-100 text-purple-800 border-purple-200',
  delivered: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [newPaymentStatus, setNewPaymentStatus] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/admin/orders/${id}`);
        if (!res.ok) throw new Error('Order not found');
        const data = await res.json();
        setOrder(data);
        setNewStatus(data.orderStatus);
        setNewPaymentStatus(data.paymentStatus);
        setTrackingId(data.trackingId || '');
        setAdminNotes(data.notes || '');
      } catch (error) {
        console.error('Fetch order error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  const handleStatusUpdate = async () => {
    if (!order || newStatus === order.orderStatus) return;
    setUpdating(true);
    try {
      const body: Record<string, string> = { orderStatus: newStatus, trackingId, notes: adminNotes };
      if (newPaymentStatus) body.paymentStatus = newPaymentStatus;
      const res = await fetch(`/api/admin/orders/${order._id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed');
      setOrder((prev) => prev ? { ...prev, orderStatus: newStatus, paymentStatus: newPaymentStatus || prev.paymentStatus, trackingId, notes: adminNotes } : prev);
      setSuccessMsg(`Order status updated to "${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}"`);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error('Status update error:', error);
      alert(error instanceof Error ? error.message : 'Failed to update order');
    } finally {
      setUpdating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const currentStepIndex = statusTimeline.findIndex((s) => s.key === order?.orderStatus);
  const isCancelled = order?.orderStatus === 'cancelled';
  const statusIndex = statusFlow.indexOf(order?.orderStatus || '');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-700" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900">Order Not Found</h2>
        <p className="text-gray-500 mt-2">The order you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/admin/orders" className="mt-4 inline-flex items-center text-green-700 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/admin/orders" className="inline-flex items-center text-sm text-gray-500 hover:text-green-700 mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Orders
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Order {order.orderNumber}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={async () => {
              if (!confirm(`Delete order "${order.orderNumber}"? This cannot be undone.`)) return;
              try {
                const res = await fetch(`/api/admin/orders/${order._id}/status`, { method: 'DELETE' });
                if (!res.ok) throw new Error('Delete failed');
                router.push('/admin/orders');
              } catch {
                alert('Failed to delete order');
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-red-300 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
          >
            <Trash className="h-4 w-4" /> Delete
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Printer className="h-4 w-4" /> Print Order
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
          {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Customer & Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
              <button
                onClick={() => {
                  const msg = getNewOrderMessage({
                    customerName: order.customerName,
                    customerPhone: order.customerPhone,
                    city: order.shippingAddress?.city || '',
                    address: order.shippingAddress?.street || '',
                    items: order.items.map(i => ({
                      name: i.productName || i.product?.name || 'Product',
                      quantity: i.quantity,
                      price: i.price,
                    })),
                    totalAmount: order.totalAmount,
                  });
                  window.open(getWhatsAppUrl(msg), '_blank');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Send Order to WhatsApp
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider">Name</label>
                <p className="text-gray-900 font-medium mt-1">{order.customerName}</p>
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider">Phone</label>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-gray-900 font-medium">{order.customerPhone}</p>
                  <button
                    onClick={() => window.open(getWhatsAppUrl(`Hi ${order.customerName}!`), '_blank')}
                    className="text-green-600 hover:text-green-700"
                    title={`WhatsApp ${order.customerName}`}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {order.customerEmail && (
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider">Email</label>
                  <p className="text-gray-900 mt-1">{order.customerEmail}</p>
                </div>
              )}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider">Order Date</label>
                <p className="text-gray-900 mt-1">
                  {new Date(order.createdAt).toLocaleDateString('en-PK', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Shipping Address</label>
              <p className="text-gray-900 mt-1">
                {order.shippingAddress?.street || 'N/A'}
                {order.shippingAddress?.city && `, ${order.shippingAddress.city}`}
                {order.shippingAddress?.state && `, ${order.shippingAddress.state}`}
                {order.shippingAddress?.zipCode && ` - ${order.shippingAddress.zipCode}`}
                {order.shippingAddress?.country && `, ${order.shippingAddress.country}`}
              </p>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ordered Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-white rounded-lg border flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src={item.productImage || item.product?.imageUrl || '/Images/herbal_hair_oil.png'}
                      alt={item.productName || item.product?.name || 'Product'}
                      className="w-full h-full object-contain p-1"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/Images/herbal_hair_oil.png'; }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item.productName || item.product?.name || 'Product'}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity} × Rs.{item.price.toLocaleString()}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-gray-900">Rs.{(item.quantity * item.price).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
              <span className="font-semibold text-gray-900">Total Amount</span>
              <span className="text-xl font-bold text-green-700">Rs.{order.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right Column - Status & Timeline */}
        <div className="space-y-6">
          {/* Status Update */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h3>
            <div className="flex gap-2 flex-wrap mb-4">
              <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium border ${statusColors[order.orderStatus] || ''}`}>
                {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
              </span>
              <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-medium border ${statusColors[order.paymentStatus] || 'bg-gray-100 text-gray-800'}`}>
                {order.paymentStatus === 'paid' || order.paymentStatus === 'received' ? '✅ ' : '⏳ '}
                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {statusFlow.map((s) => {
                    const disabled = order.orderStatus === 'cancelled' || order.orderStatus === 'delivered';
                    const isPast = statusFlow.indexOf(s) <= statusIndex && s !== order.orderStatus;
                    return (
                      <option key={s} value={s} disabled={disabled && s !== newStatus}>
                        {s.charAt(0).toUpperCase() + s.slice(1)} {isPast ? '(Completed)' : ''}
                      </option>
                    );
                  })}
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                <select
                  value={newPaymentStatus}
                  onChange={(e) => setNewPaymentStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="pending">⏳ Pending</option>
                  <option value="paid">💳 Paid</option>
                  <option value="received">✅ Received</option>
                  <option value="refunded">↩️ Refunded</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tracking ID</label>
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter tracking number..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes</label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                  placeholder="Internal notes..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                onClick={handleStatusUpdate}
                disabled={updating || newStatus === order.orderStatus}
                className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm"
              >
                {updating ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-0">
              {isCancelled ? (
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 border-2 border-red-500 flex items-center justify-center">
                    <XCircle className="h-4 w-4 text-red-500" />
                  </div>
                  <div className="flex-1 pb-6">
                    <p className="font-medium text-red-600">Order Cancelled</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              ) : (
                statusTimeline.map((step, index) => {
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  const isUpcoming = index > currentStepIndex;
                  const Icon = step.icon;

                  return (
                    <div key={step.key} className="flex items-start gap-3 relative">
                      {/* Connector Line */}
                      {index < statusTimeline.length - 1 && (
                        <div className={`absolute left-4 top-8 w-0.5 h-10 -translate-x-1/2 ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-200'
                        }`} />
                      )}

                      {/* Icon */}
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 ${
                        isCompleted
                          ? 'bg-green-100 border-green-500'
                          : isUpcoming
                          ? 'bg-gray-100 border-gray-300'
                          : 'bg-blue-100 border-blue-500'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <Icon className={`h-4 w-4 ${isCurrent ? 'text-blue-500' : 'text-gray-400'}`} />
                        )}
                      </div>

                      {/* Content */}
                      <div className={`flex-1 pb-8 ${isUpcoming ? 'opacity-40' : ''}`}>
                        <p className={`font-medium text-sm ${isCurrent ? 'text-green-700 font-semibold' : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                          {step.label}
                          {isCurrent && ' (Current)'}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
