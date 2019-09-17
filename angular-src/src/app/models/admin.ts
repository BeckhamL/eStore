import { User } from './user';
import { Item } from './item';

export interface Admin extends User {

  postings: Item[];

}