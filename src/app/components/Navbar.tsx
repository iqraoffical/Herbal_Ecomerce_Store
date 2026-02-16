
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="text-xl font-bold text-green-800">HerbalHairOil</div>
      
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
        <Link href="/" className="hover:underline font-medium text-green-700">Home</Link>
        <Link href="/product" className="hover:underline font-medium text-green-700">Product</Link>
        <Link href="/contact" className="hover:underline font-medium text-green-700">Contact</Link>
        <Link href="/delivery" className="hover:underline font-medium text-green-700">Delivery</Link>
      </div>
    </nav>
  );
}










