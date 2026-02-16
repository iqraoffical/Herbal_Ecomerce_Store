// components/AllProducts.tsx
import Image from "next/image";

const products = [
  {
    name: "CLASSWING",
    slug:"classswing",
    price: "$20",
    rating: 5.0,
    image: "/images/products/classwing.png",
  },
  {
    name: "HOLOCANE",
    slug:"holocane",
    price: "$23",
    rating: 5.0,
    image: "/images/products/holocane.png",
  },
  {
    name: "INAMORATA",
    slug:"inamorata",
    price: "$12",
    rating: 4.5,
    image: "/images/products/inamorata.png",
  },
  {
    name: "LIGHTCOOL",
    slug:"lightcool",
    price: "$22.5",
    rating: 5.0,
    image: "/images/products/lightcool.png",
  },
];

const filters = [
  "All needs", "Protect", "Regenerates", "Revitalizes", "Feeds", "Regulates", "Purifies",
  "Makeup Removal", "Exfoliate", "Antioxidant", "Soothes", "Smoothes skin texture",
  "Tones", "Anti-waste", "Hydrate", "Strengthens", "Regenerates after UV exposure",
];

export default function AllProducts() {
  return (
    <section className="bg-black text-white py-12 sm:py-16 px-4">
      <h3 className="text-sm text-gray-400 mb-2">All Products</h3>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-green-200 mb-6">
        Mild skincare & facial routine
      </h2>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
        {filters.map((filter, index) => (
          <button
            key={index}
            className={`border px-3 py-1 rounded-full text-xs sm:text-sm ${
              filter === "All needs" ? "bg-white text-black" : "border-white text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {products.map((product, index) => (
          <div key={index} className="bg-[#e6f0e9] text-black p-3 sm:p-4">
            <div className="flex justify-center items-center h-40 sm:h-48 relative">
              <Image 
                src={product.image} 
                alt={product.name} 
                width={100} 
                height={160} 
                className="object-contain w-full max-w-[80px]"
              />
            </div>
            <div className="p-2 mt-2">
              <h3 className="text-xs sm:text-sm font-medium">{product.name}</h3>
              <p className="text-green-700 font-bold text-xs sm:text-sm">{product.price}</p>
              <p className="text-green-700 text-xs sm:text-sm">
                {"⭐".repeat(Math.floor(product.rating))}
                {product.rating % 1 !== 0 && "½"} {product.rating}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right mt-8">
        <button className="px-6 py-2 border border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition rounded-full text-sm">
          Shop now →
        </button>
      </div>
    </section>
  );
}
