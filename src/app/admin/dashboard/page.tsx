'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Order {
  id: number;
  name: string;
  phone: string;
  address: string;
  city: string;
  product: string;
  quantity: number;
  price: number;
  status: 'pending' | 'shipped' | 'delivered';
  tracking_id: string | null;
  created_at: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState<number | null>(null); // Track which order is being updated
  const router = useRouter();

  const fetchOrders = async (token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/api/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          router.push('/admin');
          return;
        }
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError('An error occurred while fetching orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    fetchOrders(token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  const updateOrderStatus = async (orderId: number, status: string, trackingId?: string) => {
    setUpdating(orderId);
    
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          status,
          tracking_id: trackingId
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          router.push('/admin');
          return;
        }
        throw new Error('Failed to update order');
      }

      const updatedOrder = await response.json();
      
      // Update the order in the local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...updatedOrder } : order
      ));
    } catch (err) {
      setError('An error occurred while updating the order');
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-4 text-green-700">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-4">All Orders</h2>
          <p className="text-gray-600">Manage and track customer orders</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-600">No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Customer</th>
                  <th className="py-3 px-4 text-left">Contact</th>
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-left">Product</th>
                  <th className="py-3 px-4 text-left">Quantity</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Tracking ID</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-green-50">
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4 font-medium">{order.name}</td>
                    <td className="py-3 px-4">{order.phone}</td>
                    <td className="py-3 px-4">
                      <div>{order.address}</div>
                      <div className="text-gray-600">{order.city}</div>
                    </td>
                    <td className="py-3 px-4">{order.product}</td>
                    <td className="py-3 px-4">{order.quantity}</td>
                    <td className="py-3 px-4">₹{order.price}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : order.status === 'shipped' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {order.tracking_id ? (
                        <span className="font-mono text-sm">{order.tracking_id}</span>
                      ) : (
                        <span className="text-gray-500">Not assigned</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          disabled={updating === order.id}
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                        
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Tracking ID"
                            value={order.tracking_id || ''}
                            onChange={(e) => {
                              // Update the tracking ID in the UI immediately
                              setOrders(orders.map(o => 
                                o.id === order.id ? { ...o, tracking_id: e.target.value } : o
                              ));
                            }}
                            className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                            disabled={updating === order.id}
                          />
                          <button
                            onClick={() => updateOrderStatus(order.id, order.status, order.tracking_id || undefined)}
                            className={`px-2 py-1 rounded text-sm ${
                              updating === order.id 
                                ? 'bg-gray-400' 
                                : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}
                            disabled={updating === order.id}
                          >
                            {updating === order.id ? 'Updating...' : 'Update'}
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}