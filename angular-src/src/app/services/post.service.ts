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

  getPosts(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost:3000/posts/dashboard', {headers: headers}).pipe(map(res => res.json()));
  }

  removePostById(id: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.delete('http://localhost:3000/posts/dashboard?id=' + id, {headers});
  }

  searchPosting(name: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
  
    if(name == "") {
      return this.http.get('http://localhost:3000/posts/dashboard/search', {headers}).pipe(map(res => res.json()));
    }
    else {
      return this.http.get('http://localhost:3000/posts/dashboard/search?name=' + name).pipe(map(res => res.json()));
    }
  }

  filterPosts(category: string, price: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (category == undefined) {
      return this.http.get('http://localhost:3000/posts/dashboard/filter?price=' + price)
      .pipe(map(res => res.json()));
    }
    else if (price == undefined) {
      return this.http.get('http://localhost:3000/posts/dashboard/filter?category=' + category)
      .pipe(map(res => res.json()));
  
    }
    else {
      return this.http.get('http://localhost:3000/posts/dashboard/filter?category=' + category + "&price=" + price)
      .pipe(map(res => res.json()));
  
    }
  }

  reduceQuantityOfPost(id: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/posts/store/update?id=' + id, {headers}).pipe(map(res => res.json));
  }

  memberSelectedItem(id: string, userEmail: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/posts/store/addCart?id=' + id + '&userEmail=' + userEmail, {headers}).pipe(map(res => res.json));
  }
}
