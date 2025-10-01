import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowLeft,
  Send,
  MessageSquare,
  HeadphonesIcon,
  FileQuestion
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "",
        message: ""
      });
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our customer service team",
      contact: "+1 (555) 123-4567",
      availability: "Mon-Fri 8AM-8PM, Sat-Sun 9AM-5PM"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      contact: "support@aquaflow.com",
      availability: "Response within 24 hours"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with us in real-time",
      contact: "Available on website",
      availability: "Mon-Fri 9AM-6PM"
    },
    {
      icon: HeadphonesIcon,
      title: "Emergency Line",
      description: "For urgent delivery issues",
      contact: "+1 (555) 911-AQUA",
      availability: "24/7 Emergency Support"
    }
  ];

  const faqs = [
    {
      question: "What are your delivery areas?",
      answer: "We currently deliver to 25+ cities across the region. Check our coverage map or contact us to confirm delivery to your location."
    },
    {
      question: "How do I schedule a delivery?",
      answer: "You can schedule deliveries through our website, mobile app, or by calling our customer service line. We offer flexible scheduling options."
    },
    {
      question: "What if I'm not home during delivery?",
      answer: "We offer safe drop-off options and can coordinate with you for alternative delivery arrangements. You can also reschedule easily."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5 text-[#1B3C53]" />
              <span className="font-medium text-[#1B3C53]">Back to Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/about" className="text-[#1B3C53] transition-colors">
                About
              </Link>
              {/* <Link to="/products" className="text-black hover:text-primary transition-colors">
                Products
              </Link> */}
              <Link to="/login">
                <Button className="bg-[#1B3C53]">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-[#1B3C53]">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-[#1B3C53]">Contact Us</h1>
          <p className="text-xl text-black/50 max-w-2xl mx-auto">
            Have questions about our services? Need help with your delivery?
            We're here to help and would love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-[#1B3C53]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send us a Message
                </CardTitle>
                <CardDescription className="text-white/50">
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        className="bg-white text-black"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        className="bg-white text-black"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        className="bg-white text-black"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                        <SelectTrigger className="bg-white text-black">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black">
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="delivery">Delivery Question</SelectItem>
                          <SelectItem value="billing">Billing Support</SelectItem>
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      className="bg-white text-black"
                      placeholder="Brief description of your inquiry"
                      value={formData.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      className="bg-white text-black"
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-white text-[#1B3C53]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <Card className="bg-[#1B3C53]">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription className="text-white/50">Choose the best way to reach us</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#1B3C53] rounded-lg flex items-center justify-center flex-shrink-0">
                      <method.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1 text-white">{method.title}</h3>
                      <p className="text-sm text-white/50 mb-1">{method.description}</p>
                      <p className="text-sm font-medium text-white/50">{method.contact}</p>
                      <p className="text-xs text-muted-foreground text-white">{method.availability}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="bg-[#1B3C53]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Monday - Friday</span>
                    <span className="text-sm font-medium">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Saturday</span>
                    <span className="text-sm font-medium">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sunday</span>
                    <span className="text-sm font-medium">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-white/50">Emergency Support</span>
                      <span className="text-sm font-medium text-white/50">24/7</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="bg-[#1B3C53]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">AquaFlow Headquarters</p>
                    <p className="text-sm text-white/50">
                      123 Water Street<br />
                      Suite 200<br />
                      AquaCity, State 12345<br />
                      United States
                    </p>
                  </div>
                  <Button size="sm" className="w-full bg-white text-[#1B3C53]">
                    <MapPin className="h-4 w-4 mr-2 text-[#1B3C53]" />
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card className="bg-[#5854FF]"
            style={{
              backgroundImage: "url('/Water.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileQuestion className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription className="text-white">Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-medium">{faq.question}</h3>
                    <p className="text-sm text-white">{faq.answer}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-sm text-white mb-4">
                  Can't find what you're looking for?
                </p>
                <Button className="bg-white text-[#1B3C53]">View All FAQs</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}