import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { User } from '../../models/user';
import { Category } from '../../models/category';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-new-posting',
  templateUrl: './new-posting.component.html',
  styleUrls: ['./new-posting.component.css']
})
export class NewPostingComponent implements OnInit {

  enumCategories = Category;
  keys = Object.keys;

  loggedUser: User = JSON.parse(localStorage.getItem("user"));
  itemCategory: Category;
  itemName: string;
  itemCost: number;
  itemDescription: string;
  itemImage: string;
  item: Item;

  constructor(
    private validateService: ValidateService,
    private postService: PostService,
    private flashMessages: FlashMessagesService,
    private router: Router)
     { }

  ngOnInit() {
  }

  createPosting() {

    const item: Item = {
      itemName: this.itemName,
      itemCost: this.itemCost,
      itemDescription: this.itemDescription,
      itemImage: this.itemImage,
      itemDate: new Date(),
      itemCategory: Category.AutoMobiles,
      itemOwner: this.loggedUser.email
    }

    if (!this.validateService.validateNewPost(item)) {
      this.flashMessages.show("Missing fields", {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(["/newPosting"]);
    }

    this.postService.createPosting(item).subscribe(data => {
      if(data.success) {
        this.flashMessages.show("Successfully created a new post", {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(["/dashboard"]);
      }
      else {
        this.flashMessages.show("Error while creating post", {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(["/newPosting"]);
      }
    });
  }

}
