export interface Details {
  productId: number;
  productName: string;
  quantity: number;
}

export interface Order {
  city: string;
  date: string;
  id: number;
  isDelivery: boolean;
  name: string;
  shippingAddress: string;
}

export interface DetailsOrder {
  details: Details[];
  orderId: number;
}
