'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ShoppingBag, Clock, Wallet, Package, ArrowUp, Eye, ChevronDown, Calendar } from 'lucide-react';

interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  totalProducts: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  orderStatus: string;
  items: { quantity: number }[];
  createdAt: string;
}

type RangeKey = 'today' | 'week' | 'month' | 'year' | 'all' | 'custom';

const RANGE_OPTIONS: { key: RangeKey; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'week', label: 'This Week' },
  { key: 'month', label: 'This Month' },
  { key: 'year', label: 'This Year' },
  { key: 'all', label: 'All Time' },
  { key: 'custom', label: 'Custom Range' },
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function getDateRange(key: RangeKey, customStart?: string, customEnd?: string): { start: string; end: string } | null {
  if (key === 'all') return null;

  const now = new Date();

  if (key === 'custom') {
    if (!customStart || !customEnd) return null;
    return {
      start: new Date(customStart).toISOString(),
      end: new Date(customEnd + 'T23:59:59').toISOString(),
    };
  }

  let start: Date;
  const end = new Date();

  switch (key) {
    case 'today': {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    }
    case 'week': {
      const day = now.getDay();
      const diff = day === 0 ? 6 : day - 1; // Monday start
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - diff);
      break;
    }
    case 'month': {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    case 'year': {
      start = new Date(now.getFullYear(), 0, 1);
      break;
    }
    default:
      return null;
  }

  return { start: start.toISOString(), end: end.toISOString() };
}

function getRangeLabel(key: RangeKey, customStart?: string, customEnd?: string): string {
  if (key === 'all') return 'All Time';
  if (key === 'custom') {
    if (customStart && customEnd) {
      return `${customStart} – ${customEnd}`;
    }
    return 'Custom Range';
  }
  const now = new Date();
  if (key === 'month') return `${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}`;
  if (key === 'year') return `${now.getFullYear()}`;
  return RANGE_OPTIONS.find(r => r.key === key)?.label || 'This Month';
}

const statusBadge = (status: string) => {
  const styles: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
    dispatched: 'bg-orange-100 text-orange-800 border-orange-200',
    shipped: 'bg-purple-100 text-purple-800 border-purple-200',
    delivered: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  };
  return styles[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};

function DropdownFilter({
  currentKey,
  onSelect,
  customStart,
  customEnd,
  onCustomStartChange,
  onCustomEndChange,
}: {
  currentKey: RangeKey;
  onSelect: (key: RangeKey) => void;
  customStart: string;
  customEnd: string;
  onCustomStartChange: (v: string) => void;
  onCustomEndChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentLabel = getRangeLabel(currentKey, customStart, customEnd);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-xs text-gray-400 font-medium hover:text-gray-600 transition-colors cursor-pointer"
      >
        <span className="max-w-[100px] truncate">{currentLabel}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 z-50 min-w-[160px] bg-white border border-gray-200 rounded-lg shadow-lg py-1">
          {RANGE_OPTIONS.map((opt) => {
            if (opt.key === 'custom') {
              return (
                <div key="custom">
                  <button
                    onClick={() => { onSelect('custom'); setOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                      currentKey === 'custom'
                        ? 'bg-green-50 text-green-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                  {/* Inline custom date inputs */}
                  <div className="px-3 pb-2 pt-1 space-y-1.5 border-t border-gray-100 mt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <input
                        type="date"
                        value={customStart}
                        onChange={(e) => onCustomStartChange(e.target.value)}
                        className="w-full text-[11px] border border-gray-200 rounded px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-green-400"
                        placeholder="Start"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <input
                        type="date"
                        value={customEnd}
                        onChange={(e) => onCustomEndChange(e.target.value)}
                        className="w-full text-[11px] border border-gray-200 rounded px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-green-400"
                        placeholder="End"
                      />
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <button
                key={opt.key}
                onClick={() => { onSelect(opt.key); setOpen(false); }}
                className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                  currentKey === opt.key
                    ? 'bg-green-50 text-green-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({ totalOrders: 0, pendingOrders: 0, totalRevenue: 0, totalProducts: 0 });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [cardLoading, setCardLoading] = useState(false);

  // Per-card filter state
  const [rangeKeys, setRangeKeys] = useState<Record<string, RangeKey>>({
    totalOrders: 'month',
    pendingOrders: 'month',
    totalRevenue: 'month',
    totalProducts: 'month',
  });
  const [customDates, setCustomDates] = useState<Record<string, { start: string; end: string }>>({
    totalOrders: { start: '', end: '' },
    pendingOrders: { start: '', end: '' },
    totalRevenue: { start: '', end: '' },
    totalProducts: { start: '', end: '' },
  });

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, ordersRes] = await Promise.all([
        fetch('/api/admin/dashboard/stats'),
        fetch('/api/admin/orders'),
      ]);
      const statsData = await statsRes.json();
      const ordersData = await ordersRes.json();
      setStats(statsData);
      setRecentOrders(Array.isArray(ordersData) ? ordersData.slice(0, 10) : []);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const fetchCardStats = useCallback(async (cardKey: string, key: RangeKey, custom?: { start: string; end: string }) => {
    setCardLoading(true);
    const range = getDateRange(key, custom?.start, custom?.end);
    if (!range) {
      // All Time — refetch all at once
      await fetchStats();
      setCardLoading(false);
      return;
    }
    const params = new URLSearchParams({ startDate: range.start, endDate: range.end });
    try {
      const res = await fetch(`/api/admin/dashboard/stats?${params}`);
      const data = await res.json();
      setStats(prev => ({ ...prev, ...data }));
    } catch (error) {
      console.error('Card stats fetch error:', error);
    } finally {
      setCardLoading(false);
    }
  }, [fetchStats]);

  const handleRangeChange = (cardKey: string, key: RangeKey) => {
    setRangeKeys(prev => ({ ...prev, [cardKey]: key }));
    fetchCardStats(cardKey, key, customDates[cardKey]);
  };

  const handleCustomDateChange = (cardKey: string, field: 'start' | 'end', value: string) => {
    const updated = { ...customDates[cardKey], [field]: value };
    setCustomDates(prev => ({ ...prev, [cardKey]: updated }));
    // Auto-fetch when both dates filled
    if (updated.start && updated.end) {
      setRangeKeys(prev => ({ ...prev, [cardKey]: 'custom' }));
      fetchCardStats(cardKey, 'custom', updated);
    }
  };

  const statCards = [
    {
      key: 'totalOrders',
      label: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'bg-blue-500',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      key: 'pendingOrders',
      label: 'Pending Orders',
      value: stats.pendingOrders,
      icon: Clock,
      color: 'bg-yellow-500',
      bgLight: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      key: 'totalRevenue',
      label: 'Total Revenue',
      value: `Rs.${(stats.totalRevenue || 0).toLocaleString()}`,
      icon: Wallet,
      color: 'bg-green-500',
      bgLight: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      key: 'totalProducts',
      label: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-purple-500',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-700 mx-auto" />
          <p className="mt-4 text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-500 mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          const isCardLoading = cardLoading;
          return (
            <div key={card.key} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow relative">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${card.bgLight}`}>
                  <Icon className={`h-5 w-5 ${card.textColor}`} />
                </div>
                <DropdownFilter
                  currentKey={rangeKeys[card.key]}
                  onSelect={(key) => handleRangeChange(card.key, key)}
                  customStart={customDates[card.key].start}
                  customEnd={customDates[card.key].end}
                  onCustomStartChange={(v) => handleCustomDateChange(card.key, 'start', v)}
                  onCustomEndChange={(v) => handleCustomDateChange(card.key, 'end', v)}
                />
              </div>
              {isCardLoading ? (
                <div className="space-y-2">
                  <div className="h-7 w-24 bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
                </div>
              ) : (
                <>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{card.label}</p>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <p className="text-sm text-gray-500">Latest 10 orders across the store</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
          >
            View All
            <ArrowUp className="h-4 w-4 rotate-45" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-10 text-center">
            <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-600">
                  <th className="text-left py-3 px-4 font-semibold">Order #</th>
                  <th className="text-left py-3 px-4 font-semibold">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold hidden md:table-cell">Phone</th>
                  <th className="text-right py-3 px-4 font-semibold">Total</th>
                  <th className="text-center py-3 px-4 font-semibold">Status</th>
                  <th className="text-right py-3 px-4 font-semibold hidden lg:table-cell">Date</th>
                  <th className="text-right py-3 px-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-900">{order.orderNumber}</td>
                    <td className="py-3 px-4 text-gray-700">{order.customerName}</td>
                    <td className="py-3 px-4 text-gray-500 hidden md:table-cell">{order.customerPhone}</td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-900">Rs.{order.totalAmount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${statusBadge(order.orderStatus)}`}>
                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-gray-500 hidden lg:table-cell">
                      {new Date(order.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/admin/orders/${order._id}`}
                        className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 font-medium text-xs"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Link>
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
