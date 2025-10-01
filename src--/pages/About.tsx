import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Droplets, 
  Users, 
  Award, 
  Shield, 
  Truck, 
  Leaf,
  ArrowLeft,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const stats = [
    { label: "Happy Customers", value: "10,000+", icon: Users },
    { label: "Deliveries Made", value: "50,000+", icon: Truck },
    { label: "Years of Service", value: "8+", icon: Award },
    { label: "Cities Served", value: "25+", icon: MapPin }
  ];

  const values = [
    {
      icon: Droplets,
      title: "Pure Quality",
      description: "We source and deliver only the highest quality, lab-tested water to ensure your family's health and safety."
    },
    {
      icon: Shield,
      title: "Reliable Service",
      description: "Our commitment to reliability means you can count on us for consistent, on-time deliveries every time."
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "We're committed to sustainable practices, using eco-friendly packaging and efficient delivery routes."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction is our priority. We go above and beyond to ensure exceptional customer service."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/placeholder.svg",
      description: "15+ years experience in water purification and logistics"
    },
    {
      name: "Mike Chen",
      role: "Operations Director",
      image: "/placeholder.svg",
      description: "Expert in supply chain management and delivery optimization"
    },
    {
      name: "Emily Davis",
      role: "Quality Assurance Manager",
      image: "/placeholder.svg",
      description: "Certified water quality specialist ensuring product excellence"
    },
    {
      name: "David Wilson",
      role: "Customer Success Lead",
      image: "/placeholder.svg",
      description: "Dedicated to providing exceptional customer experiences"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/products" className="text-foreground hover:text-primary transition-colors">
                Products
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
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
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About AquaFlow
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              We're on a mission to provide pure, fresh water to every home and business, 
              one delivery at a time. Since 2016, we've been the trusted choice for water delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  View Our Products
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-lg px-8 border-white/20 text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2016 by Sarah Johnson, AquaFlow started as a small local business 
                  with a simple goal: to provide families with access to pure, high-quality water 
                  delivered right to their doorstep.
                </p>
                <p>
                  What began as a single delivery truck serving just a few neighborhoods has grown 
                  into a trusted water delivery service spanning 25+ cities. Our commitment to 
                  quality, reliability, and exceptional customer service has earned us the trust 
                  of over 10,000 satisfied customers.
                </p>
                <p>
                  Today, we continue to innovate and expand our services while staying true to 
                  our core values: providing pure water, reliable service, and building lasting 
                  relationships with our customers and communities.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-subtle rounded-2xl flex items-center justify-center">
                <Droplets className="h-32 w-32 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do and shape our commitment to our customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The dedicated professionals behind AquaFlow's success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-white/90 mb-8">
            To provide every customer with pure, fresh water through reliable delivery service, 
            exceptional customer care, and a commitment to environmental sustainability. We believe 
            clean water is a fundamental necessity, and we're dedicated to making it accessible, 
            affordable, and convenient for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Join Our Mission
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8 border-white/20 text-white hover:bg-white/10">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Experience AquaFlow?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of satisfied customers who trust us for their water delivery needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="text-lg px-8">
                Browse Products
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Ask Questions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Droplets className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">AquaFlow</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Premium water delivery service bringing pure, fresh water to your doorstep.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <Link to="/about" className="block text-muted-foreground hover:text-primary">About Us</Link>
                <Link to="/products" className="block text-muted-foreground hover:text-primary">Products</Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-primary">Contact</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Service</h3>
              <div className="space-y-2">
                <Link to="/login" className="block text-muted-foreground hover:text-primary">Login</Link>
                <Link to="/register" className="block text-muted-foreground hover:text-primary">Register</Link>
                <Link to="/dashboard" className="block text-muted-foreground hover:text-primary">Dashboard</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>info@aquaflow.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>123 Water St, City, State</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 AquaFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}