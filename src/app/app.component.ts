import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { ProductListPage } from '../pages/product-list/product-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage = TabsPage;
  rootPage = ProductListPage;
  @ViewChild(Nav) nav: Nav;

  pages = [
    { title: 'Product List', component: ProductListPage, icon: 'cube' }
  ];

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.backgroundColorByHexString('#DB3A4B');
      // StatusBar.styleDefault();
      Splashscreen.hide();
      document.addEventListener('backbutton', () => {
        this.nav.pop();
      }, false);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
