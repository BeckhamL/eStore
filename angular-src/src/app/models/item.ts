import { Category } from './category';
import { User } from '../models/user';

export class Item {
  itemName: string;
  itemImage: string;
  itemCost: number;
  itemOwner: string;
  itemDate: Date;
  itemDescription: string;
  itemCategory: Category;
  itemQuantity: number;
  itemPurchasedBy: User;

  setDate(): void {
    this.itemDate = new Date();
  }
}