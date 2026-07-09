'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export default function OrderPage() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Enter a valid phone number (10–15 digits)';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;
    if (items.length === 0) {
      alert('Your cart is empty. Add items before placing an order.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems = items.map(item => ({
        product: { _type: 'reference', _ref: item._id },
        productName: item.name,
        productImage: item.imageUrl,
        quantity: item.quantity,
        price: item.price,
      }));

      const response = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerPhone: formData.phone,
          shippingAddress: {
            street: formData.address,
            city: formData.city,
          },
          items: orderItems,
          totalAmount: getCartTotal(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('✅ Order placed successfully! We will contact you soon.');
        clearCart();
        setFormData({ name: '', phone: '', address: '', city: '' });

        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        throw new Error(result.error || result.detail || 'Failed to place order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !successMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-green-700 hover:text-green-900 mb-6 inline-block">← Back to Home</Link>
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-green-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">Add some products first before placing an order.</p>
            <Link href="/shop">
              <Button className="bg-green-700 hover:bg-green-800">Go to Shop</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
      <div className="container mx-auto px-4">
        <Link href="/" className="text-green-700 hover:text-green-900 mb-6 inline-block">
          ← Back to Home
        </Link>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-center text-green-800 mb-8">Place Your Order</h1>

          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-center">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Customer Details */}
            <h2 className="text-xl font-semibold text-green-800 mb-4">Customer Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-green-800 font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-green-800 font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="10-digit phone number"
                />
                {errors.phone && <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="address" className="block text-green-800 font-medium mb-2">Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your full address"
              ></textarea>
              {errors.address && <p className="mt-1 text-red-500 text-sm">{errors.address}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="city" className="block text-green-800 font-medium mb-2">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your city"
              />
              {errors.city && <p className="mt-1 text-red-500 text-sm">{errors.city}</p>}
            </div>

            {/* Cart Items with Quantity Controls */}
            <h2 className="text-xl font-semibold text-green-800 mb-4">Order Items</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item._id} className="flex items-center justify-between bg-green-50 p-4 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-green-900">{item.name}</p>
                    <p className="text-sm text-gray-600">Rs.{item.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center font-semibold">{item.quantity}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      disabled={item.quantity >= item.stockQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="ml-4 text-right font-bold text-green-700 w-24">
                    Rs.{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-green-800 mb-2">Order Summary</h3>
              {items.map((item) => (
                <div key={item._id} className="flex justify-between text-sm text-gray-700">
                  <span>{item.name} × {item.quantity}</span>
                  <span>Rs.{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="flex justify-between mt-3 pt-3 border-t border-green-200 font-bold text-lg">
                <span>Total:</span>
                <span className="text-green-700">Rs.{getCartTotal()}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold py-4 px-6 rounded-full transition duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-green-800 mb-3">Payment Options:</h3>
            <div className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Cash on Delivery (COD) available
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Pay via JazzCash, Easypaisa, or Cash on Delivery
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
