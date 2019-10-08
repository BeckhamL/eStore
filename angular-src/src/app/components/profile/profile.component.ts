import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Item } from '../../models/item';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  items: string[] = new Array();

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });

    let userId:string = JSON.stringify(localStorage.getItem('user'));

    this.userService.getUsersFavourite(userId.substring(11,35)).subscribe(items => {
      this.items = items.itemsInFavourite;
    },
    err => {
      console.log(err);
      return false;
    });

  }

}
