import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { User } from '../../models/user';
import { Category } from '../../models/category';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-posting',
  templateUrl: './new-posting.component.html',
  styleUrls: ['./new-posting.component.css']
})
export class NewPostingComponent implements OnInit {

  enumCategories = Category;
  keys = Object.keys;

  loggedUser: User = JSON.parse(localStorage.getItem("user"));
  item: Item;
  defaultUser: User = null;

  newPostingForm: FormGroup = new FormGroup({
    itemName: new FormControl(''),
    itemCost: new FormControl(''),
    itemDescription: new FormControl(''),
    itemCategory: new FormControl(''),
    itemQuantity: new FormControl(''),
    itemImage: new FormControl('')
  })

  constructor(
    private validateService: ValidateService,
    private postService: PostService,
    private flashMessages: FlashMessagesService,
    private router: Router)
     { }

  ngOnInit() {
  }

  createPosting() {

    let item: Item = this.newPostingForm.value;
    item.setDate;

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

  onFileChanged(event) {
    let file = event.target.files[0];
    console.log(file);
  }

}
