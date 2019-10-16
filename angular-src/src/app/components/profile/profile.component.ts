import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Item } from '../../models/item';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  itemIDs: string[] = new Array();
  items: Item[];

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });

    // let userId:string = JSON.stringify(localStorage.getItem('user'));

    // this.userService.getUsersFavourite(userId.substring(11,35)).subscribe(items => {
    //   this.itemIDs = items.itemsInFavourite;
    //   this.items = new Array(this.itemIDs.length);
    //   this.getItemFromItemID(this.itemIDs);
    // },
    // err => {
    //   console.log(err);
    //   return false;
    // });

    this.route.data.subscribe(data => {
      //console.log(data);
      this.itemIDs = data.data.itemsInFavourite;
      this.items = new Array(this.itemIDs.length);
      this.getItemFromItemID(this.itemIDs);
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
