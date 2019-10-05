import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() item: Item;

  constructor() { }

  ngOnInit() {
  }

  getClickedPost($event: Item) {
    this.item = $event;
    console.log(this.item);
  }

}
