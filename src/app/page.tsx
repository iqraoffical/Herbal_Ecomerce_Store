import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/feature";
import FeaturedProducts from "./components/FeaturedProducts";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import CTASection from "./components/CTASection";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <FeaturedProducts />
      <Stats />
      <Testimonials />
      <CTASection />
      <Newsletter />
      <Footer />
    </div>
  );
}