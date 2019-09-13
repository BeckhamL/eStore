import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from '../../models/user';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  username: string;
  email: string;
  password: string;

  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user: User = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show("Missing fields", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("Invalid email", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
  }

}
