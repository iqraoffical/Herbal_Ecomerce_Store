"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProducts, getCategories, type Product, type Category } from "@/sanity/lib/fetch";
import { useCart } from "@/context/CartContext";

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      product.category?.slug.current === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop Our Products</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover our range of 100% natural herbal hair care products
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className={selectedCategory === "all" ? "bg-green-700 hover:bg-green-800" : ""}
              >
                All Products
              </Button>
              {categories.map((category) => (
                <Button
                  key={category._id}
                  variant={selectedCategory === category.slug.current ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.slug.current)}
                  className={selectedCategory === category.slug.current ? "bg-green-700 hover:bg-green-800" : ""}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">Showing {Math.min(3, filteredProducts.length)} products</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.slice(0, 3).map((product) => (
              <Card key={product._id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <Link href={`/product/${product.slug?.current || product._id}`}>
                  <div className="relative bg-gradient-to-b from-green-50 to-white p-6 cursor-pointer">
                    {product.isFeatured && (
                      <Badge className="absolute top-4 right-4 bg-green-700">
                        Featured
                      </Badge>
                    )}
                    {product.isNewArrival && (
                      <Badge className="absolute top-4 right-4 bg-blue-600">
                        New
                      </Badge>
                    )}
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
                  <Link href={`/product/${product.slug?.current || product._id}`}>
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
                      <span className="text-sm text-gray-500">({product.rating})</span>
                    </div>
                  )}

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-green-700">Rs.{product.price}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-gray-500 line-through">Rs.{product.originalPrice}</span>
                        <Badge variant="secondary" className="text-green-700 bg-green-100">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
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

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
