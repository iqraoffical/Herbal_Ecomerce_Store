import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, Lock, Scale, AlertTriangle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Legal</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Please read these terms carefully before using our website
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 space-y-8">

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">1. Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  Welcome to HerbalHairOil. By accessing or using our website and purchasing our products,
                  you agree to be bound by these Terms & Conditions. If you do not agree with any part of
                  these terms, please do not use our website or services.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Scale className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">2. Products & Orders</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  All products are 100% natural and handmade. While we strive to ensure accuracy,
                  product colors and packaging may vary slightly from images shown on the website.
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Orders are processed within 24 hours of placement</li>
                  <li>We reserve the right to cancel any order due to stock unavailability</li>
                  <li>Prices are subject to change without prior notice</li>
                  <li>Bulk orders may require additional processing time</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">3. Shipping & Delivery</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>We deliver to all cities across Pakistan</li>
                  <li>Standard delivery: 3-7 business days</li>
                  <li>Shipping costs are calculated at checkout</li>
                  <li>Free shipping on orders above Rs. 2,000</li>
                  <li>Risk of loss passes to you upon delivery</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">4. Returns & Refunds</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Returns accepted within 7 days of delivery</li>
                  <li>Products must be unused and in original packaging</li>
                  <li>Refunds are processed within 5-7 business days after inspection</li>
                  <li>Shipping charges for returns are borne by the customer</li>
                  <li>Damaged or incorrect items will be replaced free of charge</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Lock className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">5. Privacy & Security</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Your privacy is important to us. We collect only the information necessary to process
                  your order and improve your shopping experience.
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Your personal information is never shared with third parties</li>
                  <li>Payment information is processed securely</li>
                  <li>We use encrypted connections for data transmission</li>
                  <li>You can request deletion of your data at any time</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">6. Contact Information</h2>
                <p className="text-gray-600 leading-relaxed">
                  For any questions or concerns regarding these terms, please contact us:<br />
                  Email: info@herbalhairoil.pk<br />
                  Phone: 03077898899<br />
                  Address: Karachi, Pakistan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
