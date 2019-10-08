import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Item } from '../../models/item';
import { Category } from '../../models/category';
import { User } from 'src/app/models/user';
import { PostService } from '../../services/post.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../services/user.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  providers: [NavbarComponent],
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  @ViewChild('favourite', {static: false}) button: ElementRef;

  loggedUser: User = JSON.parse(localStorage.getItem("user"));
  userId:string = JSON.stringify(localStorage.getItem('user'));

  categories: Category;
  jsonString: String;
  
  items: Item[];
  clickedPost: Item;

  @Output() clickedPostSend = new EventEmitter<Item>();

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar,
    private router: Router,
    private flashMessages: FlashMessagesService,
    private userService: UserService,
    private navComponent: NavbarComponent
  ) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(items => {
      this.items = items;
    });
  }

  onItemClick(index: number) {
    this.clickedPost = this.items[index];
    this.clickedPostSend.emit(this.clickedPost);
  }

  addToCart(index: string) {
    this.clickedPost = this.items[index];

    this.jsonString = JSON.stringify(this.clickedPost);

    this.postService.reduceQuantityOfPost(this.jsonString.substring(8, 32)).subscribe(data => {
      if(data) {
        this.navComponent.ngOnInit();
        this.snackBar.open("Successfully added " + this.clickedPost.itemName + " to your cart", "Dismiss", {
          duration: 3000
        });
        this.router.navigate(['/store']);
        this.postService.getPosts().subscribe(items => {
          this.items = items;
        });
      }
      else {
        this.flashMessages.show("Error while deleting post", {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/store']);
      }
    });

    this.userService.addToUsersCart(this.userId.substring(11,35), this.jsonString.substring(8,32)).subscribe(data => {
      if(data) {
        console.log("add to cart success");
      }
      else {
        console.log("add to cart error");
      }
    });
   }

   removeItemQuantityZero(index: string) {
    this.clickedPost = this.items[index];

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

   getData(value : Item[]) {
     this.items = value;
   }

   checkItemQuantity(index: string): boolean {
     if(this.items[index].itemQuantity == 0) {
       return true;
     }
     else {
       return false;
     }
   }

   addToFavourites(index: string) {

    (<any>this.button).color = 'warn';

    this.clickedPost = this.items[index];
    this.jsonString = JSON.stringify(this.clickedPost);

    this.userService.addToUsersFavourite(this.userId.substring(11,35), this.jsonString.substring(8, 32)).subscribe(data => {

      if(data.success) {
        this.snackBar.open("Added " + this.clickedPost.itemName + " to your favourites", "Dismiss", {
          duration: 3000
        });
      }
      else {
        console.log("error");
      }
    })

   }

}
