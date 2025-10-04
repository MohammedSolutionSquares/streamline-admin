export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'in_transit' | 'delivered' | 'cancelled';

export interface Product {
  id: string;
  name: string;
  description: string;
  size: string; // e.g., "20L", "25L", "30L"
  price: number;
  companyId: string;
  createdAt: string;
  isActive: boolean;
}

export interface OrderItem {
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  companyId: string;
  customerName: string;
  customerEmail?: string;
  contactNumber: string;
  deliveryAddress: string;
  city: string;
  postalCode: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  totalAmount: number;
  status: OrderStatus;
  deliveryDate?: string;
  deliveryTime?: string;
  notes?: string;
  assignedDriver?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderMetrics {
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  preparingOrders: number;
  readyOrders: number;
  inTransitOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  todaysOrders: number;
  thisWeekOrders: number;
  thisMonthOrders: number;
}

export interface DeliveryDriver {
  id: string;
  name: string;
  phone: string;
  email: string;
  licenseNumber: string;
  vehicleType: string;
  capacity: number;
  currentLocation?: string;
  isAvailable: boolean;
  companyId: string;
}
