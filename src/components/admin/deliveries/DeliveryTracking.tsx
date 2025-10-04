import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  MapPin, 
  Clock, 
  Truck, 
  User, 
  Phone,
  Navigation,
  CheckCircle,
  AlertCircle,
  Package
} from "lucide-react";
import { useOrders } from "@/contexts/OrdersContext";
import { useRole } from "@/contexts/RoleContext";
import { Order, OrderStatus } from "@/types/orders";

export function DeliveryTracking() {
  const { 
    getActiveDeliveries, 
    drivers, 
    updateDeliveryStatus,
    getDeliveriesByDriver 
  } = useOrders();
  const { user } = useRole();
  const [selectedDriver, setSelectedDriver] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');

  const companyId = user?.companyId || '1';
  const activeDeliveries = getActiveDeliveries(companyId);
  const companyDrivers = drivers.filter(driver => driver.companyId === companyId);

  const filteredDeliveries = activeDeliveries.filter(delivery => {
    const matchesDriver = selectedDriver === "all" || delivery.assignedDriver === selectedDriver;
    const matchesStatus = statusFilter === "all" || delivery.status === statusFilter;
    return matchesDriver && matchesStatus;
  });

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

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'preparing':
        return <Package className="h-4 w-4 text-orange-600" />;
      case 'ready':
        return <Truck className="h-4 w-4 text-purple-600" />;
      case 'in_transit':
        return <Navigation className="h-4 w-4 text-indigo-600" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: OrderStatus) => {
    updateDeliveryStatus(orderId, newStatus);
  };

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    const statusFlow: Record<OrderStatus, OrderStatus | null> = {
      pending: 'confirmed',
      confirmed: 'preparing',
      preparing: 'ready',
      ready: 'in_transit',
      in_transit: 'delivered',
      delivered: null,
      cancelled: null
    };
    return statusFlow[currentStatus];
  };

  const getEstimatedTime = (delivery: Order) => {
    if (delivery.deliveryTime && delivery.deliveryDate) {
      const deliveryDateTime = new Date(`${delivery.deliveryDate}T${delivery.deliveryTime}`);
      const now = new Date();
      const diffMinutes = Math.floor((deliveryDateTime.getTime() - now.getTime()) / (1000 * 60));
      
      if (diffMinutes < 0) {
        return "Overdue";
      } else if (diffMinutes < 60) {
        return `${diffMinutes} min`;
      } else {
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        return `${hours}h ${minutes}m`;
      }
    }
    return "Not scheduled";
  };

  return (
    <div className="space-y-6">
      {/* Live Tracking Header */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#1B3C53]">
            <Navigation className="h-5 w-5" />
            Live Delivery Tracking
          </CardTitle>
          <CardDescription>
            Real-time tracking of active deliveries and driver locations
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
            
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as OrderStatus | 'all')}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Delivery Status Overview */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            {['confirmed', 'preparing', 'ready', 'in_transit'].map((status) => {
              const count = activeDeliveries.filter(d => d.status === status).length;
              return (
                <div key={status} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#1B3C53]">{count}</div>
                  <div className="text-sm text-gray-600 capitalize">
                    {status.replace('_', ' ')}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Active Deliveries */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-[#1B3C53]">Active Deliveries</CardTitle>
          <CardDescription>
            Track and manage delivery progress in real-time
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeliveries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No active deliveries found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDeliveries.map((delivery) => {
                    const driver = companyDrivers.find(d => d.id === delivery.assignedDriver);
                    const nextStatus = getNextStatus(delivery.status);
                    
                    return (
                      <TableRow key={delivery.id}>
                        <TableCell className="font-medium">{delivery.orderNumber}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{delivery.customerName}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {delivery.contactNumber}
                            </div>
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
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(delivery.status)}
                            {getStatusBadge(delivery.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-500" />
                            <div>
                              <div className="font-medium">{delivery.city}</div>
                              <div className="text-sm text-gray-500">{delivery.deliveryAddress}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-gray-500" />
                            <span className="text-sm">{getEstimatedTime(delivery)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#1B3C53] h-2 rounded-full transition-all duration-300" 
                              style={{ 
                                width: `${['pending', 'confirmed', 'preparing', 'ready', 'in_transit', 'delivered'].indexOf(delivery.status) * 20}%` 
                              }}
                            ></div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {nextStatus && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleStatusUpdate(delivery.id, nextStatus)}
                              >
                                {nextStatus.replace('_', ' ').toUpperCase()}
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <MapPin className="h-4 w-4" />
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

      {/* Driver Locations */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-[#1B3C53]">Driver Locations</CardTitle>
          <CardDescription>
            Current status and location of all drivers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {companyDrivers.map((driver) => {
              const driverDeliveries = getDeliveriesByDriver(driver.id);
              const activeDeliveries = driverDeliveries.filter(d => 
                d.status === 'confirmed' || d.status === 'preparing' || 
                d.status === 'ready' || d.status === 'in_transit'
              );
              
              return (
                <div key={driver.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium">{driver.name}</div>
                    <Badge className={driver.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {driver.isAvailable ? "Available" : "Busy"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      {driver.vehicleType} • {driver.capacity}L
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {driver.currentLocation || "Location unknown"}
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      {activeDeliveries.length} active deliveries
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t">
                    <Button variant="outline" size="sm" className="w-full">
                      <MapPin className="h-4 w-4 mr-2" />
                      Track Location
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
