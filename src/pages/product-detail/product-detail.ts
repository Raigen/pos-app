import { Camera, Toast } from 'ionic-native';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Slides } from 'ionic-angular';
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

  @ViewChild(Slides) slider: Slides;
  product: Product;
  uploadProgress = 0;
  images = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private productProvider: ProductProvider,
  ) {
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
        name: image.name,
        url: image.sizes[3].url,
        active: image.name === this.product.productImage
      }));
    });
  }

  progressImage(progressEvent) {
    if (progressEvent.lengthComputable) {
      this.uploadProgress = progressEvent.loaded / progressEvent.total * 100;
    } else {
      this.uploadProgress = this.uploadProgress + 1;
    }
  }

  addPicture() {
    const loading = this.loadingCtrl.create({
      content: 'Image uploading'
    });
    Camera.getPicture({
      destinationType: 1
    }).then(imageData => {
        loading.present();
        // imageData is the `file://` source of the image
        this.productProvider.uploadImage({productId: this.product.productId, image: imageData, onProgress: (event) => this.progressImage(event)})
          .then(result => {
            const image = JSON.parse(result.response);

            this.images.push({
              name: image.name,
              url: image.sizes[0].url,
              active: false
            });
            this.uploadProgress = 0;
            loading.dismiss();
          }).catch(error => {
            console.log(error);
            this.uploadProgress = 0;
            loading.dismiss();
            Toast.show('upload failed', '5000', 'bottom').subscribe(toast => console.log(toast));
          });
    });
  }

  removeImage(image) {
    this.productProvider.deleteImage({productId: this.product.productId, image})
      .then(result => {
        this.slider.slideTo(0, 10);
        this.images.splice(this.images.indexOf(image), 1);
      })
      .catch(error => {
        console.log(error);
        Toast.show('deleting image failed', '5000', 'bottom').subscribe(toast => console.log(toast));
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

}
