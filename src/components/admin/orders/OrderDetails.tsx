import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Package, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  Truck, 
  DollarSign,
  Edit,
  Printer
} from "lucide-react";
import { Order, OrderStatus } from "@/types/orders";

interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
  onEdit: () => void;
}

export function OrderDetails({ order, onClose, onEdit }: OrderDetailsProps) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-[#1B3C53]">{order.orderNumber}</h3>
          <p className="text-gray-600">Created: {formatDate(order.createdAt)}</p>
          {order.updatedAt !== order.createdAt && (
            <p className="text-gray-600">Updated: {formatDate(order.updatedAt)}</p>
          )}
        </div>
        <div className="flex gap-2">
          {getStatusBadge(order.status)}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer Information */}
        <Card className='border border-[#1B3C53] bg-white'>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1B3C53]">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg text-[#1B3C53]">{order.customerName}</h4>
              {order.customerEmail && (
                <div className="flex items-center gap-2 text-[#1B3C53]">
                  <Mail className="h-4 w-4" />
                  {order.customerEmail}
                </div>
              )}
              <div className="flex items-center gap-2 text-[#1B3C53]">
                <Phone className="h-4 w-4" />
                {order.contactNumber}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Information */}
        <Card className='border border-[#1B3C53] bg-white'>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1B3C53]">
              <MapPin className="h-5 w-5" />
              Delivery Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium text-[#1B3C53]">{order.deliveryAddress}</p>
              <p className="text-[#1B3C53]">{order.city}, {order.postalCode}</p>
            </div>
            {order.deliveryDate && (
              <div className="flex items-center gap-2 text-[#1B3C53]">
                <Calendar className="h-4 w-4 text-[#1B3C53]" />
                {new Date(order.deliveryDate).toLocaleDateString()}
              </div>
            )}
            {order.deliveryTime && (
              <div className="flex items-center gap-2 text-[#1B3C53]">
                <Clock className="h-4 w-4" />
                {order.deliveryTime}
              </div>
            )}
            {order.assignedDriver && (
              <div className="flex items-center gap-2 text-[#1B3C53]">
                <Truck className="h-4 w-4" />
                Driver: {order.assignedDriver}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card className='text-[#1B3C53] border border-[#1B3C53] bg-white'>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#1B3C53]">
            <Package className="h-5 w-5" />
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg border border-[#1B3C53]">
                <div className="flex-1 text-[#1B3C53]">
                  <h4 className="font-semibold text-[#1B3C53]">{item.product.name}</h4>
                  <p className="text-[#1B3C53]">{item.product.description}</p>
                  <p className="text-sm text-[#1B3C53]">Size: {item.product.size}</p>
                </div>
                <div className="text-right text-[#1B3C53]">
                  <p className="font-semibold">Qty: {item.quantity}</p>
                  <p className="text-[#1B3C53]">${item.unitPrice.toFixed(2)} each</p>
                  <p className="font-semibold text-[#1B3C53]">${item.totalPrice.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card className='border border-[#1B3C53] bg-white'>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#1B3C53]">
            <DollarSign className="h-5 w-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className='text-[#1B3C53]'>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span>${order.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <Separator className='text-[#1B3C53]'/>
            <div className="flex justify-between text-xl font-bold text-[#1B3C53]">
              <span>Total:</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      {order.notes && (
        <Card className="border border-[#1B3C53] bg-white">
          <CardHeader>
            <CardTitle className="text-[#1B3C53]">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#1B3C53]">{order.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onClose} className='bg-[#1B3C53] text-white'>
          Close
        </Button>
        <Button variant="outline" className='bg-[#1B3C53] text-white'>
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
        <Button onClick={onEdit} className="bg-[#1B3C53] text-white">
          <Edit className="h-4 w-4 mr-2" />
          Edit Order
        </Button>
      </div>
    </div>
  );
}
