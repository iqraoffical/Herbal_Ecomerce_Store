"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Share2,
  Star,
  Truck,
  Shield,
  Package,
  Minus,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  getRelatedProducts,
  type Product,
} from "@/sanity/lib/fetch";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchData() {
      try {
        const encodedSlug = encodeURIComponent(slug);
        console.log("Fetching product with slug:", slug, "encoded:", encodedSlug);
        const res = await fetch(`/api/sanity/products/${encodedSlug}`);
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error("API response not OK:", res.status, errorData);
          throw new Error(errorData.error || 'Product not found');
        }
        const productData = await res.json();
        console.log("Product data received:", productData ? "yes" : "no", productData?.name);
        if (productData) {
          setProduct(productData);
          try {
            const related = await getRelatedProducts(
              productData.category?.slug?.current,
              slug
            );
            setRelatedProducts(related || []);
          } catch (relatedErr) {
            console.error("Error fetching related products:", relatedErr);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          _id: product._id,
          name: product.name,
          slug: product.slug.current,
          imageUrl: product.imageUrl,
          price: product.price,
          stockQuantity: product.stockQuantity,
        });
      }
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stockQuantity || 1)) {
      setQuantity(newQuantity);
    }
  };

  const allImages = product
    ? [product.imageUrl, ...(product.images || [])]
    : [];

  // Format PKR with commas
  const formatPKR = (amount: number) => {
    return amount.toLocaleString("en-PK");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">
              The product you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/shop">
              <Button className="bg-green-700 hover:bg-green-800">
                Back to Shop
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <section className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-700">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-green-700">Shop</Link>
            <span>/</span>
            <Link href={`/shop?category=${product.category.slug.current}`} className="hover:text-green-700">
              {product.category.name}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative bg-gradient-to-b from-green-50 to-white rounded-lg p-8 flex items-center justify-center min-h-[400px]">
                <Image
                  src={allImages[selectedImageIndex] || "/Images/herbal_hair_oil.png"}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="object-contain w-full h-96"
                  priority
                />
              </div>
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 border-2 rounded-lg p-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-green-700"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={img || "/Images/herbal_hair_oil.png"}
                        alt={`${product.name} ${index + 1}`}
                        width={80}
                        height={80}
                        className="object-contain w-20 h-20"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.isFeatured && (
                  <Badge className="bg-green-700">Featured</Badge>
                )}
                {product.isNewArrival && (
                  <Badge className="bg-blue-600">New Arrival</Badge>
                )}
                {product.stockQuantity === 0 && (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
                {product.stockQuantity > 0 && product.stockQuantity <= 5 && (
                  <Badge className="bg-orange-500">Only {product.stockQuantity} left</Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating!)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-300 text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.rating} rating)</span>
                </div>
              )}

              <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

              {product.longDescription && product.longDescription.length > 0 && (
                <div className="mb-6">
                  {product.longDescription.map((block: any, i: number) => {
                    if (block._type === 'block') {
                      return (
                        <p key={i} className="text-gray-700 leading-relaxed mb-3">
                          {block.children?.map((child: any) => child.text).join(' ')}
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-green-700">
                  Rs. {formatPKR(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">
                      Rs. {formatPKR(product.originalPrice)}
                    </span>
                    <Badge variant="secondary" className="text-green-700 bg-green-100 text-lg px-3 py-1">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) * 100
                      )}
                      % OFF
                    </Badge>
                  </>
                )}
              </div>

              <Separator className="my-6" />

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="px-3"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-6 py-2 font-semibold min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stockQuantity}
                      className="px-3"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.stockQuantity} available
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stockQuantity === 0}
                  className="flex-1 bg-green-700 hover:bg-green-800 py-6 text-lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart — Rs. {formatPKR(product.price * quantity)}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="py-6 h-auto w-14 group"
                  onClick={() => {
                    const url = window.location.href;
                    if (navigator.share) {
                      navigator.share({ title: product.name, url });
                    } else {
                      navigator.clipboard.writeText(url);
                      alert("Link copied to clipboard!");
                    }
                  }}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mb-6 bg-gray-50 rounded-lg p-4">
                <div className="flex flex-col items-center gap-1 text-center">
                  <Truck className="h-5 w-5 text-green-700" />
                  <span className="text-xs text-gray-600">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <Shield className="h-5 w-5 text-green-700" />
                  <span className="text-xs text-gray-600">100% Natural</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <Package className="h-5 w-5 text-green-700" />
                  <span className="text-xs text-gray-600">Easy Returns</span>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Additional Info */}
              <div className="space-y-2 text-sm text-gray-600">
                {product.sku && (
                  <p><span className="font-semibold text-gray-800">SKU:</span> {product.sku}</p>
                )}
                <p>
                  <span className="font-semibold text-gray-800">Category:</span>{" "}
                  <Link href={`/shop?category=${product.category.slug.current}`} className="text-green-700 hover:underline">
                    {product.category.name}
                  </Link>
                </p>
                {product.weight && (
                  <p><span className="font-semibold text-gray-800">Weight:</span> {product.weight}g</p>
                )}
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {product.benefits && product.benefits.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h3>
                      <ul className="space-y-3">
                        {product.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-green-700 text-sm font-bold">✓</span>
                            </span>
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {product.ingredients && product.ingredients.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.ingredients.map((ingredient, index) => (
                          <Badge key={index} variant="secondary" className="px-4 py-2 text-sm bg-green-50 text-green-800 border border-green-200">
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {product.usage && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h3>
                    <div className="bg-green-50 rounded-lg p-6">
                      <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                        {product.usage}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Card
                    key={relatedProduct._id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <Link href={`/product/${encodeURIComponent(relatedProduct.slug.current)}`}>
                      <div className="relative bg-gradient-to-b from-green-50 to-white p-4">
                        <Image
                          src={relatedProduct.imageUrl || "/Images/herbal_hair_oil.png"}
                          alt={relatedProduct.name}
                          width={200}
                          height={200}
                          className="object-contain h-40 w-full"
                        />
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <Link href={`/product/${encodeURIComponent(relatedProduct.slug.current)}`}>
                        <h3 className="font-semibold text-gray-900 mb-2 hover:text-green-700 line-clamp-2">
                          {relatedProduct.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-700">
                          Rs. {formatPKR(relatedProduct.price)}
                        </span>
                        {relatedProduct.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            Rs. {formatPKR(relatedProduct.originalPrice)}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
