'use client';

import { useState } from 'react';
import { Save, Leaf, Info, Globe, Mail, Phone, MapPin } from 'lucide-react';

export default function SettingsPage() {
  const [storeName, setStoreName] = useState('Herbal Hair Care');
  const [storeEmail, setStoreEmail] = useState('info@herbalhaircare.pk');
  const [storePhone, setStorePhone] = useState('+92 300 1234567');
  const [storeAddress, setStoreAddress] = useState('Karachi, Pakistan');
  const [currency, setCurrency] = useState('PKR');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Simulate save
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500 mt-1">Manage your store configuration</p>
      </div>

      {/* Store Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <Info className="h-5 w-5 text-green-700" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Store Information</h3>
            <p className="text-sm text-gray-500">Basic details about your herbal store</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Globe className="h-3.5 w-3.5 inline mr-1" /> Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Mail className="h-3.5 w-3.5 inline mr-1" /> Email
              </label>
              <input
                type="email"
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Phone className="h-3.5 w-3.5 inline mr-1" /> Phone
              </label>
              <input
                type="text"
                value={storePhone}
                onChange={(e) => setStorePhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="h-3.5 w-3.5 inline mr-1" /> Address
              </label>
              <input
                type="text"
                value={storeAddress}
                onChange={(e) => setStoreAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="PKR">PKR - Pakistani Rupee</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 disabled:opacity-60 transition-colors"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
            {saved && (
              <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Settings saved!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Sanity Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Leaf className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Sanity CMS Connection</h3>
            <p className="text-sm text-gray-500">Your content management system status</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Project ID</span>
            <span className="font-mono text-gray-900">jfxnntpa</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Dataset</span>
            <span className="font-mono text-gray-900">production</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Status</span>
            <span className="flex items-center gap-1 text-green-600 font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Connected
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Studio</span>
            <a
              href="https://herbal-ecomweb-studio.sanity.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 hover:underline font-medium"
            >
              Open Studio ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
