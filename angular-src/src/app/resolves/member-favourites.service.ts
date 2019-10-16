import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MemberFavouritesService implements Resolve<any> {

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  user: User = this.authService.getUser();
  userID = JSON.stringify(localStorage.getItem('user'));

  resolve() {
    return this.userService.getUsersFavourite(this.userID.substring(11,35));
  }
}
