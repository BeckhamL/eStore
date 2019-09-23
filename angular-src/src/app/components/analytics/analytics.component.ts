import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  items: Item[];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(items => {
      this.items = items;
    });
  }

  private getTime(sDate: Date) {

    let date = new Date(sDate);
    return date != null ? date.getTime() : 0;
  }

  sortDateAscending(){
    this.items.sort((a: Item, b: Item) => {
      return this.getTime(a.itemDate) - this.getTime(b.itemDate);
    })
  }

  sortDateDescending() {
    this.items.sort((a: Item, b: Item) => {
      return this.getTime(b.itemDate) - this.getTime(a.itemDate);
    })
  }

}
