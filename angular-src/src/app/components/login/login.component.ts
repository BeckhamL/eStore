import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService) { }

  ngOnInit() {
  }

  onLoginSubmit() {

    let user: User;
    if(this.username == 'admin' || this.username == 'Admin') {
        user = {
        name: "",
        username: this.username,
        email: "",
        password: this.password,
        userType: "Admin"
      }
    } 
    else {
        user = {
        name: "",
        username: this.username,
        email: "",
        password: this.password,
        userType: "Member"
      }
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success) {

        if(data.user.userType == "Admin") {
          this.authService.storeUserData(data.token, data.user);
          this.router.navigate(["/dashboard"]);
        }
        else {
          this.authService.storeUserData(data.token, data.user);
          this.router.navigate(["/store"]);
        }

      }
      else {
        this.flashMessages.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(["/login"]);
      }
    })
  }

}
