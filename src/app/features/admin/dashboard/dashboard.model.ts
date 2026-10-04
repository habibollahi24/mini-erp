export interface SalesStat {
  id: number;
  month: string;
  monthIndex: number;
  revenue: number;
  orders: number;
  customers: number;
  averageOrderValue: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  status: 'delivered' | 'pending' | 'cancelled' | 'shipped' | 'processing';
  paymentStatus: string;
  paymentMethod: string;
  shippingStatus: string;
  itemsCount: number;
  subtotal: number;
  discount: number;
  tax: number;
  shippingCost: number;
  total: number;
  trackingCode: string;
  shippingAddress: {
    city: string;
    address: string;
    postalCode: string;
  };
  notes: string;
  createdAt: string;
  updatedAt: string;
  customerUserId: number;
}

export interface Activity {
  id: number;
  userId: number;
  type: string;
  entity: string;
  entityId: number;
  description: string;
  createdAt: string;
}
