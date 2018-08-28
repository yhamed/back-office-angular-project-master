import {User} from "./user";
import {Product} from "./product";

export class Transaction {
  id: number;
  timestamp: string;
  user: User;
  product: Product;
  quantity: number;
}
