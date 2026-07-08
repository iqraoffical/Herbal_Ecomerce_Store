"use client";

import { useEffect, useState, useRef } from "react";
import { Users, Award, Leaf, Truck } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function StatItem({ icon, value, suffix, label, delay }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        let start = 0;
        const duration = 2000;
        const increment = value / (duration / 16);
        
        const counter = setInterval(() => {
          start += increment;
          if (start >= value) {
            setCount(value);
            clearInterval(counter);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        
        return () => clearInterval(counter);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, value, delay]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <div className="text-4xl font-bold text-green-800 mb-2">
        {count}{suffix}
      </div>
      <div className="text-gray-600 text-sm font-medium text-center">{label}</div>
    </div>
  );
}

export default function Stats() {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-white" />,
      value: 10000,
      suffix: "+",
      label: "Happy Customers",
      delay: 0,
    },
    {
      icon: <Award className="h-8 w-8 text-white" />,
      value: 100,
      suffix: "%",
      label: "Natural Ingredients",
      delay: 200,
    },
    {
      icon: <Leaf className="h-8 w-8 text-white" />,
      value: 50,
      suffix: "+",
      label: "Herbal Products",
      delay: 400,
    },
    {
      icon: <Truck className="h-8 w-8 text-white" />,
      value: 500,
      suffix: "+",
      label: "Cities Delivered",
      delay: 600,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Trusted by thousands of customers across the country
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
