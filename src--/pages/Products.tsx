import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Droplets, 
  ShoppingCart, 
  Star, 
  Check,
  ArrowLeft,
  Filter,
  Search
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Products() {
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const products = [
    {
      id: "prod-1",
      name: "5-Gallon Premium Water Can",
      description: "Pure, filtered water in a 5-gallon container. Perfect for home and office use.",
      price: 12.99,
      category: "water-cans",
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 124,
      features: ["BPA-Free", "UV Sterilized", "Lab Tested", "Fresh Taste"],
      popular: true
    },
    {
      id: "prod-2",
      name: "3-Gallon Compact Water Can",
      description: "Compact 3-gallon water container ideal for smaller spaces and families.",
      price: 8.99,
      category: "water-cans",
      image: "/placeholder.svg",
      rating: 4.6,
      reviews: 89,
      features: ["Space Saving", "Easy Handle", "BPA-Free", "Fresh Taste"]
    },
    {
      id: "prod-3",
      name: "1-Gallon Personal Water Jug",
      description: "Perfect for personal use or small families. Easy to carry and store.",
      price: 3.99,
      category: "water-cans",
      image: "/placeholder.svg",
      rating: 4.5,
      reviews: 67,
      features: ["Portable", "Individual Serving", "BPA-Free", "Fresh Taste"]
    },
    {
      id: "prod-4",
      name: "Water Dispenser Stand",
      description: "Sturdy stand for your water cans with easy dispensing mechanism.",
      price: 24.99,
      category: "equipment",
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 45,
      features: ["Durable Steel", "Easy Assembly", "Non-Slip Base", "Universal Fit"]
    },
    {
      id: "prod-5",
      name: "Electric Water Pump",
      description: "Automatic electric pump for easy water dispensing from any can size.",
      price: 39.99,
      category: "equipment",
      image: "/placeholder.svg",
      rating: 4.4,
      reviews: 33,
      features: ["Rechargeable", "LED Indicator", "Universal Fit", "Quiet Operation"]
    },
    {
      id: "prod-6",
      name: "Weekly Subscription Plan",
      description: "Get 2x 5-gallon water cans delivered every week at a discounted rate.",
      price: 22.99,
      originalPrice: 25.98,
      category: "subscriptions",
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 156,
      features: ["Auto Delivery", "10% Savings", "Flexible Schedule", "Free Delivery"],
      subscription: true,
      popular: true
    },
    {
      id: "prod-7",
      name: "Monthly Subscription Plan",
      description: "Monthly delivery of 8x 5-gallon water cans with maximum savings.",
      price: 89.99,
      originalPrice: 103.92,
      category: "subscriptions",
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 98,
      features: ["Best Value", "15% Savings", "Priority Support", "Free Delivery"],
      subscription: true
    }
  ];

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) - 1)
    }));
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const waterCans = filteredProducts.filter(p => p.category === "water-cans");
  const equipment = filteredProducts.filter(p => p.category === "equipment");
  const subscriptions = filteredProducts.filter(p => p.category === "subscriptions");

  const ProductCard = ({ product }: { product: typeof products[0] }) => (
    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
      {product.popular && (
        <Badge className="absolute top-4 left-4 z-10 bg-gradient-primary">
          Popular
        </Badge>
      )}
      <div className="aspect-square bg-muted/20 flex items-center justify-center">
        <Droplets className="h-16 w-16 text-primary" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <CardDescription className="mt-1">{product.description}</CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1">
            {product.features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through ml-2">
                  ${product.originalPrice}
                </span>
              )}
              {product.subscription && (
                <span className="text-sm text-muted-foreground block">per delivery</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart[product.id] > 0 ? (
              <div className="flex items-center gap-2 flex-1">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => removeFromCart(product.id)}
                >
                  -
                </Button>
                <span className="flex-1 text-center font-medium">
                  {cart[product.id]}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => addToCart(product.id)}
                >
                  +
                </Button>
              </div>
            ) : (
              <Button 
                className="flex-1"
                onClick={() => addToCart(product.id)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Button variant="outline" className="relative">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart ({getCartItemCount()})
                  {getCartItemCount() > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">
                      {getCartItemCount()}
                    </Badge>
                  )}
                </Button>
              </div>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Our Products</h1>
          <p className="text-muted-foreground">
            Premium water delivery products and subscription plans
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="water-cans">Water Cans</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="subscriptions">Subscriptions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Shopping Cart Summary */}
        {getCartItemCount() > 0 && (
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Cart Summary</p>
                  <p className="text-sm text-muted-foreground">
                    {getCartItemCount()} items • Total: ${getCartTotal().toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">View Cart</Button>
                  <Link to="/checkout">
                    <Button>Checkout</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Products ({filteredProducts.length})</TabsTrigger>
            <TabsTrigger value="water-cans">Water Cans ({waterCans.length})</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions ({subscriptions.length})</TabsTrigger>
            <TabsTrigger value="equipment">Equipment ({equipment.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="water-cans" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {waterCans.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-6">
            <div className="mb-6 p-6 bg-gradient-primary text-white rounded-lg">
              <h2 className="text-2xl font-bold mb-2">Save with Subscriptions</h2>
              <p className="text-white/90">
                Get regular deliveries and save up to 15% on your water orders. 
                Cancel or modify anytime.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subscriptions.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="equipment" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {equipment.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}