import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {

  @Input() cartItems: Item[]; 
  constructor() { }

  ngOnInit() {
  }

  removeFromCart(index: string) {

  }

}
