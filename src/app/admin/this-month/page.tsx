'use client';

import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Clock, Wallet, Package, ChevronDown, Calendar } from 'lucide-react';

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
    return { start: new Date(customStart).toISOString(), end: new Date(customEnd + 'T23:59:59').toISOString() };
  }
  let start: Date;
  const end = new Date();
  switch (key) {
    case 'today': start = new Date(now.getFullYear(), now.getMonth(), now.getDate()); break;
    case 'week': { const d = now.getDay(), diff = d === 0 ? 6 : d - 1; start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - diff); break; }
    case 'month': start = new Date(now.getFullYear(), now.getMonth(), 1); break;
    case 'year': start = new Date(now.getFullYear(), 0, 1); break;
    default: return null;
  }
  return { start: start.toISOString(), end: end.toISOString() };
}

function getRangeLabel(key: RangeKey, customStart?: string, customEnd?: string): string {
  if (key === 'all') return 'All Time';
  if (key === 'custom') return customStart && customEnd ? `${customStart} – ${customEnd}` : 'Custom Range';
  const now = new Date();
  if (key === 'month') return `${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}`;
  if (key === 'year') return `${now.getFullYear()}`;
  return RANGE_OPTIONS.find(r => r.key === key)?.label || 'This Month';
}

function DropdownFilter({
  currentKey, onSelect, customStart, customEnd, onCustomStartChange, onCustomEndChange,
}: {
  currentKey: RangeKey; onSelect: (key: RangeKey) => void;
  customStart: string; customEnd: string;
  onCustomStartChange: (v: string) => void; onCustomEndChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentLabel = getRangeLabel(currentKey, customStart, customEnd);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1 text-xs text-gray-400 font-medium hover:text-gray-600 transition-colors cursor-pointer">
        <span className="max-w-[100px] truncate">{currentLabel}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 z-50 min-w-[160px] bg-white border border-gray-200 rounded-lg shadow-lg py-1">
          {RANGE_OPTIONS.map((opt) => {
            if (opt.key === 'custom') {
              return (
                <div key="custom">
                  <button onClick={() => { onSelect('custom'); setOpen(false); }} className={`w-full text-left px-3 py-2 text-xs transition-colors ${currentKey === 'custom' ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                    {opt.label}
                  </button>
                  <div className="px-3 pb-2 pt-1 space-y-1.5 border-t border-gray-100 mt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <input type="date" value={customStart} onChange={(e) => onCustomStartChange(e.target.value)} className="w-full text-[11px] border border-gray-200 rounded px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-green-400" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <input type="date" value={customEnd} onChange={(e) => onCustomEndChange(e.target.value)} className="w-full text-[11px] border border-gray-200 rounded px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-green-400" />
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <button key={opt.key} onClick={() => { onSelect(opt.key); setOpen(false); }} className={`w-full text-left px-3 py-2 text-xs transition-colors ${currentKey === opt.key ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ThisMonthPage() {
  const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0, totalRevenue: 0, totalProducts: 0 });
  const [loading, setLoading] = useState(true);
  const [cardLoading, setCardLoading] = useState(false);

  const [rangeKeys, setRangeKeys] = useState<Record<string, RangeKey>>({
    totalOrders: 'month', pendingOrders: 'month', totalRevenue: 'month', totalProducts: 'month',
  });
  const [customDates, setCustomDates] = useState<Record<string, { start: string; end: string }>>({
    totalOrders: { start: '', end: '' }, pendingOrders: { start: '', end: '' }, totalRevenue: { start: '', end: '' }, totalProducts: { start: '', end: '' },
  });

  const fetchAllStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/dashboard/stats');
      setStats(await res.json());
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAllStats(); }, []);

  const fetchCardStats = async (cardKey: string, key: RangeKey, custom?: { start: string; end: string }) => {
    setCardLoading(true);
    const range = getDateRange(key, custom?.start, custom?.end);
    if (!range) { await fetchAllStats(); setCardLoading(false); return; }
    try {
      const res = await fetch(`/api/admin/dashboard/stats?startDate=${range.start}&endDate=${range.end}`);
      const data = await res.json();
      setStats(prev => ({ ...prev, ...data }));
    } catch (error) {
      console.error('Card fetch error:', error);
    } finally {
      setCardLoading(false);
    }
  };

  const handleRangeChange = (cardKey: string, key: RangeKey) => {
    setRangeKeys(prev => ({ ...prev, [cardKey]: key }));
    fetchCardStats(cardKey, key, customDates[cardKey]);
  };

  const handleCustomDateChange = (cardKey: string, field: 'start' | 'end', value: string) => {
    const updated = { ...customDates[cardKey], [field]: value };
    setCustomDates(prev => ({ ...prev, [cardKey]: updated }));
    if (updated.start && updated.end) {
      setRangeKeys(prev => ({ ...prev, [cardKey]: 'custom' }));
      fetchCardStats(cardKey, 'custom', updated);
    }
  };

  const statCards = [
    { key: 'totalOrders', label: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'bg-blue-500', bgLight: 'bg-blue-50', textColor: 'text-blue-600' },
    { key: 'pendingOrders', label: 'Pending Orders', value: stats.pendingOrders, icon: Clock, color: 'bg-yellow-500', bgLight: 'bg-yellow-50', textColor: 'text-yellow-600' },
    { key: 'totalRevenue', label: 'Total Revenue', value: `Rs.${(stats.totalRevenue || 0).toLocaleString()}`, icon: Wallet, color: 'bg-green-500', bgLight: 'bg-green-50', textColor: 'text-green-600' },
    { key: 'totalProducts', label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'bg-purple-500', bgLight: 'bg-purple-50', textColor: 'text-purple-600' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-700 mx-auto" />
          <p className="mt-4 text-gray-500">Loading stats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Statistics</h2>
        <p className="text-gray-500 mt-1">Track performance across different time periods</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.key} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
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
              {cardLoading ? (
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

      {/* Summary Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Period Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Total Orders</span>
              <span className="font-semibold text-gray-900">{stats.totalOrders}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Pending Orders</span>
              <span className="font-semibold text-gray-900">{stats.pendingOrders}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Total Revenue</span>
              <span className="font-semibold text-green-700">Rs.{(stats.totalRevenue || 0).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Total Products</span>
              <span className="font-semibold text-gray-900">{stats.totalProducts}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
