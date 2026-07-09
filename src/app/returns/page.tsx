"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Package, RefreshCw, ShieldCheck, Clock, MessageCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Returns</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Returns & Exchanges</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            We want you to love your purchase. If something&apos;s not right, we&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Policy */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <RefreshCw className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">7-Day Returns</h3>
                <p className="text-gray-600 text-sm">Return unused products within 7 days of delivery for a full refund.</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <ShieldCheck className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Free Replacement</h3>
                <p className="text-gray-600 text-sm">Damaged or incorrect items? We&apos;ll replace them at no extra cost.</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <Clock className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Quick Processing</h3>
                <p className="text-gray-600 text-sm">Refunds processed within 5-7 business days after inspection.</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Easy Process</h3>
                <p className="text-gray-600 text-sm">Just contact us on WhatsApp and we&apos;ll guide you through the process.</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Policy</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Products must be unused, unopened, and in original packaging.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Return requests must be made within 7 days of delivery.</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Shipping charges for returns are borne by the customer (except for damaged/incorrect items).</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="font-semibold text-green-800 mb-2">Need Help?</h3>
              <p className="text-green-700 mb-4">Contact us on WhatsApp for quick assistance with your return.</p>
              <a
                href="https://wa.me/923077898899"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors"
              >
                <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
