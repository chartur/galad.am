import {User} from "@interfaces/user";
import {OrderStatus} from "@enums/order-status";
import {OrderProduct} from "@interfaces/order-product";

export interface Order {
  id: string;
  user?: User;
  email: string;
  phone: string;
  status: OrderStatus;
  totalPrice: string;
  originalPrice: string;
  discounts: string;
  totalQuantity: number;
  orderProducts?: OrderProduct[];
  created_at: string;
  updated_at: string;
}
