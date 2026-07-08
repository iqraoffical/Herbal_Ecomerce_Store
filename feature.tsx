"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, Droplets, Shield, Heart, Sparkles, Sun } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Pure herbal ingredients sourced from nature",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Droplets,
    title: "Deep Nourishment",
    description: "Penetrates deep into hair roots for lasting health",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Shield,
    title: "No Chemicals",
    description: "Free from parabens, sulfates, and harmful additives",
    color: "from-purple-500 to-indigo-600",
  },
  {
    icon: Heart,
    title: "Ayurvedic Formula",
    description: "Ancient wisdom meets modern hair care science",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: Sparkles,
    title: "Visible Results",
    description: "Notice improvements within weeks of regular use",
    color: "from-amber-500 to-yellow-600",
  },
  {
    icon: Sun,
    title: "Suitable for All",
    description: "Gentle enough for daily use on all hair types",
    color: "from-orange-500 to-red-600",
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">
            Featured Products
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Our Products Stand Out
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experience the perfect blend of ancient Ayurvedic wisdom and modern hair care science
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <CardContent className="p-6">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/shop">
            <Button size="lg" className="bg-green-700 hover:bg-green-800 px-8 py-6 text-lg">
              Explore All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
