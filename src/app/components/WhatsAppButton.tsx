"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { getWhatsAppUrl, getGreetingMessage } from "@/lib/whatsapp";
import { usePathname } from "next/navigation";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsAdmin(pathname?.startsWith("/admin"));
  }, [pathname]);

  const whatsappUrl = getWhatsAppUrl(getGreetingMessage());

  // Don't show on admin pages
  if (isAdmin) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip / Mini Card */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl p-4 w-64 animate-in slide-in-from-bottom-5 fade-in duration-300 border border-gray-100">
          <p className="text-gray-700 text-sm font-medium mb-3">
            👋 Any questions? Chat with us on WhatsApp!
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 hover:shadow-lg"
          >
            <MessageCircle className="h-5 w-5" />
            Start Chat
          </a>
          <p className="text-xs text-gray-400 text-center mt-2">
            We usually reply within 5-10 minutes
          </p>
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
        aria-label="Contact us on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />

        {/* Button */}
        <span className="relative flex items-center justify-center w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-7 w-7" />
          )}
        </span>
      </button>
    </div>
  );
}
