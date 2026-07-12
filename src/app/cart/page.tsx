"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven&apos;t added any products yet</p>
          <Link href="/shop">
            <Button size="lg" className="bg-green-700 hover:bg-green-800">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="opacity-90">{items.length} item{items.length > 1 ? "s" : ""} in your cart</p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item._id} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Link href={`/product/${encodeURIComponent(item.slug)}`}>
                        <div className="w-24 h-24 bg-gradient-to-b from-green-50 to-white rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer hover:shadow-lg transition-shadow">
                          <Image
                            src={item.imageUrl || "/Images/herbal_hair_oil.png"}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="object-contain"
                          />
                        </div>
                      </Link>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Link href={`/product/${encodeURIComponent(item.slug)}`}>
                              <h3 className="font-semibold text-gray-900 text-lg hover:text-green-700 cursor-pointer">
                                {item.name}
                              </h3>
                            </Link>
                            <Badge variant="secondary" className="mt-1 bg-green-100 text-green-700">
                              In Stock ({item.stockQuantity} available)
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item._id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-16 h-8 flex items-center justify-center font-semibold">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              disabled={item.quantity >= item.stockQuantity}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-700">
                              Rs.{item.price * item.quantity}
                            </div>
                            <div className="text-sm text-gray-500">Rs.{item.price} each</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-md sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>Rs.{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "FREE" : `Rs.${shipping}`}</span>
                    </div>
                    {shipping > 0 && subtotal < 999 && (
                      <p className="text-sm text-green-600">
                        Add Rs.{999 - subtotal} more for free shipping
                      </p>
                    )}
                    {shipping === 0 && (
                      <p className="text-sm text-green-600 font-semibold">
                        🎉 You got free shipping!
                      </p>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-green-700">Rs.{total}</span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <Link href="/order">
                    <Button className="w-full bg-green-700 hover:bg-green-800" size="lg">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>

                  <Link href="/shop">
                    <Button variant="outline" className="w-full mt-3">
                      Continue Shopping
                    </Button>
                  </Link>

                  <div className="mt-6 text-center text-sm text-gray-500">
                    <p>✓ Secure checkout</p>
                    <p>✓ Free returns within 30 days</p>
                    <p>✓ 100% natural products</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
