import Image from "next/image";
export default function SecondSec() {
  return (
    <section className="w-full bg-white">
      <div className="flex flex-col md:flex-row w-full">
        {/* left */}
        <div className="md:w-1/2 px-4 py-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center max-w-xl mx-auto">
            Inspired by traditional <br /> knowledge and nature
          </h2>

          <div className="flex justify-center items-center mt-8 md:mt-20">
            <Image
              src="/Images/leafimg.png"
              alt="leaf"
              width={250}
              height={150}
              className="w-full max-w-xs object-contain"
            />
          </div>
        </div>

        {/* Right */}
        <div className="md:w-1/2 flex flex-col gap-6 bg-gray-100 p-5">
          {/* Feature 1 */}
          <div className="flex items-start gap-4">
            <Image
              src="/Images/Organic.png"
              alt="icon"
              width={41.63}
              height={41.63}
              className="w-10 h-10"
            />
            <div>
              <h3 className="font-bold mb-1">100% Organic</h3>
              <p>Crafted with the finest natural ingredients.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-4">
            <Image
              src="/Images/skin.png"
              alt="icon"
              width={41.63}
              height={41.63}
              className="w-10 h-10"
            />
            <div>
              <h3 className="font-bold mb-1">Fits your skin</h3>
              <p>Backed by traditional knowledge & science.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-4">
            <Image
              src="/Images/serum.png"
              alt="icon"
              width={41.63}
              height={41.63}
              className="w-10 h-10"
            />
            <div>
              <h3 className="font-bold mb-1">Easy to use</h3>
              <p>Elegant, useful design to simplify your skincare routine.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
