import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {

  filterPrice: number;
  filterCategory: string;
  filterDate: Date;
  todaysDate = new Date();
  enumCategories = Category;
  keys = Object.keys;

  constructor(private datePipe: DatePipe) { }

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
    console.log(this.filterCategory + " " + this.filterPrice + " " + this.filterDate);
  }

}
