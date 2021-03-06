import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  homeForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl(''),
    password: new FormControl('', Validators.required)
  })

  homeRegister() {

    console.log(this.homeForm.value);
    let user: User = this.homeForm.value;

    if(user.username == "admin" || user.username == "Admin") {
      user = {
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        userType: "Admin",
        itemsInCart: new Array<string>(),
        itemsInFavourite: new Array<string>(),
        itemsPurhased: new Array<string>()
      };
    }
    else {
      user = {
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        userType: "Member",
        itemsInCart: new Array<string>(),
        itemsInFavourite: new Array<string>(),
        itemsPurhased: new Array<string>()
      };
    }
    
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show("Missing fields", {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(["/"]);
      return false;
    }

    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("Invalid email", {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(["/"]);
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show("Successfully registered", {cssClass: 'alert-success', timeout: 3000});

        this.authService.authenticateUser(user).subscribe(data => {
          if(data.success) {  
            this.authService.storeUserData(data.token, data.user);
            this.router.navigate(["/store"]);

          }
        })
      }
      else {
        this.flashMessage.show(data.msg._message, {cssClass: 'alert-danger', timeout: 3000});
        console.log(data);
        this.router.navigate(["register"]);
      }
    })
  }

}
