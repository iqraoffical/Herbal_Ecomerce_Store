
import Image from "next/image";

const products = [
  { name: "CHICORI", price: "$89", rating: 4.0, image: "/Images/velvety1.png" },
  { name: "NOTORIOUS", price: "$99", rating: 5.0, image: "/Images/velvety2.png" },
  { name: "HOLOCENA", price: "$109", rating: 5.0, image: "/Images/velvety3.png" },
];

export default function FeaturedProduct() {
  return (
    <section className="bg-white text-gray-800 py-12 sm:py-16 px-4 sm:px-8 md:px-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <div key={product.name} className="bg-[#f3f7f3] p-6 rounded-xl shadow-lg text-center">
            <Image
              src={product.image}
              alt={product.name}
              width={150}
              height={300}
              className="mx-auto mb-4 w-32 h-64 object-contain"
            />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-lg font-medium">{product.price}</p>
            <div className="text-green-600 mt-2">
              {"★".repeat(Math.floor(product.rating))}{" "}
              {product.rating % 1 !== 0 && "½"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
