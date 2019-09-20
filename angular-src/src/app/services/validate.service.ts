import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user: User): boolean {

    if(user.name == undefined || user.email == undefined || user.password == undefined || user.username == undefined) {
      return false;
    }
    else {
      return true;
    }
  }

  validateEmail(email: string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateNewPost(item: Item) {
    if (item.itemName == undefined || item.itemCost == undefined || item.itemDescription == undefined) {
      return false;
    }
    else {
      return true;
    }
  }

  validateFilterOptions(category: string, price: number) {

    if(category == undefined && price == undefined) {
      return false;
    }
    else {
      return true;
    }
  }
}
