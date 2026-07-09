import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Award, Users, Target, Heart, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">About Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Journey to Natural Hair Care</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Bringing ancient Ayurvedic wisdom to modern hair care solutions
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Our Story</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Founded in 2020, HerbalHairOil was born from a simple belief: nature knows best. Our founders, 
              inspired by generations of Ayurvedic tradition, set out to create hair care products that harness 
              the power of pure, natural herbs without harmful chemicals.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Every bottle of our herbal oil is crafted with care, using time-tested recipes passed down through 
              generations of Ayurvedic practitioners. We source the finest herbs from organic farms across Pakistan, 
              ensuring the highest quality in every drop.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Today, we&apos;re proud to serve over 10,000 happy customers who trust us for their hair care needs. 
              Our commitment to natural ingredients and sustainable practices remains unwavering as we continue 
              to grow and innovate.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-800 mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">100% Natural</h3>
                <p className="text-gray-600">
                  We use only pure, organic herbs and natural ingredients. No chemicals, no parabens, no sulfates.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quality First</h3>
                <p className="text-gray-600">
                  Every batch is tested for purity and effectiveness. We never compromise on quality.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Customer Care</h3>
                <p className="text-gray-600">
                  Your satisfaction is our priority. We&apos;re here to support your hair care journey.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                <p className="text-gray-600">
                  Eco-friendly packaging and sustainable sourcing practices for a healthier planet.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-600">
                  Building a community of people who believe in the power of natural hair care.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">
                  Continuously improving our products while staying true to traditional formulas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-800 mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600 text-sm">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-green-200">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-green-200">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-green-200">Cities Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-green-200">Natural</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
