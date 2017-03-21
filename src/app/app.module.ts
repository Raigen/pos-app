import { NgModule, ErrorHandler } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler, LoadingController } from 'ionic-angular';
import { MyApp } from './app.component';
import { ProductListPage } from '../pages/product-list/product-list';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { SettingsPage } from '../pages/settings/settings';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { LoginProvider } from '../providers/login-provider';
import { ProductProvider } from '../providers/productProvider';

@NgModule({
  declarations: [
    MyApp,
    TutorialPage,
    SettingsPage,
    ProductListPage,
    ProductDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TutorialPage,
    SettingsPage,
    ProductListPage,
    ProductDetailPage
  ],
  providers: [
    Storage,
    FormBuilder,
    LoginProvider,
    ProductProvider,
    LoadingController,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
