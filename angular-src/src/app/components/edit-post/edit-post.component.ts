import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  @Input() item: Item;
  constructor() { }

  ngOnInit() {
  }

  getClickedPost($event: Item) {
    this.item = $event;
    console.log(this.item);
  }

}