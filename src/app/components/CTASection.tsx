"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200 rounded-full opacity-20 translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200 px-4 py-1.5 text-sm font-semibold">
            <Sparkles className="h-4 w-4 mr-1" />
            Limited Time Offer
          </Badge>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Ready to Transform
            <span className="block text-green-700">Your Hair Naturally?</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered the power of pure herbal ingredients 
            for healthier, stronger, and more beautiful hair.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/product">
              <Button 
                size="lg" 
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="bg-white hover:bg-gray-50 text-green-700 border-2 border-green-700 px-8 py-6 text-lg transition-all hover:scale-105"
              >
                Chat on WhatsApp
              </Button>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-700">100%</div>
              <div className="text-sm text-gray-600">Natural</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-700">Free</div>
              <div className="text-sm text-gray-600">Shipping</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-700">30-Day</div>
              <div className="text-sm text-gray-600">Money Back</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-700">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
