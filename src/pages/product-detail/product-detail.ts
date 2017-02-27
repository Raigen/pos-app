import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/productProvider';
import { Product } from '../../app/Product';

/*
  Generated class for the ProductDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html'
})
export class ProductDetailPage {

  product: Product;
  images = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private productProvider: ProductProvider) {
    this.product = {productId: navParams.data.productId} as Product;
  }

  ngOnInit() {
    this.productProvider.findOne({productId: this.product.productId})
      .then(data => this.product = data as Product)
      .then(() => this.fetchSlideshow());
  }

  updateStocklevel(event, changeStocklevel) {
    this.productProvider.changeStocklevel({productId: this.product.productId, changeStocklevel})
      .then(data => this.product.stocklevel = data.stocklevel);
  }


  fetchSlideshow(): Promise<any> {
    return this.productProvider.getSlideshow({productId: this.product.productId}).then(data => {
      const slideshowImages = data.items;
      // empty the images array
      this.images.length = 0;
      // push all slideshow images to the list
      slideshowImages.map(image => this.images.push({
        url: image.sizes[3].url,
        active: image.name === this.product.productImage
      }));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

}
