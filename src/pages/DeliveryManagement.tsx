import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Truck, 
  MapPin, 
  Clock, 
  User, 
  Package, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Eye,
  Edit,
  Users,
  BarChart3
} from "lucide-react";
import { useOrders } from "@/contexts/OrdersContext";
import { useRole } from "@/contexts/RoleContext";
import { Order, OrderStatus, DeliveryDriver } from "@/types/orders";
import { DeliveryAssignment } from "@/components/admin/deliveries/DeliveryAssignment";
import { DeliveryTracking } from "@/components/admin/deliveries/DeliveryTracking";
import { DeliveryBoyManagement } from "@/components/admin/deliveries/DeliveryBoyManagement";

export function DeliveryManagement() {
  const { 
    getActiveDeliveries, 
    getDeliveryMetrics, 
    drivers, 
    getDeliveriesByDriver,
    getOrdersByCompany 
  } = useOrders();
  const { user } = useRole();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedDriver, setSelectedDriver] = useState<string>("all");
  const [isAssignmentOpen, setIsAssignmentOpen] = useState(false);

  const companyId = user?.companyId || '1';
  const activeDeliveries = getActiveDeliveries(companyId);
  const deliveryMetrics = getDeliveryMetrics(companyId);
  const companyDrivers = drivers.filter(driver => driver.companyId === companyId);
  const companyOrders = getOrdersByCompany(companyId);

  const filteredDeliveries = selectedDriver === "all" 
    ? activeDeliveries 
    : getDeliveriesByDriver(selectedDriver);

  const getStatusBadge = (status: OrderStatus) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-orange-100 text-orange-800',
      ready: 'bg-purple-100 text-purple-800',
      in_transit: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    return (
      <Badge className={colors[status]}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const getDriverStatusBadge = (driver: DeliveryDriver) => {
    const driverDeliveries = getDeliveriesByDriver(driver.id);
    const activeCount = driverDeliveries.filter(d => 
      d.status === 'confirmed' || d.status === 'preparing' || 
      d.status === 'ready' || d.status === 'in_transit'
    ).length;

    if (activeCount === 0) {
      return <Badge className="bg-green-100 text-green-800">Available</Badge>;
    } else if (activeCount < 3) {
      return <Badge className="bg-yellow-100 text-yellow-800">Busy</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">Overloaded</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#1B3C53]">Delivery Management</h2>
            <p className="text-black/50">
              Track and manage delivery operations and drivers
            </p>
          </div>
          <Dialog open={isAssignmentOpen} onOpenChange={setIsAssignmentOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Assign Delivery
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Assign Delivery</DialogTitle>
                <DialogDescription>
                  Assign orders to delivery drivers
                </DialogDescription>
              </DialogHeader>
              <DeliveryAssignment 
                onClose={() => setIsAssignmentOpen(false)}
                onSuccess={() => setIsAssignmentOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#1B3C53]">
                Active Deliveries
              </CardTitle>
              <Truck className="h-4 w-4 text-[#1B3C53]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1B3C53]">{deliveryMetrics.activeDeliveries}</div>
              <p className="text-xs text-black/50">
                {deliveryMetrics.completedToday} completed today
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#1B3C53]">
                Pending Assignments
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-[#1B3C53]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1B3C53]">{deliveryMetrics.pendingAssignments}</div>
              <p className="text-xs text-black/50">
                Need driver assignment
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#1B3C53]">
                Total Deliveries
              </CardTitle>
              <Package className="h-4 w-4 text-[#1B3C53]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1B3C53]">{deliveryMetrics.totalDeliveries}</div>
              <p className="text-xs text-black/50">
                All time deliveries
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#1B3C53]">
                Available Drivers
              </CardTitle>
              <Users className="h-4 w-4 text-[#1B3C53]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1B3C53]">
                {companyDrivers.filter(driver => {
                  const driverDeliveries = getDeliveriesByDriver(driver.id);
                  const activeCount = driverDeliveries.filter(d => 
                    d.status === 'confirmed' || d.status === 'preparing' || 
                    d.status === 'ready' || d.status === 'in_transit'
                  ).length;
                  return activeCount === 0;
                }).length}
              </div>
              <p className="text-xs text-black/50">
                Ready for assignment
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-[#1B3C53]">Active Deliveries</CardTitle>
                <CardDescription>
                  Current deliveries in progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by driver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Drivers</SelectItem>
                      {companyDrivers.map((driver) => (
                        <SelectItem key={driver.id} value={driver.id}>
                          {driver.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order #</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>ETA</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDeliveries.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                            No active deliveries found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredDeliveries.map((delivery) => {
                          const driver = companyDrivers.find(d => d.id === delivery.assignedDriver);
                          return (
                            <TableRow key={delivery.id}>
                              <TableCell className="font-medium">{delivery.orderNumber}</TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{delivery.customerName}</div>
                                  <div className="text-sm text-gray-500">{delivery.contactNumber}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                {driver ? (
                                  <div>
                                    <div className="font-medium">{driver.name}</div>
                                    <div className="text-sm text-gray-500">{driver.vehicleType}</div>
                                  </div>
                                ) : (
                                  <span className="text-gray-500">Unassigned</span>
                                )}
                              </TableCell>
                              <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{delivery.city}</div>
                                  <div className="text-sm text-gray-500">{delivery.deliveryAddress}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                {delivery.deliveryTime ? (
                                  <div>
                                    <div className="text-sm">{delivery.deliveryTime}</div>
                                    <div className="text-xs text-gray-500">{delivery.deliveryDate}</div>
                                  </div>
                                ) : (
                                  <span className="text-gray-500">Not scheduled</span>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Live Tracking Tab */}
          <TabsContent value="tracking">
            <DeliveryTracking />
          </TabsContent>

          {/* Drivers Tab */}
          <TabsContent value="drivers">
            <DeliveryBoyManagement />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-[#1B3C53]">Delivery Analytics</CardTitle>
                <CardDescription>
                  Performance metrics and driver utilization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#1B3C53]">Driver Utilization</h3>
                    {companyDrivers.map((driver) => {
                      const driverDeliveries = getDeliveriesByDriver(driver.id);
                      const activeCount = driverDeliveries.filter(d => 
                        d.status === 'confirmed' || d.status === 'preparing' || 
                        d.status === 'ready' || d.status === 'in_transit'
                      ).length;
                      const completedCount = driverDeliveries.filter(d => d.status === 'delivered').length;
                      
                      return (
                        <div key={driver.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <div className="font-medium">{driver.name}</div>
                            <div className="text-sm text-gray-500">{driver.vehicleType} • {driver.capacity}L capacity</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{activeCount} active</div>
                            <div className="text-sm text-gray-500">{completedCount} completed</div>
                            {getDriverStatusBadge(driver)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#1B3C53]">Delivery Status Distribution</h3>
                    <div className="space-y-3">
                      {Object.entries(deliveryMetrics.driverUtilization).map(([driverId, count]) => {
                        const driver = companyDrivers.find(d => d.id === driverId);
                        if (!driver) return null;
                        
                        return (
                          <div key={driverId} className="flex items-center justify-between">
                            <span className="text-sm">{driver.name}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-[#1B3C53] h-2 rounded-full" 
                                  style={{ width: `${Math.min((count / 10) * 100, 100)}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{count}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
