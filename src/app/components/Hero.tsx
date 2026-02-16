import Image from "next/image";
import Link from "next/link";
export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row min-h-screen font-sans">
      {/* Left side: product bottle and brand */}
      <div className="md:w-1/2 bg-[#c7d4c0] p-6 sm:p-12 flex flex-col justify-between">
        {/* Brand */}
        <div>
          <h1 className="text-2xl font-semibold tracking-wide">VELVETY</h1>
          <p className="text-sm italic">Touch of Essence</p>
        </div>

        {/* Product Bottle */}
        <div className="flex justify-center items-center my-8">
          <Image
            src="/Images/Bottleimage.png"
            alt="Product Bottle"
            width={200}
            height={320}
            className="object-contain w-full max-w-xs"
          />
        </div>

        {/* Optional Slider Controls */}
        <div className="hidden md:block text-center text-gray-600 text-sm">
          ← → navigation (optional slider control)
        </div>
      </div>

      {/* Right side: background image + overlay text */}
      <div
        className="md:w-1/2 relative flex items-center justify-center text-white p-6 sm:p-10"
        style={{
          backgroundImage: `url('/Images/Heroimage.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Navigation Links - moved to top for mobile */}
        <nav className="absolute top-4 left-4 right-4 md:static md:top-auto md:left-auto md:right-auto flex flex-wrap justify-center gap-3 text-xs sm:text-sm bg-black/30 md:bg-transparent py-2 px-4 rounded-b-lg md:rounded-none">
          <Link href="/" className="hover:underline font-medium">PAGES</Link>
          <Link href="/shop" className="hover:underline font-medium">SHOP</Link>
          <Link href="/about" className="hover:underline font-medium">ABOUT</Link>
          <Link href="/login" className="hover:underline font-medium">LOGIN</Link>
          <Link href="/cart" className="hover:underline font-medium">CART (0)</Link>
        </nav>

        {/* Overlay Text + CTA */}
        <div className="text-center mt-16 md:mt-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-snug max-w-md mx-auto">
            Let nature take care of your body and soul
          </h2>
          <button className="mt-6 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition">
            Shop now →
          </button>
        </div>
      </div>
    </section>
  );
}






 






