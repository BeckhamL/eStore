import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: string;
  user: User;

  constructor(private http: Http) { }

  registerUser(user: User) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/users/register', user, {headers: headers}).pipe(map(res => res.json()));
  }

  authenticateUser(user: User) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers}).pipe(map(res => res.json()));
  }

  storeUserDate(token: string, user:User ) {

    // Store the user locally
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
