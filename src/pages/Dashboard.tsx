import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Droplets, 
  Package, 
  Clock, 
  MapPin, 
  Calendar, 
  TrendingUp,
  ShoppingCart,
  Bell,
  User,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [activeDeliveries] = useState([
    {
      id: "DEL-001",
      status: "In Transit",
      expectedTime: "2:30 PM",
      items: "5 Gallon Water Can x 2",
      driver: "John Smith",
      progress: 75
    },
    {
      id: "DEL-002",
      status: "Scheduled",
      expectedTime: "Tomorrow 10:00 AM",
      items: "5 Gallon Water Can x 1",
      driver: "Not Assigned",
      progress: 0
    }
  ]);

  const [recentOrders] = useState([
    {
      id: "ORD-001",
      date: "2024-01-15",
      items: "5 Gallon Water Can x 2",
      total: 24.99,
      status: "Delivered"
    },
    {
      id: "ORD-002",
      date: "2024-01-12",
      items: "5 Gallon Water Can x 1",
      total: 12.99,
      status: "Delivered"
    },
    {
      id: "ORD-003",
      date: "2024-01-10",
      items: "5 Gallon Water Can x 3",
      total: 36.99,
      status: "Delivered"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Transit":
        return "bg-blue-500";
      case "Delivered":
        return "bg-green-500";
      case "Scheduled":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Droplets className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">WaterSquares</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">
            Manage your water deliveries and track your orders
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Deliveries</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">$124.97</p>
                </div>
                <Droplets className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Next Delivery</p>
                  <p className="text-2xl font-bold">Today</p>
                </div>
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="deliveries" className="space-y-6">
          <TabsList>
            <TabsTrigger value="deliveries">Active Deliveries</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
          </TabsList>

          <TabsContent value="deliveries" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Active Deliveries</h2>
              <Link to="/order">
                <Button>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  New Order
                </Button>
              </Link>
            </div>

            <div className="grid gap-6">
              {activeDeliveries.map((delivery) => (
                <Card key={delivery.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          Order #{delivery.id}
                          <Badge 
                            variant="secondary" 
                            className={`${getStatusColor(delivery.status)} text-white`}
                          >
                            {delivery.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription>{delivery.items}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {delivery.expectedTime}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        Driver: {delivery.driver}
                      </div>
                      
                      {delivery.status === "In Transit" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Delivery Progress</span>
                            <span>{delivery.progress}%</span>
                          </div>
                          <Progress value={delivery.progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Link to={`/track/${delivery.id}`}>
                          <Button variant="outline" size="sm">
                            Track Order
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          Contact Driver
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-2xl font-bold">Order History</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your recent water delivery orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm">{order.items}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.total}</p>
                        <Badge variant="outline" className="text-xs">
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            <h2 className="text-2xl font-bold">Subscription Management</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Your active subscription details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Weekly Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        2x 5-Gallon Water Cans every Monday
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">$24.99/week</p>
                      <p className="text-sm text-muted-foreground">
                        Next delivery: Monday, Jan 22
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">Modify Plan</Button>
                      <Button variant="outline" size="sm">Pause Subscription</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Schedule</CardTitle>
                  <CardDescription>Upcoming scheduled deliveries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Mon, Jan 22</span>
                      </div>
                      <Badge variant="outline">Scheduled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Mon, Jan 29</span>
                      </div>
                      <Badge variant="outline">Scheduled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Mon, Feb 5</span>
                      </div>
                      <Badge variant="outline">Scheduled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}