"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Leaf, Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/product" },
      { label: "Shop", href: "/shop" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    support: [
      { label: "Delivery Info", href: "/delivery" },
      { label: "Returns", href: "/returns" },
      { label: "FAQ", href: "/faq" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/herbalhairoil", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/herbalhairoil", label: "Facebook" },
    // { icon: Twitter, href: "https://twitter.com/herbalhairoil", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com/herbalhairoil", label: "YouTube" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-green-500" />
              <h3 className="text-2xl font-bold text-white">HerbalHairOil</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Pure, natural herbal hair care products crafted with ancient Ayurvedic wisdom. 
              Experience the power of nature for healthier, stronger hair.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-green-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-green-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Karachi,Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-500 flex-shrink-0" />
                <a href="tel:+923077898899" className="text-sm hover:text-green-400 transition-colors">
                  03077898899
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-500 flex-shrink-0" />
                <a href="mailto:info@herbalhairoil.pk" className="text-sm hover:text-green-400 transition-colors">
                  info@herbalhairoil.pk
                </a>
              </li>
            </ul>

            {/* Payment Methods */}
            <div className="mt-6">
              <p className="text-sm mb-2 text-gray-400">We Accept</p>
              <div className="flex gap-2 flex-wrap">
                <div className="bg-white px-3 py-1.5 rounded text-xs font-semibold text-gray-700">VISA</div>
                {/* <div className="bg-white px-3 py-1.5 rounded text-xs font-semibold text-gray-700">MasterCard</div> */}
                <div className="bg-white px-3 py-1.5 rounded text-xs font-semibold text-gray-700">COD</div>
                {/* <div className="bg-white px-3 py-1.5 rounded text-xs font-semibold text-gray-700">PayPal</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-700" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-center md:text-left">
            © {currentYear} HerbalHairOil. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <span>Made with</span>
            <span className="text-red-500">❤</span>
            <span>for healthy hair</span>
            <Link href="/admin" className="text-gray-600 hover:text-green-500 transition-colors text-xs">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
