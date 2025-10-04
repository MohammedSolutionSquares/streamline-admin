import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Edit, 
  Trash2, 
  User, 
  Phone, 
  Mail, 
  Truck, 
  MapPin,
  CheckCircle,
  AlertCircle,
  Package
} from "lucide-react";
import { useOrders } from "@/contexts/OrdersContext";
import { useRole } from "@/contexts/RoleContext";
import { DeliveryDriver } from "@/types/orders";
import { useToast } from "@/hooks/use-toast";

export function DeliveryBoyManagement() {
  const { 
    drivers, 
    addDriver, 
    updateDriver, 
    deleteDriver, 
    getDeliveriesByDriver 
  } = useOrders();
  const { user } = useRole();
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<DeliveryDriver | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const companyId = user?.companyId || '1';
  const companyDrivers = drivers.filter(driver => driver.companyId === companyId);

  const filteredDrivers = companyDrivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.phone.includes(searchTerm) ||
    driver.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    licenseNumber: '',
    vehicleType: '',
    capacity: 50,
    currentLocation: '',
    isAvailable: true
  });

  const handleEditDriver = (driver: DeliveryDriver) => {
    setEditingDriver(driver);
    setFormData({
      name: driver.name,
      phone: driver.phone,
      email: driver.email,
      licenseNumber: driver.licenseNumber,
      vehicleType: driver.vehicleType,
      capacity: driver.capacity,
      currentLocation: driver.currentLocation || '',
      isAvailable: driver.isAvailable
    });
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingDriver(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      licenseNumber: '',
      vehicleType: '',
      capacity: 50,
      currentLocation: '',
      isAvailable: true
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email || !formData.licenseNumber || !formData.vehicleType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingDriver) {
        updateDriver(editingDriver.id, formData);
        toast({
          title: "Driver Updated",
          description: "Driver information has been updated successfully.",
        });
      } else {
        addDriver({
          ...formData,
          companyId
        });
        toast({
          title: "Driver Added",
          description: "New driver has been added successfully.",
        });
      }
      handleCloseForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save driver information. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteDriver = (driverId: string) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      try {
        deleteDriver(driverId);
        toast({
          title: "Driver Deleted",
          description: "Driver has been removed successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete driver. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const getDriverStatusBadge = (driver: DeliveryDriver) => {
    const driverDeliveries = getDeliveriesByDriver(driver.id);
    const activeCount = driverDeliveries.filter(d => 
      d.status === 'confirmed' || d.status === 'preparing' || 
      d.status === 'ready' || d.status === 'in_transit'
    ).length;

    if (!driver.isAvailable) {
      return <Badge className="bg-red-100 text-red-800">Offline</Badge>;
    } else if (activeCount === 0) {
      return <Badge className="bg-green-100 text-green-800">Available</Badge>;
    } else if (activeCount < 3) {
      return <Badge className="bg-yellow-100 text-yellow-800">Busy ({activeCount})</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">Overloaded ({activeCount})</Badge>;
    }
  };

  const getDriverPerformance = (driver: DeliveryDriver) => {
    const driverDeliveries = getDeliveriesByDriver(driver.id);
    const completedDeliveries = driverDeliveries.filter(d => d.status === 'delivered').length;
    const totalDeliveries = driverDeliveries.length;
    
    if (totalDeliveries === 0) return "No deliveries yet";
    
    const completionRate = (completedDeliveries / totalDeliveries) * 100;
    return `${completionRate.toFixed(1)}% completion rate`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-[#1B3C53]">Delivery Drivers</h3>
          <p className="text-gray-600">Manage your delivery team and driver information</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Driver
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingDriver ? 'Edit Driver' : 'Add New Driver'}
              </DialogTitle>
              <DialogDescription>
                {editingDriver ? 'Update driver information' : 'Add a new delivery driver to your team'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter driver's full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number *</Label>
                  <Input
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    placeholder="Enter license number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Vehicle Type *</Label>
                  <Select
                    value={formData.vehicleType}
                    onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Van">Van</SelectItem>
                      <SelectItem value="Truck">Truck</SelectItem>
                      <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                      <SelectItem value="Car">Car</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity (Liters)</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 50 })}
                    placeholder="Enter capacity"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentLocation">Current Location</Label>
                  <Input
                    id="currentLocation"
                    value={formData.currentLocation}
                    onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                    placeholder="Enter current location"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="isAvailable">Status</Label>
                  <Select
                    value={formData.isAvailable ? "available" : "unavailable"}
                    onValueChange={(value) => setFormData({ ...formData, isAvailable: value === "available" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={handleCloseForm}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-primary">
                  {editingDriver ? 'Update Driver' : 'Add Driver'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Input
              placeholder="Search drivers by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </CardContent>
      </Card>

      {/* Drivers Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-[#1B3C53]">Driver List</CardTitle>
          <CardDescription>
            Manage your delivery team and track their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Active Deliveries</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrivers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No drivers found matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDrivers.map((driver) => {
                    const driverDeliveries = getDeliveriesByDriver(driver.id);
                    const activeDeliveries = driverDeliveries.filter(d => 
                      d.status === 'confirmed' || d.status === 'preparing' || 
                      d.status === 'ready' || d.status === 'in_transit'
                    );
                    
                    return (
                      <TableRow key={driver.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{driver.name}</div>
                            <div className="text-sm text-gray-500">License: {driver.licenseNumber}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-3 w-3" />
                              {driver.phone}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-3 w-3" />
                              {driver.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{driver.vehicleType}</div>
                            <div className="text-sm text-gray-500">{driver.capacity}L capacity</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {getDriverStatusBadge(driver)}
                            {driver.currentLocation && (
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <MapPin className="h-3 w-3" />
                                {driver.currentLocation}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {getDriverPerformance(driver)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className="text-lg font-bold text-[#1B3C53]">{activeDeliveries.length}</div>
                            <div className="text-xs text-gray-500">active</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditDriver(driver)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteDriver(driver.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
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

      {/* Driver Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1B3C53]">{companyDrivers.length}</div>
              <div className="text-sm text-gray-600">Total Drivers</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1B3C53]">
                {companyDrivers.filter(d => d.isAvailable).length}
              </div>
              <div className="text-sm text-gray-600">Available Drivers</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1B3C53]">
                {companyDrivers.reduce((sum, driver) => {
                  const driverDeliveries = getDeliveriesByDriver(driver.id);
                  return sum + driverDeliveries.filter(d => d.status === 'delivered').length;
                }, 0)}
              </div>
              <div className="text-sm text-gray-600">Completed Deliveries</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
