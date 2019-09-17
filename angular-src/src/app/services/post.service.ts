import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { Item } from '../models/item';

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
}
