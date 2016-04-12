import {Camera} from 'ionic-native';
import {Page, NavController, NavParams} from 'ionic-angular';
import {ProductService} from '../../services/product-service';

@Page({
  templateUrl: 'build/pages/product-detail/product-detail.html',
})
export class ProductDetailPage {
  static get parameters() {
    return [[NavController], [NavParams], [ProductService]];
  }

  constructor(nav, {data: params}, productService) {
    this.productService = productService;
    this.product = {
        name: '',
        price: ''
    }
    this.productService.findOne({productId: params.productId}).subscribe(
      data => this.product = data
    );
  }

  addPicture() {
    Camera.getPicture({}).then(imageData => {
        const image = document.getElementById('productImage');
        image.src = imageData;
    });
  }
}
