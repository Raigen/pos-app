import {OnInit} from 'angular2/core';
import {Page, NavController, NavParams} from 'ionic-angular';
import {ProductService} from '../../services/product-service';


@Page({
  templateUrl: 'build/pages/product-list/product-list.html',
})
export class ProductListPage {
  static get parameters() {
    return [[NavController], [NavParams], [ProductService]];
  }

  constructor(nav, navParams, productService) {
    this.nav = nav;
    this.productService = productService;
    this.selectedItem = navParams.get('item');
  }

  ngOnInit() {
    this.productService.findAll().subscribe(
      data => this.products = data.items
    );
  }
}
