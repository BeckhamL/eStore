import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleService implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate() {
    return true;
  }
}
