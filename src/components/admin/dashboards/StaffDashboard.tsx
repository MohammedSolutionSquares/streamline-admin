import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Truck, MapPin, Clock, User, CheckCircle, Navigation } from "lucide-react";

export function StaffDashboard() {
  const stats = [
    {
      title: "My Deliveries",
      value: "8",
      change: "3 completed today",
      icon: Truck,
      color: "text-primary"
    },
    {
      title: "Pending Orders",
      value: "5",
      change: "Next: 2:30 PM",
      icon: Package,
      color: "text-accent"
    },
    {
      title: "Today's Route",
      value: "12.5 km",
      change: "5 stops remaining",
      icon: MapPin,
      color: "text-success"
    },
    {
      title: "Hours Worked",
      value: "6.2h",
      change: "1.8h remaining",
      icon: Clock,
      color: "text-warning"
    }
  ];

  const myDeliveries = [
    { id: "#DEL-001", customer: "John Smith", address: "123 Main St", status: "completed", time: "10:30 AM" },
    { id: "#DEL-002", customer: "Sarah Johnson", address: "456 Oak Ave", status: "in_progress", time: "2:30 PM" },
    { id: "#DEL-003", customer: "Mike Wilson", address: "789 Pine Rd", status: "pending", time: "3:45 PM" },
    { id: "#DEL-004", customer: "Emily Davis", address: "321 Elm St", status: "pending", time: "4:30 PM" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success text-white">Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-accent text-accent-foreground">In Progress</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tigh text-[#1B3C53]">My Dashboard</h2>
          <p className="text-black/50">
            Track your deliveries and daily tasks
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-[#1B3C53] text-white">
            <Navigation className="h-4 w-4 mr-2" />
            Navigate
          </Button>
          <Button size="sm" className="bg-[#1B3C53]">
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark Complete
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card hover:shadow-elevated transition-shadow bg-[#1B3C53]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 text-white${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-white">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* My Deliveries */}
        <Card className="shadow-card border border-[#1B3C53] bg-white">
          <CardHeader>
            <CardTitle className="text-black">Today's Deliveries</CardTitle>
            <CardDescription className="text-black">
              Your scheduled deliveries for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myDeliveries.map((delivery) => (
                <div key={delivery.id} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-black">{delivery.id}</p>
                      {getStatusBadge(delivery.status)}
                    </div>
                    <p className="text-sm text-black">{delivery.customer}</p>
                    <p className="text-xs text-black">{delivery.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-black">{delivery.time}</p>
                    <Button variant="ghost" size="sm" className="mt-1 bg-[#1B3C53]">
                      <MapPin className="h-3 w-3 mr-1 text-white" />
                      Navigate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance */}
        <Card className="shadow-card border border-[#1B3C53] bg-white">
          <CardHeader>
            <CardTitle className="text-black">Performance</CardTitle>
            <CardDescription className="text-black">
              Your delivery performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="text-black flex justify-between text-sm mb-1">
                  <span>On-time Delivery Rate</span>
                  <span>94%</span>
                </div>
                <div className=" text-black w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full w-[94%]"></div>
                </div>
              </div>
              
              <div>
                <div className="text-black flex justify-between text-sm mb-1">
                  <span>Customer Satisfaction</span>
                  <span>4.8/5</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div className="bg-black h-2 rounded-full w-[96%]"></div>
                </div>
              </div>

              <div>
                <div className="text-black flex justify-between text-sm mb-1">
                  <span>Route Efficiency</span>
                  <span>88%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full w-[88%]"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card bg-[#1B3C53]">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription className="text-white/50">
            Common delivery tasks and tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-white">
              <Navigation className="h-6 w-6 text-black" />
              <span className="text-black">Start Route</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-white">
              <CheckCircle className="h-6 w-6 text-black" />
              <span className="text-black">Mark Delivered</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-white">
              <User className="h-6 w-6 text-black" />
              <span className="text-black">Contact Customer</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-white">
              <Clock className="h-6 w-6 text-black" />
              <span className="text-black">Break Time</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}