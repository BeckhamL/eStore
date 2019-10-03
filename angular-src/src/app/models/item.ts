import { Category } from './category';

export interface Item {
  itemName: string;
  itemImage: string;
  itemCost: number;
  itemOwner: string;
  itemDate: Date;
  itemDescription: string;
  itemCategory: Category;
  itemQuantity: number;
}