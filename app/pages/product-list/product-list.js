import {Page, NavController, NavParams} from 'ionic-angular';

/*
  Generated class for the ProductListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/product-list/product-list.html',
})
export class ProductListPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, navParams) {
    this.nav = nav;
  }
}
