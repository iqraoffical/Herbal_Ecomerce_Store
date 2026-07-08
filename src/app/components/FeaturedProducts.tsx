"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts, type Product } from "@/sanity/lib/fetch";
import { useCart } from "@/context/CartContext";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getFeaturedProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      _id: product._id,
      name: product.name,
      slug: product.slug.current,
      imageUrl: product.imageUrl,
      price: product.price,
      stockQuantity: product.stockQuantity,
    });
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular natural herbal solutions
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">
            Best Sellers
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our most popular natural herbal solutions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.slice(0, 6).map((product) => (
            <Card
              key={product._id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <Link href={`/product/${product.slug.current}`}>
                <div className="relative bg-gradient-to-b from-green-50 to-white p-6 cursor-pointer">
                  <Badge className="absolute top-4 right-4 bg-green-700">
                    Featured
                  </Badge>
                  <div className="flex justify-center">
                    <Image
                      src={product.imageUrl || "/Images/herbal_hair_oil.png"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="object-contain h-48"
                    />
                  </div>
                </div>
              </Link>
              <CardContent className="p-6">
                <Link href={`/product/${product.slug.current}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-green-700 cursor-pointer">
                    {product.name}
                  </h3>
                </Link>

                {product.rating && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating!)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-300 text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({product.rating})
                    </span>
                  </div>
                )}

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-green-700">
                    Rs.{product.price}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-gray-500 line-through">
                        Rs.{product.originalPrice}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-green-700 bg-green-100"
                      >
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}
                        % OFF
                      </Badge>
                    </>
                  )}
                </div>

                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-green-700 hover:bg-green-800"
                  disabled={product.stockQuantity === 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.stockQuantity === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/shop">
            <Button
              size="lg"
              variant="outline"
              className="border-green-700 text-green-700 hover:bg-green-50"
            >
              View All Products
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
