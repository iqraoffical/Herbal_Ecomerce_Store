// pages/product/[slug].tsx
import { useRouter } from "next/router";
import Image from "next/image";

const products = [
  {
    name: "CLASSWING",
    slug: "classwing",
    price: "$20",
    rating: 5.0,
    image: "/images/products/classwing.png",
    description: "Refreshing skin mist made with natural ingredients.",
  },
  {
    name: "HOLOCANE",
    slug: "holocane",
    price: "$23",
    rating: 5.0,
    image: "/images/products/holocane.png",
    description: "Hydrating serum for smoother skin.",
  },
  {
    name: "INAMORATA",
    slug: "inamorata",
    price: "$12",
    rating: 4.5,
    image: "/images/products/inamorata.png",
    description: "Gentle moisturizer for daily use.",
  },
  {
    name: "LIGHTCOOL",
    slug: "lightcool",
    price: "$22.5",
    rating: 5.0,
    image: "/images/products/lightcool.png",
    description: "Lightweight cooling eye cream.",
  },
];

export default function ProductDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const product = products.find((p) => p.slug === slug);

  if (!product) return <p className="p-10">Product not found.</p>;

  return (
    <div className="min-h-screen p-10 bg-white text-gray-800">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <Image src={product.image} alt={product.name} width={200} height={300} />
      <p className="text-lg text-green-700 mt-2">{product.price}</p>
      <p className="mt-2">{product.description}</p>
      <p className="text-green-600 mt-2">
        {"⭐".repeat(Math.floor(product.rating))}
        {product.rating % 1 !== 0 && "½"} {product.rating}
      </p>
    </div>
  );
}
