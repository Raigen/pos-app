import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { LoginProvider } from '../../providers/login-provider';
import { ProductListPage } from '../product-list/product-list';
import { SERVER_URL } from '../../providers/config';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  private settingsForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginProvider: LoginProvider, private formBuilder: FormBuilder) {
    this.settingsForm = this.formBuilder.group({
      token: [loginProvider.token],
      shopUrl: [loginProvider.serverUrl || SERVER_URL]
    })
  }

  setSettings() {
    const token = this.settingsForm.value.token;
    const shopUrl = this.settingsForm.value.shopUrl;
    this.loginProvider.setCredentials({token, shopUrl}).then(() => {
      this.navCtrl.setRoot(ProductListPage);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
