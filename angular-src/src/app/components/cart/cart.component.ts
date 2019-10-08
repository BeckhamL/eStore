import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  user: User;
  itemIDs: string[] = new Array();
  items: Item[];

  constructor(
    private postService: PostService,
    private userService: UserService
  ) { }

  ngOnInit() {

    let userId:string = JSON.stringify(localStorage.getItem('user'));

    this.userService.getUsersCart(userId.substring(11,35)).subscribe(items => {
      this.itemIDs = items.itemsInCart;
      this.items = new Array(this.itemIDs.length);
      this.getItemFromItemID(this.itemIDs);
    },
    err => {
      console.log(err);
      return false;
    });
  }

  getItemFromItemID(arr: string[]) {

    for (let i = 0; i < arr.length; i++) {
      this.postService.getPostById(arr[i]).subscribe(data => {
        let curItem = data[0];
        this.items[i] = curItem;
      });
    }
  }
}
