import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Truck, Clock, Shield, Star, Users, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    {
      icon: Droplets,
      title: "Pure & Fresh Water",
      description: "Premium quality water delivered fresh to your doorstep"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Same-day delivery available across the city"
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
              <span className="text-xl font-bold">WaterSquares</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {/* <Link to="/products" className="text-black hover:text-primary transition-colors">Products</Link> */}
              <Link to="/about" className="text-black hover:text-primary transition-colors">About</Link>
              <Link to="/contact" className="text-black hover:text-primary transition-colors">Contact</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="bg-blue-500 text-white">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              More Reliability & Flexibility <br />
              <span className="text-white">For Supplier</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-3xl mx-auto">
             "Reliable and flexible water management, all in one system."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Join Us
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="text-lg px-8 border-white/20 text-white hover:bg-white/10">
                  View Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-blue-500 font-bold mb-4">Why Choose WaterSquares?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide the best services experience with our top-notch features.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center bg-blue-500 hover:shadow-lg transition-shadow">
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
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-white/80">Happy Supplier's Join Our System</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-white/80">Deliveries Made</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">70.9%</div>
              <div className="text-white/80">Business Improvment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-500">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-blue-500">
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
      <section className="py-20 bg-blue-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Supplier Business Connect With Our System?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of satisfied suppliers who trust us for their daily needs
          </p>
          <Link to="/register">
            <Button size="lg" className="text-lg bg-white text-blue-500 px-8">
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
                <span className="text-lg font-bold text-blue-500">WaterSquares</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Premium water delivery service bringing pure, fresh water to your doorstep.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-blue-500">Quick Links</h3>
              <div className="space-y-2">
                {/* <Link to="/products" className="block text-muted-foreground hover:text-primary">Products</Link> */}
                <Link to="/about" className="block text-muted-foreground hover:text-primary">About Us</Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-primary">Contact</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-blue-500">Account</h3>
              <div className="space-y-2">
                <Link to="/login" className="block text-muted-foreground hover:text-primary">Login</Link>
                <Link to="/register" className="block text-muted-foreground hover:text-primary">Register</Link>
                <Link to="/dashboard" className="block text-muted-foreground hover:text-primary">Dashboard</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-blue-500">Contact Info</h3>
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