import { User } from './user';
import { Category } from './category';

export interface Item {
  itemName: string;
  itemImage: string;
  itemCost: number;
  itemOwner: User;
  itemDate: Date;
  itemDescription: string;
  itemCategory: Category;
}