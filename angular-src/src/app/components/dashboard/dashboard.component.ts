import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Item } from '../../models/item';
import { Category } from '../../models/category';
import { User } from 'src/app/models/user';
import { PostService } from '../../services/post.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loggedUser: User = JSON.parse(localStorage.getItem("user"));
  categories: Category;
  jsonString: String;
  
  items: Item[];
  clickedPost: Item;

  @Output() clickedPostSend = new EventEmitter<Item>();

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar,
    private router: Router,
    private flashMessages: FlashMessagesService) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(items => {
      this.items = items;
    });
  }

  onItemClick(index: number) {
    this.clickedPost = this.items[index];
    this.clickedPostSend.emit(this.clickedPost);
  }

  removeClickedPost(index: string) {
    this.clickedPost = this.items[index];
    // console.log(this.clickedPost);
    // this.snackBar.open('Are you sure you want to delete ' + this.clickedPost.itemName + "?", 'Yes', {
    //   duration: 6000,
    // });
    this.jsonString = JSON.stringify(this.clickedPost);

    this.postService.removePostById(this.jsonString.substring(8, 32)).subscribe(data => {
      if(data) {
        this.postService.getPosts().subscribe(items => {
          this.items = items;
        });
      }
      else {
        this.flashMessages.show("Error while deleting post", {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/dashboard']);
      }
    });
   }

   getData(value) {
     this.items = value;
   }

}
