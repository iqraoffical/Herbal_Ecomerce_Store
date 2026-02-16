
import { Gift, Users, Smile } from "lucide-react";

const items = [
  {
    icon: <Gift className="w-10 h-10 text-green-700" />,
    heading: "Loyalty Program",
    subheading: "For Happy Skin",
    button: "Join the program",
  },
  {
    icon: <Users className="w-10 h-10 text-green-700" />,
    heading: "Organic beauty is shared,",
    subheading: "Sponsor those you love!",
    button: "Refer a Friend",
  },
  {
    icon: <Smile className="w-10 h-10 text-green-700" />,
    heading: "Treat yourself to good weather",
    subheading: "at Maison Absolution",
    button: "Try Our Treatments",
  },
];

export default function CTASection() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <div key={index} className="text-center border-t sm:border-t-0 sm:border-l sm:first:border-l-0 px-4 py-6 sm:py-0">
            <div className="flex justify-center mb-4">{item.icon}</div>
            <p className="text-sm text-gray-500">{item.heading}</p>
            <h3 className="text-lg font-medium text-green-900">{item.subheading}</h3>
            <button className="mt-4 inline-flex items-center justify-center px-4 py-2 border border-green-700 text-sm font-medium text-green-700 hover:bg-green-50 transition">
              {item.button}
              <span className="ml-2">→</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
