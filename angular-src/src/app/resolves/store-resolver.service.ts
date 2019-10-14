import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router'
import { PostService } from '../services/post.service';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class StoreResolverService implements Resolve<any> {

  items: Item[];

  constructor(
    private postService: PostService
  ) { }

  resolve() {
    return this.postService.getPosts();
  }
}
