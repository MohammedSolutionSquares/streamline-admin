import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Trash2, Package, MapPin, User, Phone, Mail } from "lucide-react";
import { useOrders } from "@/contexts/OrdersContext";
import { useRole } from "@/contexts/RoleContext";
import { Order, OrderItem, Product, OrderStatus } from "@/types/orders";
import { useToast } from "@/hooks/use-toast";

interface OrderFormProps {
  order?: Order | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function OrderForm({ order, onClose, onSuccess }: OrderFormProps) {
  const { products, drivers, addOrder, updateOrder } = useOrders();
  const { user } = useRole();
  const { toast } = useToast();
  const companyId = user?.companyId || '1';

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    contactNumber: '',
    deliveryAddress: '',
    city: '',
    postalCode: '',
    deliveryDate: '',
    deliveryTime: '',
    notes: '',
    status: 'pending' as OrderStatus,
    assignedDriver: '',
    deliveryFee: 5.00,
    tax: 0.00
  });

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Filter products for this company
    const companyProducts = products.filter(p => p.companyId === companyId && p.isActive);
    setAvailableProducts(companyProducts);
  }, [products, companyId]);

  useEffect(() => {
    if (order) {
      setFormData({
        customerName: order.customerName,
        customerEmail: order.customerEmail || '',
        contactNumber: order.contactNumber,
        deliveryAddress: order.deliveryAddress,
        city: order.city,
        postalCode: order.postalCode,
        deliveryDate: order.deliveryDate || '',
        deliveryTime: order.deliveryTime || '',
        notes: order.notes || '',
        status: order.status,
        assignedDriver: order.assignedDriver || '',
        deliveryFee: order.deliveryFee,
        tax: order.tax
      });
      setOrderItems(order.items);
    }
  }, [order]);

  const addOrderItem = () => {
    if (availableProducts.length === 0) {
      toast({
        title: "No Products Available",
        description: "Please add products to your inventory first.",
        variant: "destructive"
      });
      return;
    }

    const newItem: OrderItem = {
      productId: availableProducts[0].id,
      product: availableProducts[0],
      quantity: 1,
      unitPrice: availableProducts[0].price,
      totalPrice: availableProducts[0].price
    };
    setOrderItems([...orderItems, newItem]);
  };

  const updateOrderItem = (index: number, field: keyof OrderItem, value: any) => {
    const updatedItems = [...orderItems];
    const item = updatedItems[index];

    if (field === 'productId') {
      const product = availableProducts.find(p => p.id === value);
      if (product) {
        item.productId = value;
        item.product = product;
        item.unitPrice = product.price;
        item.totalPrice = product.price * item.quantity;
      }
    } else if (field === 'quantity') {
      item.quantity = Math.max(1, parseInt(value) || 1);
      item.totalPrice = item.unitPrice * item.quantity;
    }

    updatedItems[index] = item;
    setOrderItems(updatedItems);
  };

  const removeOrderItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const calculateTotals = () => {
    const subtotal = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + formData.deliveryFee + tax;

    return { subtotal, tax, total };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (orderItems.length === 0) {
      toast({
        title: "No Items Added",
        description: "Please add at least one item to the order.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.customerName || !formData.contactNumber || !formData.deliveryAddress) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const { subtotal, tax, total } = calculateTotals();

    const orderData = {
      companyId,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      contactNumber: formData.contactNumber,
      deliveryAddress: formData.deliveryAddress,
      city: formData.city,
      postalCode: formData.postalCode,
      items: orderItems,
      subtotal,
      deliveryFee: formData.deliveryFee,
      tax,
      totalAmount: total,
      status: formData.status,
      deliveryDate: formData.deliveryDate,
      deliveryTime: formData.deliveryTime,
      notes: formData.notes,
      assignedDriver: formData.assignedDriver
    };

    try {
      if (order) {
        updateOrder(order.id, orderData);
        toast({
          title: "Order Updated",
          description: "Order has been successfully updated.",
        });
      } else {
        addOrder(orderData);
        toast({
          title: "Order Created",
          description: "New order has been successfully created.",
        });
      }
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save order. Please try again.",
        variant: "destructive"
      });
    }
  };

  const { subtotal, tax, total } = calculateTotals();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <Card className='border border-[#1B3C53] bg-[#1B3C53]'>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <User className="h-5 w-5" />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName" className='text-white'>Customer Name *</Label>
              <Input
                className='text-black bg-white'
                id="customerName"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="Enter customer name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber" className="text-white">Contact Number *</Label>
              <Input
                className='text-black bg-white'
                id="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                placeholder="Enter phone number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerEmail" className="text-white">Email</Label>
              <Input
                className='text-black bg-white'
                id="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Address */}
      <Card className='border border-[#1B3C53] bg-[#1B3C53]'>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <MapPin className="h-5 w-5" />
            Delivery Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" >
          <div className="space-y-2">
            <Label htmlFor="deliveryAddress" className="text-white">Address *</Label>
            <Input
              className='text-black bg-white'
              id="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
              placeholder="Enter delivery address"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-white">City *</Label>
              <Input
                className='text-black bg-white'
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Enter city"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode" className="text-white">Postal Code *</Label>
              <Input
                className='text-black bg-white'
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                placeholder="Enter postal code"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card className='border border-[#1B3C53] bg-[#1B3C53]'>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Package className="h-5 w-5" />
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {orderItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border rounded-lg border border-white">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className='text-white'>Product</Label>
                  <Select
                    value={item.productId}
                    onValueChange={(value) => updateOrderItem(index, 'productId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className='text-black bg-white'>
                      {availableProducts.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} - {product.size} (${product.price})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className='text-white'>Quantity</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      className='text-black bg-white'
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => updateOrderItem(index, 'quantity', item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateOrderItem(index, 'quantity', parseInt(e.target.value))}
                      className="w-20 text-center border border-[#1B35C3] text-black bg-white"
                    />
                    <Button
                      className='text-black bg-white'
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => updateOrderItem(index, 'quantity', item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className='text-white'>Total</Label>
                  <div className="text-lg font-semibold text-white">
                    ${item.totalPrice.toFixed(2)}
                  </div>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeOrderItem(index)}
                className="text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button
            // className='text-black bg-white'
            type="button"
            variant="outline"
            onClick={addOrderItem}
            className="w-full text-black bg-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </CardContent>
      </Card>

      {/* Order Details */}
      <Card className='border border-[#1B3C53] bg-[#1B3C53]'>
        <CardHeader>
          <CardTitle className="text-white">Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as OrderStatus })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className='text-black bg-white'>
                  <SelectItem value="pending" >Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="in_transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignedDriver">Assigned Driver</Label>
              <Select
                value={formData.assignedDriver}
                onValueChange={(value) => setFormData({ ...formData, assignedDriver: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select driver" />
                </SelectTrigger>
                <SelectContent>
                  {drivers.filter(d => d.companyId === companyId).map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      {driver.name} - {driver.vehicleType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryDate">Delivery Date</Label>
              <Input
                className='text-black bg-white'
                id="deliveryDate"
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryTime">Delivery Time</Label>
              <Input
                className='text-black bg-white'
                id="deliveryTime"
                type="time"
                value={formData.deliveryTime}
                onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              className='text-black bg-white'
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes or special instructions"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card className='border border-[#1B3C53] bg-[#1B3C53]'>
        <CardHeader>
          <CardTitle className="text-white">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span>${formData.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-white border-t pt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onClose} className='text-white bg-[#1B3C53]'>
          Cancel
        </Button>
        <Button type="submit" className='text-white bg-[#1B3C53]'>
          {order ? 'Update Order' : 'Create Order'}
        </Button>
      </div>
    </form>
  );
}
