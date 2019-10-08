import { Item } from './item';

export interface User {
  name: string,
  username: string,
  email: string,
  password: string,
  userType: string,
  itemsInCart: string[],
  itemsInFavourite: string[],
  itemsPurhased: string[]
}