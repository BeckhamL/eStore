import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  user: User;
  items: string[] = new Array();
  numOfItems: number;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {

    let userId:string = JSON.stringify(localStorage.getItem('user'));

    this.userService.getUsersCart(userId.substring(11,35)).subscribe(items => {
      this.items = items.itemsInCart;
      this.numOfItems = items.itemsInCart.length;
      console.log(this.numOfItems);
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
