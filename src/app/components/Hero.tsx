import Image from "next/image";
export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row min-h-screen font-sans">
      {/* Left side: product bottle and brand */}
      <div className="md:w-1/2 bg-[#c7d4c0] p-6 sm:p-12 flex flex-col justify-between">
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
        {/* Overlay Text + CTA */}
        <div className="text-center mt-16 md:mt-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-snug max-w-md mx-auto">
            Let nature take care of your body and soul
          </h2>
          <a href="/shop">
            <button className="mt-6 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition">
              Shop now →
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}






 






