import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {

  name: string;
  username: string;
  email: string;
  password: string;

  targetInput = 'input0';

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.setFocus();
  }

  setFocus() {
    let targetElem = document.getElementById(this.targetInput);
    setTimeout(function waitTargetElem() {
      if (document.body.contains(targetElem)) {
        targetElem.focus();
      }
      else {
        setTimeout(waitTargetElem, 100);
      }
    }, 100);
  }

  onChange(event: any) {
    let index = String(event.selectedIndex);
    this.targetInput = 'input' + index;
    this.setFocus();
  }

  onRegisterSubmit() {

    let user: User;

    if(this.username == "admin" || this.username == "Admin") {
      user = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
        userType: "Admin",
        itemsInCart: new Array<string>(),
        itemsInFavourite: new Array<string>(),
        itemsPurhased: new Array<string>()
      };
    }
    else {
      user = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
        userType: "Member",
        itemsInCart: new Array<string>(),
        itemsInFavourite: new Array<string>(),
        itemsPurhased: new Array<string>()
      };
    }

    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show("Missing fields", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("Invalid email", {cssClass: 'alert-danger', timeout: 3000});
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
