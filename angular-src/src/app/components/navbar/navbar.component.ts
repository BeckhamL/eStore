import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;
  numOfItemsInCart: number;
  userID = JSON.stringify(localStorage.getItem('user'));

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService,
    private userService: UserService
  ) { }

  ngOnInit() {
    if(this.authService.loggedIn()) {
      this.user = this.authService.getUser();
      this.userService.getUsersCart(this.userID.substring(11,35)).subscribe(data => this.numOfItemsInCart = data.itemsInCart.length);
    }
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessages.show('Logout successful', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(["/login"]);
    return false;
  }

  logoClick() {
    
    //console.log(this.user.userType);
    console.log(this.authService.loggedIn());
    if(!this.authService.loggedIn()) {
      this.router.navigate(['/']);
    }
    else if (this.user.userType == "Member") {
      this.router.navigate(['/store']);
    }
    else if (this.user.userType == "Admin") {
      this.router.navigate(['/dashboard']);
    }
  }
}
