import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { User } from '../../models/user';
import { Category } from '../../models/category';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-posting',
  templateUrl: './new-posting.component.html',
  styleUrls: ['./new-posting.component.css']
})
export class NewPostingComponent implements OnInit {

  loggedUser: User = JSON.parse(localStorage.getItem("user"));
  itemCategory: Category;
  itemName: string;
  itemCost: number;
  itemDescription: string;
  itemImage: string;
  item: Item;

  constructor(
    private validateService: ValidateService,
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
      itemOwner: this.loggedUser
    }

    if(this.validateService.validateNewPost(item)) {
      this.flashMessages.show("Successfully created a new post", {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(["/dashboard"]);
    }
    else {
      this.flashMessages.show("Missing fields", {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(["/newPost"]);
    }
  }

}