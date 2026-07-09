import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Database, Cookie, Mail, Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Privacy</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            How we collect, use, and protect your personal information
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Eye className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">1. Information We Collect</h2>
                <p className="text-gray-600 leading-relaxed mb-3">We collect only the information necessary to process your orders:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>Name and contact information (phone, email)</li>
                  <li>Shipping address</li>
                  <li>Order history</li>
                  <li>Payment information (processed securely, not stored)</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Database className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">2. How We Use Your Information</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>To process and deliver your orders</li>
                  <li>To communicate with you about your order status</li>
                  <li>To improve our products and services</li>
                  <li>To send promotional offers (only with your consent)</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">3. Data Protection</h2>
                <p className="text-gray-600 leading-relaxed">
                  We implement security measures to protect your personal information. Your data is stored
                  securely and is never shared with third parties without your consent, except as required by law.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Cookie className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">4. Cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  We use cookies to improve your browsing experience and analyze site traffic. You can control
                  cookie preferences through your browser settings.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">5. Contact Us</h2>
                <p className="text-gray-600 leading-relaxed">
                  For privacy-related inquiries:<br />
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
