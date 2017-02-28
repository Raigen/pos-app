import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import { ProductListPage } from '../product-list/product-list';
import { SettingsPage } from '../settings/settings';

/*
  Generated class for the Tutorial page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {

  public slides = [
    {
        title: "Welcome to <b>eSiteKic</b>",
        description: "The <b>eSiteKic POS Application</b> from ePages is a practical tool, helper and sidekick to organise your point of sales.",
        image: "assets/img/logo.png",
    },
    {
        title: "What is eSiteKic?",
        description: "The <b>eSiteKic Application</b> is a simple POS app that enables you to sync your online shop with in-store sales.",
        image: "assets/img/what-about.png",
    },
    {
        title: "Take pictures",
        description: "Click on the camera icon and make a nice photo of your product. It will be automatically uploaded to your website",
        image: "assets/img/take-pictures.png",
    },
    {
        title: "Adapt stock level",
        description: "Go to product list and search for your product where you want to change the stock level. Slide with the finger to the left see the menu.",
        image: "assets/img/adapt-stock.png",
    }
  ];

  public showSkip = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {}


  startApp() {
    const token = localStorage.getItem('config.token');
    localStorage.setItem('tutorialDone', '1');
    if (token) {
      this.navCtrl.setRoot(ProductListPage);
    } else {
      this.navCtrl.setRoot(SettingsPage);
    }
  }


  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }


  onPageDidEnter() {
    // the left menu should be disabled on the tutorial page
    this.menuCtrl.enable(false);
  }


  onPageDidLeave() {
    // enable the left menu when leaving the tutorial page
    this.menuCtrl.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }

}
