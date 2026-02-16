'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
      <div className="container mx-auto px-4">
        <Link href="/" className="text-green-700 hover:text-green-900 mb-6 inline-block">
          ← Back to Home
        </Link>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 flex items-center justify-center">
              <div className="relative">
                <Image 
                  src="/Images/product-oil.png" 
                  alt="Herbal Hair Oil" 
                  width={350} 
                  height={350} 
                  className="rounded-lg shadow-md"
                />
                <div className="absolute -top-3 -right-3 bg-yellow-500 text-green-900 px-3 py-1 rounded-full text-sm font-bold">
                  Best Seller
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-green-800 mb-2">Pure Herbal Hair Oil</h1>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">(128 reviews)</span>
              </div>
              
              <div className="text-3xl font-bold text-green-700 mb-4">₹499 <span className="text-lg text-gray-500 line-through">₹699</span></div>
              
              <p className="text-gray-700 mb-6">
                Our premium herbal hair oil is formulated with 100% natural ingredients including Amla, Bhringraj, Neem, and Hibiscus. 
                These powerful herbs work together to strengthen hair roots, promote growth, reduce dandruff, and add natural shine.
              </p>
              
              <div className="mb-6">
                <h3 className="font-semibold text-green-800 mb-2">Key Benefits:</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Promotes healthy hair growth</li>
                  <li>Reduces hair fall and dandruff</li>
                  <li>Nourishes and strengthens hair roots</li>
                  <li>Adds natural shine and softness</li>
                  <li>Chemical-free and safe for daily use</li>
                </ul>
              </div>
              
              <div className="mb-6">
                <label className="block text-green-800 font-medium mb-2">Quantity</label>
                <div className="flex items-center border border-green-300 rounded-lg w-fit">
                  <button 
                    onClick={decrement}
                    className="px-4 py-2 text-xl text-green-700 hover:bg-green-100 rounded-l-lg"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 text-lg font-medium">{quantity}</span>
                  <button 
                    onClick={increment}
                    className="px-4 py-2 text-xl text-green-700 hover:bg-green-100 rounded-r-lg"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <Link 
                href="/order" 
                className="block w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold py-4 px-6 rounded-full text-center transition duration-300"
              >
                Order Now - ₹{quantity * 499}
              </Link>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-green-800 mb-3">Delivery Information:</h3>
                <div className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Delivered by PostEx in 2-4 business days
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Cash on Delivery available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}