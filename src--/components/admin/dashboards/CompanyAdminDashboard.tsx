import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Truck, Users, DollarSign, MapPin, Clock, TrendingUp, AlertCircle } from "lucide-react";

export function CompanyAdminDashboard() {
  const stats = [
    {
      title: "Today's Orders",
      value: "47",
      change: "+12% from yesterday",
      icon: Package,
      color: "text-primary"
    },
    {
      title: "Active Deliveries",
      value: "23",
      change: "8 completed today",
      icon: Truck,
      color: "text-accent"
    },
    {
      title: "Total Customers",
      value: "1,489",
      change: "+5.2% this month",
      icon: Users,
      color: "text-success"
    },
    {
      title: "Monthly Revenue",
      value: "$12,845",
      change: "+8.1% from last month",
      icon: DollarSign,
      color: "text-warning"
    }
  ];

  const recentOrders = [
    { id: "#ORD-001", customer: "John Smith", address: "123 Main St", status: "preparing", amount: "$24.99", time: "10 min ago" },
    { id: "#ORD-002", customer: "Sarah Johnson", address: "456 Oak Ave", status: "delivering", amount: "$19.99", time: "25 min ago" },
    { id: "#ORD-003", customer: "Mike Wilson", address: "789 Pine Rd", status: "delivered", amount: "$29.99", time: "1 hour ago" },
    { id: "#ORD-004", customer: "Emily Davis", address: "321 Elm St", status: "pending", amount: "$34.99", time: "2 hours ago" },
  ];

  const deliveryUpdates = [
    { driver: "Alex Thompson", orders: 5, area: "Downtown", status: "on_route", eta: "30 min" },
    { driver: "Maria Garcia", orders: 3, area: "Suburbs North", status: "loading", eta: "45 min" },
    { driver: "David Chen", orders: 7, area: "Business District", status: "delivered", eta: "Completed" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'preparing':
        return <Badge variant="secondary">Preparing</Badge>;
      case 'delivering':
        return <Badge className="bg-accent text-accent-foreground">Delivering</Badge>;
      case 'delivered':
        return <Badge className="bg-success text-white">Delivered</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDriverStatusBadge = (status: string) => {
    switch (status) {
      case 'on_route':
        return <Badge className="bg-accent text-accent-foreground">On Route</Badge>;
      case 'loading':
        return <Badge variant="secondary">Loading</Badge>;
      case 'delivered':
        return <Badge className="bg-success text-white">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Company Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your water delivery operations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <MapPin className="h-4 w-4 mr-2" />
            View Map
          </Button>
          <Button size="sm" className="bg-gradient-primary">
            <Package className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Orders */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Latest customer orders and their status
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{order.id}</p>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{order.amount}</p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Delivery Updates */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Delivery Updates</CardTitle>
              <CardDescription>
                Real-time delivery driver status
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              <MapPin className="h-4 w-4 mr-1" />
              Track All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deliveryUpdates.map((delivery, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{delivery.driver}</p>
                    <p className="text-xs text-muted-foreground">
                      {delivery.orders} orders • {delivery.area}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    {getDriverStatusBadge(delivery.status)}
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {delivery.eta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Package className="h-6 w-6" />
              <span>Manage Inventory</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              <span>Add Customer</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Truck className="h-6 w-6" />
              <span>Schedule Delivery</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="h-6 w-6" />
              <span>View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}