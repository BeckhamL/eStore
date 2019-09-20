import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { DatePipe } from '@angular/common';
import { PostService } from '../../services/post.service';
import { Output, EventEmitter } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {

  search: string;
  filterPrice: number;
  filterCategory: string;
  filterDate: Date;
  todaysDate = new Date();
  enumCategories = Category;
  keys = Object.keys;

  @Output() userSearch = new EventEmitter();

  constructor(
    private datePipe: DatePipe,
    private postService: PostService,
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
  }

  formatLabel(value: number | null) {
    if (!value) {
      this.filterPrice = value;
      return 0;
    }

    if (value == 999) {
      this.filterPrice = value;
      return value + "+";
    }

    this.filterPrice = value;
    return "$" + value;
  }

  filterOptions() {

    if (!this.validateService.validateFilterOptions(this.filterCategory, this.filterPrice)) {
      this.flashMessages.show("No filter options provided", {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(["/dashboard"]);
    }
    else {
      this.postService.filterPosts(this.filterCategory, this.filterPrice).subscribe(data => {
        this.userSearch.emit(data);
      });
    }
  }

  onSearchButton() {
    this.postService.searchPosting(this.search).subscribe(data => {
      this.userSearch.emit(data);
    });
  }

  onClearButton() {
    this.postService.getPosts().subscribe(data => {
      this.userSearch.emit(data);
    })
  }

}
