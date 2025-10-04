import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Edit, Trash2, Eye, Package, Truck, DollarSign, MapPin } from "lucide-react";
import { useOrders } from "@/contexts/OrdersContext";
import { useRole } from "@/contexts/RoleContext";
import { Order, OrderStatus } from "@/types/orders";
import { OrderForm } from "@/components/admin/orders/OrderForm";
import { OrderDetails } from "@/components/admin/orders/OrderDetails";

export function OrderManagement() {
  const { orders, getOrdersByCompany, getMetrics } = useOrders();
  const { user } = useRole();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const companyId = user?.companyId || '1';
  const companyOrders = getOrdersByCompany(companyId);
  const metrics = getMetrics(companyId);

  const filteredOrders = companyOrders.filter(order => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: OrderStatus) => {
    const variants = {
      pending: 'outline',
      confirmed: 'default',
      preparing: 'secondary',
      ready: 'secondary',
      in_transit: 'secondary',
      delivered: 'default',
      cancelled: 'destructive'
    };

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

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    setIsFormOpen(true);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingOrder(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#1B3C53]">Order Management</h2>
            <p className="text-black/50">
              Manage customer orders and delivery operations
            </p>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                New Order
              </Button>
            </DialogTrigger>
            {/* create or edit order */}
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto text-[#1B3C53] bg-white">
              <DialogHeader>
                <DialogTitle>
                  {editingOrder ? 'Edit Order' : 'Create New Order'}
                </DialogTitle>
                <DialogDescription>
                  {editingOrder ? 'Update order details and information' : 'Add a new customer order to the system'}
                </DialogDescription>
              </DialogHeader>
              <OrderForm
                order={editingOrder}
                onClose={handleCloseForm}
                onSuccess={handleCloseForm}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-card hover:shadow-elevated transition-shadow bg-[#1B3C53]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Total Orders
              </CardTitle>
              <Package className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{metrics.totalOrders}</div>
              <p className="text-xs text-white/50">
                {metrics.todaysOrders} today
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow bg-[#1B3C53]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Active Orders
              </CardTitle>
              <Truck className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {metrics.confirmedOrders + metrics.preparingOrders + metrics.readyOrders + metrics.inTransitOrders}
              </div>
              <p className="text-xs text-white/50">
                In progress
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow bg-[#1B3C53]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${metrics.totalRevenue.toFixed(2)}
              </div>
              <p className="text-xs text-white/50">
                Avg: ${metrics.averageOrderValue.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-shadow bg-[#1B3C53]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Delivery Areas
              </CardTitle>
              <MapPin className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {new Set(companyOrders.map(o => o.city)).size}
              </div>
              <p className="text-xs text-white/50">
                Cities covered
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-card border border-[#1B3C53] bg-white">
          <CardHeader>
            <CardTitle className="text-[#1B3C53]">Orders</CardTitle>
            <CardDescription className='text-black/50'>
              Search and filter orders by status, customer, or order number
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search orders, customers, or addresses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 text-black bg-white border border-[#1B3C53]"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as OrderStatus | 'all')}>
                <SelectTrigger className="w-48 text-black bg-white border border-[#1B3C53]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className='text-black bg-white border border-[#1B3C53]'>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="in_transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Orders Table */}
            <div className="rounded-md bg-[#1B3C53] border border-white">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        No orders found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>
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
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</div>
                            <div className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleTimeString()}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewOrder(order)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditOrder(order)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Order Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen} >
          <DialogContent className="max-w-4xl max-h-[90vh] bg-white overflow-y-auto">
            <DialogHeader>
              <DialogTitle className='text-[#1B3C53]'>Order Details</DialogTitle>
              <DialogDescription>
                Complete information about the selected order
              </DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <OrderDetails
                order={selectedOrder}
                onClose={() => setIsDetailsOpen(false)}
                onEdit={() => {
                  setIsDetailsOpen(false);
                  handleEditOrder(selectedOrder);
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
