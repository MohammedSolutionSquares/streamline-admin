import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Truck, Clock, Shield, Star, Users, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    {
      icon: Droplets,
      title: "Fast Implementation",
      description: "Help to grow your business more faster than old traditional method"
    },
    {
      icon: Truck,
      title: "Easy to Manage",
      description: "Easy to manage for supplier"
    },
    {
      icon: Clock,
      title: "Flexible Timing",
      description: "Schedule deliveries at your convenience"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Hygienically sealed and quality tested water"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Excellent service! Always on time and the water quality is outstanding."
    },
    {
      name: "Mike Chen",
      rating: 5,
      comment: "Very reliable delivery service. Highly recommended!"
    },
    {
      name: "Emily Davis",
      rating: 5,
      comment: "Great customer service and competitive prices."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white text-black backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Droplets className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-[#5854FF]">WaterSquares</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {/* <Link to="/products" className="text-black hover:text-primary transition-colors">Products</Link> */}
              <Link to="/about" className="hover:text-primary transition-colors text-[#5854FF]">About</Link>
              <Link to="/contact" className="hover:text-primary transition-colors text-[#5854FF]">Contact</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="bg-blue-500 text-white bg-[#5854FF]">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-[#5854FF]">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-20"
        style={{
          backgroundImage: "url('/Water.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <div className="absolute inset-0 bg-black/30"></div> */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            More Reliability & Flexibility <br />
            <span className="text-white">For Supplier</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto drop-shadow-md">
            "Reliable and flexible water management, all in one system."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 bg-white text-[#5854FF] font-semibold hover:bg-[#f4f4ff]"
              >
                Join Us
              </Button>
            </Link>
            <Link to="/products">
              <Button
                size="lg"
                className="text-lg px-8 border-white/50 bg-transparent text-white bg-white text-[#5854FF]">
                View Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>



      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#5854FF]">Why Choose WaterSquares?</h2>
            <p className="text-xl max-w-2xl mx-auto text-black/50">
              We provide the best services experience with our top-notch features.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center bg-[#5854FF] hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-white mx-auto mb-4" />
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#5854FF] text-white"
        style={{
          backgroundImage: "url('/Water.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-white/50">Happy Supplier's Join Our System</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-white/50">Deliveries Made</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">70.9%</div>
              <div className="text-white/50">Business Improvment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#5854FF]">What Our Customers Say</h2>
            <p className="text-xl text-black/50">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-[#5854FF]">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-orange-400 text-white" />
                    ))}
                  </div>
                  <CardTitle className="text-lg text-white">{testimonial.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#5854FF]"
        style={{
          backgroundImage: "url('/Water.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Supplier Business Connect With Our System?
          </h2>
          <p className="text-xl text-white/50 mb-8">
            Join thousands of satisfied suppliers who trust us for their daily needs
          </p>
          <Link to="/register">
            <Button size="lg" className="text-lg bg-white px-8 text-[#5854FF]">
              Start Your Subscription Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Droplets className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-[#5854FF]">WaterSquares</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Premium water delivery service bringing pure, fresh water to your doorstep.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-[#5854FF]">Quick Links</h3>
              <div className="space-y-2">
                {/* <Link to="/products" className="block text-muted-foreground hover:text-primary">Products</Link> */}
                <Link to="/about" className="block text-muted-foreground hover:text-primary">About Us</Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-primary">Contact</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-[#5854FF]">Account</h3>
              <div className="space-y-2">
                <Link to="/login" className="block text-muted-foreground hover:text-primary">Login</Link>
                <Link to="/register" className="block text-muted-foreground hover:text-primary">Register</Link>
                <Link to="/dashboard" className="block text-muted-foreground hover:text-primary">Dashboard</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-[#5854FF]">Contact Info</h3>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>123 Water St, City, State</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 WaterSquares. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}