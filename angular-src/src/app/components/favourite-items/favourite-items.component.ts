import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'app-favourite-items',
  templateUrl: './favourite-items.component.html',
  styleUrls: ['./favourite-items.component.css']
})
export class FavouriteItemsComponent implements OnInit {

  @Input() favouriteItems: Item[];
  
  constructor() { }

  ngOnInit() {
  }

}
