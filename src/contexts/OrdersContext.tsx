import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Order, Product, OrderMetrics, OrderStatus, DeliveryDriver } from "@/types/orders";

interface OrdersContextType {
  orders: Order[];
  products: Product[];
  drivers: DeliveryDriver[];
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => Order;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addDriver: (driver: Omit<DeliveryDriver, 'id'>) => DeliveryDriver;
  updateDriver: (id: string, updates: Partial<DeliveryDriver>) => void;
  deleteDriver: (id: string) => void;
  getOrdersByCompany: (companyId: string) => Order[];
  getMetrics: (companyId: string) => OrderMetrics;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
};

const generateOrderNumber = () => {
  const prefix = 'ORD';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
};

// Default products for water delivery companies
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Pure Water',
    description: 'Fresh purified water in 20L bottle',
    size: '20L',
    price: 25.00,
    companyId: '1',
    createdAt: '2024-01-15',
    isActive: true,
  },
  {
    id: 'prod-2',
    name: 'Pure Water',
    description: 'Fresh purified water in 25L bottle',
    size: '25L',
    price: 30.00,
    companyId: '1',
    createdAt: '2024-01-15',
    isActive: true,
  },
  {
    id: 'prod-3',
    name: 'Pure Water',
    description: 'Fresh purified water in 30L bottle',
    size: '30L',
    price: 35.00,
    companyId: '1',
    createdAt: '2024-01-15',
    isActive: true,
  },
];

// Default sample orders
const DEFAULT_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-240001-100',
    companyId: '1',
    customerName: 'John Smith',
    customerEmail: 'john@email.com',
    contactNumber: '+1-555-0123',
    deliveryAddress: '123 Main Street',
    city: 'New York',
    postalCode: '10001',
    items: [
      {
        productId: 'prod-1',
        product: DEFAULT_PRODUCTS[0],
        quantity: 2,
        unitPrice: 25.00,
        totalPrice: 50.00,
      }
    ],
    subtotal: 50.00,
    deliveryFee: 5.00,
    tax: 5.50,
    totalAmount: 60.50,
    status: 'confirmed',
    deliveryDate: '2024-01-20',
    deliveryTime: '14:00',
    notes: 'Please deliver to front desk',
    assignedDriver: 'driver-1',
    createdAt: '2024-01-19T10:30:00Z',
    updatedAt: '2024-01-19T10:30:00Z',
  },
  {
    id: '2',
    orderNumber: 'ORD-240001-101',
    companyId: '1',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@email.com',
    contactNumber: '+1-555-0124',
    deliveryAddress: '456 Oak Avenue',
    city: 'New York',
    postalCode: '10002',
    items: [
      {
        productId: 'prod-2',
        product: DEFAULT_PRODUCTS[1],
        quantity: 1,
        unitPrice: 30.00,
        totalPrice: 30.00,
      }
    ],
    subtotal: 30.00,
    deliveryFee: 6.00,
    tax: 3.60,
    totalAmount: 39.60,
    status: 'delivered',
    deliveryDate: '2024-01-18',
    deliveryTime: '16:00',
    notes: 'Leave at front door',
    assignedDriver: 'driver-2',
    createdAt: '2024-01-17T14:20:00Z',
    updatedAt: '2024-01-18T16:15:00Z',
  },
];

// Default drivers
const DEFAULT_DRIVERS: DeliveryDriver[] = [
  {
    id: 'driver-1',
    name: 'Alex Thompson',
    phone: '+1-555-1001',
    email: 'alex@company.com',
    licenseNumber: 'D123456',
    vehicleType: 'Van',
    capacity: 50,
    currentLocation: 'Downtown',
    isAvailable: true,
    companyId: '1',
  },
  {
    id: 'driver-2',
    name: 'Maria Garcia',
    phone: '+1-555-1002',
    email: 'maria@company.com',
    licenseNumber: 'D123457',
    vehicleType: 'Truck',
    capacity: 100,
    currentLocation: 'Suburbs',
    isAvailable: true,
    companyId: '1',
  },
];

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const stored = localStorage.getItem('orders');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Order[];
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }
    return DEFAULT_ORDERS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem('products');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Product[];
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }
    return DEFAULT_PRODUCTS;
  });

  const [drivers, setDrivers] = useState<DeliveryDriver[]>(() => {
    const stored = localStorage.getItem('drivers');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as DeliveryDriver[];
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }
    return DEFAULT_DRIVERS;
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('drivers', JSON.stringify(drivers));
  }, [drivers]);

  const addOrder = (input: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order => {
    const now = new Date().toISOString();
    const order: Order = {
      id: Date.now().toString(),
      orderNumber: generateOrderNumber(),
      ...input,
      createdAt: now,
      updatedAt: now,
    };
    setOrders(prev => [...prev, order]);
    return order;
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(order => 
      order.id === id 
        ? { ...order, ...updates, updatedAt: new Date().toISOString() }
        : order
    ));
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  const addProduct = (input: Omit<Product, 'id' | 'createdAt'>): Product => {
    const product: Product = {
      id: Date.now().toString(),
      ...input,
      createdAt: new Date().toISOString(),
    };
    setProducts(prev => [...prev, product]);
    return product;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...updates } : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const addDriver = (input: Omit<DeliveryDriver, 'id'>): DeliveryDriver => {
    const driver: DeliveryDriver = {
      id: Date.now().toString(),
      ...input,
    };
    setDrivers(prev => [...prev, driver]);
    return driver;
  };

  const updateDriver = (id: string, updates: Partial<DeliveryDriver>) => {
    setDrivers(prev => prev.map(driver => 
      driver.id === id ? { ...driver, ...updates } : driver
    ));
  };

  const deleteDriver = (id: string) => {
    setDrivers(prev => prev.filter(driver => driver.id !== id));
  };

  const getOrdersByCompany = (companyId: string): Order[] => {
    return orders.filter(order => order.companyId === companyId);
  };

  const getMetrics = (companyId: string): OrderMetrics => {
    const companyOrders = getOrdersByCompany(companyId);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const todaysOrders = companyOrders.filter(order => 
      new Date(order.createdAt) >= today
    ).length;

    const thisWeekOrders = companyOrders.filter(order => 
      new Date(order.createdAt) >= thisWeek
    ).length;

    const thisMonthOrders = companyOrders.filter(order => 
      new Date(order.createdAt) >= thisMonth
    ).length;

    const totalRevenue = companyOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const averageOrderValue = companyOrders.length > 0 ? totalRevenue / companyOrders.length : 0;

    const statusCounts = companyOrders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<OrderStatus, number>);

    return {
      totalOrders: companyOrders.length,
      pendingOrders: statusCounts.pending || 0,
      confirmedOrders: statusCounts.confirmed || 0,
      preparingOrders: statusCounts.preparing || 0,
      readyOrders: statusCounts.ready || 0,
      inTransitOrders: statusCounts.in_transit || 0,
      deliveredOrders: statusCounts.delivered || 0,
      cancelledOrders: statusCounts.cancelled || 0,
      totalRevenue,
      averageOrderValue,
      todaysOrders,
      thisWeekOrders,
      thisMonthOrders,
    };
  };

  return (
    <OrdersContext.Provider value={{
      orders,
      products,
      drivers,
      addOrder,
      updateOrder,
      deleteOrder,
      addProduct,
      updateProduct,
      deleteProduct,
      addDriver,
      updateDriver,
      deleteDriver,
      getOrdersByCompany,
      getMetrics,
    }}>
      {children}
    </OrdersContext.Provider>
  );
};
    