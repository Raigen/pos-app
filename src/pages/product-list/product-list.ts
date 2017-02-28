import { BarcodeScanner, Camera, Toast } from 'ionic-native';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, List } from 'ionic-angular';
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

  @ViewChild(List) list: List;

  searchQuery = '';
  private currentPage = 1;
  private productCount = 0;
  products: Product[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private productProvider: ProductProvider
   ) {}

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

  addPicture(event, {productId}) {
    event.stopPropagation();
    this.list.closeSlidingItems();
    const loading = this.loadingCtrl.create({
      content: 'Image uploading'
    });
    Camera.getPicture({
      destinationType: 1
    }).then(imageData => {
      loading.present();
      // imageData is the `file://` source of the image
      this.productProvider.uploadImage({productId: productId, image: imageData})
          .then(data => {
            loading.dismiss();
            this.navCtrl.push(ProductDetailPage, {productId});
          })
          .catch(err => {
            console.log(err);
            loading.dismiss();
          });
    });
  }

  scanEAN() {
    BarcodeScanner.scan().then(barcodeData => {
      return this.productProvider.list({q: barcodeData.text}).then(data => {
        if (data.results === 1) {
          this.navCtrl.push(ProductDetailPage, {productId: data.items[0].productId});
        } else if (data.results > 1) {
          this.products = data.items as Product[];
        } else {
          Toast.show('No product found', '5000', 'bottom').subscribe(toast => console.log(toast));
        }
      });
    }).catch(err => console.log(err));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }

}
