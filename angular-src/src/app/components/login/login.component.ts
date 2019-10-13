import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService) { }

  ngOnInit() {
  }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  onLoginSubmit() {

    let user: User = this.loginForm.value;
    if(user.username == 'admin' || user.username == 'Admin') {
        user = {
        name: "",
        username: user.username,
        email: "",
        password: user.password,
        userType: "Admin",
        itemsInCart: null,
        itemsInFavourite: null,
        itemsPurhased: null
      }
    } 
    else {
        user = {
        name: "",
        username: user.username,
        email: "",
        password: user.password,
        userType: "Member",
        itemsInCart: null,
        itemsInFavourite: null,
        itemsPurhased: null
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
