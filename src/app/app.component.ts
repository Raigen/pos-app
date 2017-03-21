import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ViewController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { ProductListPage } from '../pages/product-list/product-list';
import { SettingsPage } from '../pages/settings/settings';
import { TutorialPage } from '../pages/tutorial/tutorial';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage = TabsPage;
  private rootPage: Component = ProductListPage;
  @ViewChild(Nav) nav: Nav;

  pages = [
    { title: 'Product List', component: ProductListPage, icon: 'cube' },
    { title: 'About', component: TutorialPage, icon: 'information-circle' }
    // { title: 'About', component: AboutPage }
   ]

   loggedOutPages = [
     { title: 'Settings', component: SettingsPage, icon: 'options' }
   ]

  constructor(private platform: Platform) {
    const tutorialDone = localStorage.getItem('tutorialDone');
    const token = localStorage.getItem('config.token');

    this.initializeApp();

    if (tutorialDone && token) {
      this.rootPage = ProductListPage;
    } else if (tutorialDone) {
      this.rootPage = SettingsPage;
    } else {
      this.rootPage = TutorialPage;
    }
  }

  initializeApp() {
    // register event for android back button
    this.platform.registerBackButtonAction(() => {
      const activeView: ViewController = this.nav.getActive();

      if (activeView !== null) {
        if (this.nav.canGoBack()) this.nav.pop();
      }
    });

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.backgroundColorByHexString('#DB3A4B');
      // StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
