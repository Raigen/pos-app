import {OnInit} from 'angular2/core';
import {Page, NavController, NavParams} from 'ionic-angular';
import {ProductService} from '../../services/product-service';
import {ProductDetailPage} from '../product-detail/product-detail';

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

  itemTapped(event, {productId}) {
      this.nav.push(ProductDetailPage, {productId});
  }

  page() {
      this.productService.list().subscribe(
          data => this.products = data.items
      );
  }

  ngOnInit() {
    this.productService.findAll().subscribe(
      data => this.products = data.items
    );
  }
}
