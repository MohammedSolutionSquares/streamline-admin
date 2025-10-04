import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Package, 
  Truck, 
  User, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useOrders } from "@/contexts/OrdersContext";
import { useRole } from "@/contexts/RoleContext";
import { Order, DeliveryDriver } from "@/types/orders";
import { useToast } from "@/hooks/use-toast";

interface DeliveryAssignmentProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function DeliveryAssignment({ onClose, onSuccess }: DeliveryAssignmentProps) {
  const { 
    getOrdersByCompany, 
    drivers, 
    assignDelivery, 
    getDeliveriesByDriver 
  } = useOrders();
  const { user } = useRole();
  const { toast } = useToast();
  const companyId = user?.companyId || '1';

  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('pending');

  const companyOrders = getOrdersByCompany(companyId);
  const companyDrivers = drivers.filter(driver => driver.companyId === companyId);

  const unassignedOrders = companyOrders.filter(order => 
    !order.assignedDriver && (order.status === 'pending' || order.status === 'confirmed')
  );

  const filteredOrders = filterStatus === 'all' 
    ? unassignedOrders 
    : unassignedOrders.filter(order => order.status === filterStatus);

  const getDriverWorkload = (driverId: string) => {
    const driverDeliveries = getDeliveriesByDriver(driverId);
    return driverDeliveries.filter(d => 
      d.status === 'confirmed' || d.status === 'preparing' || 
      d.status === 'ready' || d.status === 'in_transit'
    ).length;
  };

  const getDriverStatusBadge = (driver: DeliveryDriver) => {
    const workload = getDriverWorkload(driver.id);
    
    if (workload === 0) {
      return <Badge className="bg-green-100 text-green-800">Available</Badge>;
    } else if (workload < 3) {
      return <Badge className="bg-yellow-100 text-yellow-800">Busy ({workload})</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">Overloaded ({workload})</Badge>;
    }
  };

  const handleOrderSelect = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleAssignDelivery = () => {
    if (selectedOrders.length === 0) {
      toast({
        title: "No Orders Selected",
        description: "Please select at least one order to assign.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedDriver) {
      toast({
        title: "No Driver Selected",
        description: "Please select a driver for the assignment.",
        variant: "destructive"
      });
      return;
    }

    try {
      selectedOrders.forEach(orderId => {
        assignDelivery(orderId, selectedDriver);
      });

      toast({
        title: "Delivery Assigned",
        description: `${selectedOrders.length} order(s) assigned to driver successfully.`,
      });

      setSelectedOrders([]);
      setSelectedDriver('');
      onSuccess();
    } catch (error) {
      toast({
        title: "Assignment Failed",
        description: "Failed to assign delivery. Please try again.",
        variant: "destructive"
      });
    }
  };

  const selectedOrdersData = filteredOrders.filter(order => selectedOrders.includes(order.id));
  const totalAmount = selectedOrdersData.reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div className="space-y-6">
      {/* Driver Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#1B3C53]">
            <Truck className="h-5 w-5" />
            Select Driver
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {companyDrivers.map((driver) => (
              <div 
                key={driver.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedDriver === driver.id 
                    ? 'border-[#1B3C53] bg-[#1B3C53]/5' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedDriver(driver.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{driver.name}</div>
                  {selectedDriver === driver.id && (
                    <CheckCircle className="h-5 w-5 text-[#1B3C53]" />
                  )}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <div>{driver.vehicleType} • {driver.capacity}L capacity</div>
                  <div>{driver.phone}</div>
                </div>
                <div className="flex items-center justify-between">
                  {getDriverStatusBadge(driver)}
                  <div className="text-xs text-gray-500">
                    {getDriverWorkload(driver.id)} active deliveries
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#1B3C53]">
            <Package className="h-5 w-5" />
            Select Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No unassigned orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedOrders.includes(order.id)}
                          onCheckedChange={(checked) => handleOrderSelect(order.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-sm text-gray-500">{order.contactNumber}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.deliveryAddress}</div>
                          <div className="text-sm text-gray-500">{order.city}, {order.postalCode}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={order.status === 'pending' ? 'outline' : 'default'}>
                          {order.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {order.deliveryDate && new Date(order.deliveryDate) <= new Date() ? (
                          <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                        ) : (
                          <Badge variant="outline">Normal</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Assignment Summary */}
      {selectedOrders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1B3C53]">Assignment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-[#1B3C53]">{selectedOrders.length}</div>
                <div className="text-sm text-gray-600">Orders Selected</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-[#1B3C53]">${totalAmount.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Total Value</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-[#1B3C53]">
                  {companyDrivers.find(d => d.id === selectedDriver)?.name || 'No Driver'}
                </div>
                <div className="text-sm text-gray-600">Assigned Driver</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          onClick={handleAssignDelivery}
          disabled={selectedOrders.length === 0 || !selectedDriver}
          className="bg-gradient-primary"
        >
          Assign {selectedOrders.length} Order{selectedOrders.length !== 1 ? 's' : ''}
        </Button>
      </div>
    </div>
  );
}
