import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { Category } from '../../models/category';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loggedUser: User = JSON.parse(localStorage.getItem("user"));
  categories: Category;
  search: string;
  
  items: Item[] = [{
    itemName :"keys",
    itemImage: "https://material.angular.io/assets/img/examples/shiba2.jpg",
    itemCost: 12,
    itemOwner: this.loggedUser.email,
    itemDate: new Date(),
    itemDescription: "this is my dog",
    itemCategory: Category.Cooking

  },
  {
    itemName :"jambolayah",
    itemImage: "https://material.angular.io/assets/img/examples/shiba2.jpg",
    itemCost: 12,
    itemOwner: this.loggedUser.email,
    itemDate: new Date(),
    itemDescription: "great for outdoor use",
    itemCategory: Category.Cooking

  },
  {
    itemName :"keys",
    itemImage: "https://material.angular.io/assets/img/examples/shiba2.jpg",
    itemCost: 12,
    itemOwner: this.loggedUser.email,
    itemDate: new Date(),
    itemDescription: "this is my dog",
    itemCategory: Category.Sports

  },
  {
    itemName :"keys",
    itemImage: "https://material.angular.io/assets/img/examples/shiba2.jpg",
    itemCost: 24,
    itemOwner: this.loggedUser.email,
    itemDate: new Date(),
    itemDescription: "swag",
    itemCategory: Category.Misc

  },
  {
    itemName :"keys",
    itemImage: "https://material.angular.io/assets/img/examples/shiba2.jpg",
    itemCost: 613,
    itemOwner: this.loggedUser.email,
    itemDate: new Date(),
    itemDescription: "this is my dog",
    itemCategory: Category.AutoMobiles

  }];

  constructor() { }

  ngOnInit() {
  }

  onItemClick() {
    console.log("clicked item ");
  }

  onSearchButton() {
    console.log(this.search);
  }

}
