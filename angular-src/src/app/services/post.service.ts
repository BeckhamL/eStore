import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { Item } from '../models/item';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  item: Item;
  constructor(
    private http: Http
  ) { }

  createPosting(item: Item) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/posts/newPosting', item, {headers: headers}).pipe(map(res => res.json()));
  }

  getPosts(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost:3000/posts/dashboard', {headers: headers}).pipe(map(res => res.json()));
  }

  removePostById(id: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let params = new HttpParams();
    params = params.set('id', id);

    return this.http.delete('http://localhost:3000/posts/dashboard' + id, {params});
  }
}
