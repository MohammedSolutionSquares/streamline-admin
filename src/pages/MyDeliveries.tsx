import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search,
  Filter,
  MapPin,
  Clock,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Calendar,
  Eye,
  MessageSquare,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";

export default function MyDeliveries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [deliveries] = useState([
    {
      id: "DEL-001",
      orderNumber: "ORD-001",
      status: "In Transit",
      scheduledDate: "2024-01-20",
      scheduledTime: "14:30",
      deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
      items: [
        { name: "5-Gallon Water Can", quantity: 2, price: 12.99 }
      ],
      driver: {
        name: "John Smith",
        phone: "+1 (555) 123-4567",
        vehicle: "Blue Toyota Camry - ABC 123"
      },
      estimatedArrival: "2:45 PM",
      progress: 75,
      notes: "Leave at front door if not home"
    },
    {
      id: "DEL-002",
      orderNumber: "ORD-002",
      status: "Scheduled",
      scheduledDate: "2024-01-21",
      scheduledTime: "10:00",
      deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
      items: [
        { name: "5-Gallon Water Can", quantity: 1, price: 12.99 }
      ],
      driver: null,
      estimatedArrival: "Tomorrow 10:00 AM",
      progress: 0,
      notes: "Ring doorbell"
    },
    {
      id: "DEL-003",
      orderNumber: "ORD-003",
      status: "Delivered",
      scheduledDate: "2024-01-18",
      scheduledTime: "09:30",
      deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
      items: [
        { name: "5-Gallon Water Can", quantity: 3, price: 12.99 }
      ],
      driver: {
        name: "Mike Johnson",
        phone: "+1 (555) 987-6543",
        vehicle: "White Ford Transit - XYZ 789"
      },
      deliveredAt: "2024-01-18T09:25:00Z",
      progress: 100,
      notes: "Delivered successfully"
    },
    {
      id: "DEL-004",
      orderNumber: "ORD-004",
      status: "Cancelled",
      scheduledDate: "2024-01-15",
      scheduledTime: "15:00",
      deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
      items: [
        { name: "5-Gallon Water Can", quantity: 2, price: 12.99 }
      ],
      driver: null,
      progress: 0,
      notes: "Cancelled by customer",
      cancelledAt: "2024-01-15T08:30:00Z"
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Transit":
        return <Truck className="h-4 w-4" />;
      case "Delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "Scheduled":
        return <Calendar className="h-4 w-4" />;
      case "Cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Transit":
        return "bg-blue-500";
      case "Delivered":
        return "bg-green-500";
      case "Scheduled":
        return "bg-yellow-500";
      case "Cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || delivery.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeDeliveries = filteredDeliveries.filter(d => d.status === "In Transit" || d.status === "Scheduled");
  const completedDeliveries = filteredDeliveries.filter(d => d.status === "Delivered" || d.status === "Cancelled");

  return (
    <AdminLayout>
    <div className="min-h-screen bg-muted/20">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="flex items-center gap-2">
              <span className="text-xl font-bold">← Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Deliveries</h1>
          <p className="text-muted-foreground">
            Track and manage all your water delivery orders
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by delivery ID or order number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="in transit">In Transit</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Deliveries Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">
              Active Deliveries ({activeDeliveries.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              History ({completedDeliveries.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {activeDeliveries.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Active Deliveries</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any active deliveries at the moment.
                  </p>
                  <Link to="/order">
                    <Button>Place New Order</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {activeDeliveries.map((delivery) => (
                  <Card key={delivery.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {getStatusIcon(delivery.status)}
                            Delivery #{delivery.id}
                            <Badge 
                              variant="secondary" 
                              className={`${getStatusColor(delivery.status)} text-white`}
                            >
                              {delivery.status}
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            Order #{delivery.orderNumber} • {delivery.items.length} items
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {delivery.estimatedArrival}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Delivery Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <span>{delivery.deliveryAddress}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {new Date(delivery.scheduledDate).toLocaleDateString()} at {delivery.scheduledTime}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Items</h4>
                          <div className="space-y-1 text-sm">
                            {delivery.items.map((item, index) => (
                              <div key={index} className="flex justify-between">
                                <span>{item.name} x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {delivery.driver && (
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-medium mb-2">Driver Information</h4>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-medium">{delivery.driver.name}</p>
                              <p className="text-muted-foreground">{delivery.driver.vehicle}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Phone className="h-4 w-4 mr-1" />
                                Call Driver
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                          {delivery.notes && `Note: ${delivery.notes}`}
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/track/${delivery.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Track Live
                            </Button>
                          </Link>
                          {delivery.status === "Scheduled" && (
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {completedDeliveries.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Delivery History</h3>
                  <p className="text-muted-foreground">
                    Your completed deliveries will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {completedDeliveries.map((delivery) => (
                  <Card key={delivery.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusIcon(delivery.status)}
                            <span className="font-medium">Delivery #{delivery.id}</span>
                            <Badge 
                              variant="secondary" 
                              className={`${getStatusColor(delivery.status)} text-white`}
                            >
                              {delivery.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Order #{delivery.orderNumber} • {delivery.items.length} items
                          </p>
                          <p className="text-sm">
                            {delivery.status === "Delivered" 
                              ? `Delivered on ${new Date(delivery.deliveredAt!).toLocaleDateString()}`
                              : `Cancelled on ${new Date(delivery.cancelledAt!).toLocaleDateString()}`
                            }
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ${delivery.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                          </p>
                          <div className="flex gap-1 mt-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {delivery.status === "Delivered" && (
                              <Button variant="ghost" size="sm">
                                Reorder
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </AdminLayout>
  );
}