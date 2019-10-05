import { Category } from './category';
import { User } from '../models/user';

export interface Item {
  itemName: string;
  itemImage: string;
  itemCost: number;
  itemOwner: string;
  itemDate: Date;
  itemDescription: string;
  itemCategory: Category;
  itemQuantity: number;
  itemPurchasedBy: User;
}