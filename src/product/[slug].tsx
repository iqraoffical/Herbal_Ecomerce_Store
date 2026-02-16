import { useRouter } from "next/router";
import Image from "next/image";

// Simulated product list
const products = [
  {
    name: "CLASSWING",
    slug: "classwing",
    price: "$20",
    rating: 5.0,
    description: "Refreshing toner for smooth skin.",
    image: "/images/products/classwing.png",
  },
  {
    name: "HOLOCANE",
    slug: "holocane",
    price: "$23",
    rating: 5.0,
    description: "Deep hydration and glow.",
    image: "/images/products/holocane.png",
  },
  {
    name: "INAMORATA",
    slug: "inamorata",
    price: "$12",
    rating: 4.5,
    description: "Night cream for repair.",
    image: "/images/products/inamorata.png",
  },
  {
    name: "LIGHTCOOL",
    slug: "lightcool",
    price: "$22.5",
    rating: 5.0,
    description: "Cooling eye gel for under-eye care.",
    image: "/images/products/lightcool.png",
  },
];

export default function ProductDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const product = products.find((p) => p.slug === slug);

  if (!product) return <p className="p-10 text-white">Product not found.</p>;

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <Image src={product.image} alt={product.name} width={300} height={400} />
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-green-500 font-semibold text-xl my-2">{product.price}</p>
          <p className="text-green-400 mb-4">
            {"⭐".repeat(Math.floor(product.rating))}
            {product.rating % 1 !== 0 && "½"} {product.rating}
          </p>
          <p className="text-gray-300">{product.description}</p>
          <button className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-full">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}




// import { useRouter } from "next/router";
// import Image from "next/image";  
// import products from "../../data/products";
// import { Product } from "../../types/product";

// export default function ProductDetail() {
//   const router = useRouter();
//   const { slug } = router.query;

//   const product: Product | undefined = products.find((p) => p.slug === slug);

//   if (!product) return <p className="text-center mt-20">Product not found</p>;

//   return (
//     <div className="min-h-screen px-6 py-12 bg-white">
//       <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
//         <Image
//           src={`/images/products/${product.image}`}
//           alt={product.name}
//           width={400}
//           height={400}
//           className="rounded shadow"
//         />
//         <div>
//           <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//           <p className="text-lg text-gray-700 mb-2">{product.description}</p>
//           <p className="text-green-600 text-2xl font-semibold">${product.price}</p>
//           <div className="mt-4 text-green-500">
//             {"⭐".repeat(Math.floor(product.rating))}
//             {product.rating % 1 !== 0 && "½"}
//             <span className="ml-2 text-gray-500">({product.rating})</span>
//           </div>
//           <button className="mt-6 px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
