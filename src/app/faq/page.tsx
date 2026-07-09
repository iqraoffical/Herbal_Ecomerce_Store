"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const faqs = [
  {
    question: "What makes HerbalHairOil different from other hair oils?",
    answer: "Our herbal hair oil is 100% natural, crafted using ancient Ayurvedic recipes. We use only pure, organic herbs and cold-pressed oils — no chemicals, parabens, or sulfates. Each batch is carefully prepared to preserve the natural potency of every ingredient.",
  },
  {
    question: "How long does it take to see results?",
    answer: "Most customers notice improvements in hair texture and reduced hair fall within 2-4 weeks of regular use. For significant hair growth and thickness, we recommend consistent use for 2-3 months. Results may vary depending on individual hair conditions.",
  },
  {
    question: "How should I apply the herbal hair oil?",
    answer: "Warm a small amount of oil and gently massage into your scalp using circular motions for 5-10 minutes. Apply evenly through your hair length. Leave it on for at least 2 hours or overnight for best results. Wash with a mild herbal shampoo.",
  },
  {
    question: "Is the product suitable for all hair types?",
    answer: "Yes! Our formulation is designed to work with all hair types — straight, wavy, curly, or coily. It's also suitable for both men and women. If you have a specific scalp condition, we recommend doing a patch test first.",
  },
  {
    question: "How often should I use the oil?",
    answer: "For best results, apply the oil 2-3 times per week. Consistent use is key to experiencing the full benefits of the natural ingredients.",
  },
  {
    question: "Do you offer Cash on Delivery (COD)?",
    answer: "Yes, we offer Cash on Delivery across Pakistan. Simply select COD at checkout and pay when your order arrives.",
  },
  {
    question: "What is your delivery time?",
    answer: "We deliver to all cities in Pakistan within 3-7 business days. Orders are processed within 24 hours and dispatched the same or next working day.",
  },
  {
    question: "Can I return or exchange a product?",
    answer: "Yes, we offer returns within 7 days of delivery. If you receive a damaged or incorrect product, contact our support team and we'll arrange a replacement or refund.",
  },
  {
    question: "Are your products tested on animals?",
    answer: "Absolutely not. We are a cruelty-free brand. None of our products or ingredients are tested on animals.",
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach us via WhatsApp at 03077898899, email at info@herbalhairoil.pk, or through the contact form on our website. We typically respond within 5-10 minutes during business hours.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">FAQ</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Everything you need to know about our products and services
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No questions found matching your search.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-5 pb-5 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed mt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            We&apos;re here to help! Contact us and we&apos;ll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/923077898899"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-green-800 font-semibold py-3 px-8 rounded-xl hover:bg-green-50 transition-colors"
            >
              Chat on WhatsApp
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-green-500 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
