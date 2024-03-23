import {User} from "@interfaces/user";
import {OrderStatus} from "@enums/order-status";
import {OrderProduct} from "@interfaces/order-product";

export interface Order {
  id: string;
  orderId: string;
  user?: User;
  email: string;
  phone: string;
  status: OrderStatus;
  totalPrice: number;
  originalPrice: number;
  discounts: number;
  totalQuantity: number;
  orderProducts?: OrderProduct[];
  created_at: string;
  updated_at: string;
}
