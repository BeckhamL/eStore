import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;

  constructor(
    private http: Http
  ) { }

  addToUsersFavourite(id: string, item: string) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/users/store/addToFavourite?id=' + id + "&item=" + item, {headers: headers}).pipe(map(res => res.json()));
  }

  addToUsersCart(id: string, item: string) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/users/store/addToCart?id=' + id + "&item=" + item, {headers: headers}).pipe(map(res => res.json()));
  }

  getUsersFavourite(id: string) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost:3000/users/favourites/?id=' + id, {headers: headers}).pipe(map(res => res.json()));
  }

  getUsersCart(id: string) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost:3000/users/cart/?id=' + id, {headers: headers}).pipe(map(res => res.json()));
  }
}
