import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/productProvider';
import { ProductDetailPage } from '../product-detail/product-detail';
import { Product } from '../../app/Product';

/*
  Generated class for the ProductList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html'
})
export class ProductListPage {

  searchQuery = '';
  private currentPage = 1;
  private productCount = 0;
  products: Product[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private productProvider: ProductProvider) {}

  ngOnInit() {
    this.productProvider.list({page: 1})
      .then(data => {
        this.products = data.items as Product[];
        this.productCount = data.results;
      });
  }

  itemTapped(event, {productId}) {
    // this.list.closeSlidingItems();
    this.navCtrl.push(ProductDetailPage, {productId});
  }

  doInfinite(infiniteScroll) {
    const page = this.currentPage = this.currentPage + 1;
    this.productProvider.list({page}).then(data => {
      data.items.map(item => this.products.push(item as Product));
      
      infiniteScroll.complete();
    });
    if (this.currentPage === Math.ceil(this.productCount / 10)) {
        infiniteScroll.enable(false);
    }
  }

  search(event) {
    const searchbar = event.target;
    const q = searchbar.value;
    this.productProvider.list({q}).then(data => this.products = data.items as Product[]);    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }

}
