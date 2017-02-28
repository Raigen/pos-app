import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginProvider } from './login-provider';
import { options } from './config';
import { Transfer, FileUploadOptions } from 'ionic-native';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the Product provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProductProvider {

  private config: LoginProvider;
  private productUrl: String;

  constructor(private http: Http, private loginProvider: LoginProvider, public platform: Platform) {
    this.config = loginProvider;
    this.productUrl = `${this.loginProvider.serverUrl}/products`;
  }

  list({page = 1, resultsPerPage = 10, q = ''}): Promise<any> {
    const token = this.loginProvider.token;
    const productURL = this.productUrl;
    return this.http.get(`${productURL}?page=${page}&resultsPerPage=${resultsPerPage}&q=${q}`, options({token}))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  findOne({productId}): Promise<any> {
    const {token} = this.config;
    const productURL = this.productUrl;
    return this.http.get(`${productURL}/${productId}`, options({token}))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getSlideshow({productId}): Promise<any> {
    const {token} = this.config;
    const url = `${this.productUrl}/${productId}/slideshow`;
    return this.http.get(url, options({token}))
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  changeStocklevel({productId, changeStocklevel = -1}): Promise<any> {
    const {token} = this.config;
    const url = `${this.productUrl}/${productId}`;
    // const body = JSON.stringify({changeStocklevel});
    const body = [{
      op: 'add',
      path: '/stocklevel',
      value: changeStocklevel
    }];
    const opt = options({token});
    opt.headers.set('Content-Type', 'application/json');
    return this.http.patch(url, body, opt)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  uploadImage({productId, image, onProgress = null} : {productId: any, image: string, onProgress?: any}): Promise<any> {
    const {token} = this.config;
    const url = `${this.productUrl}/${productId}/slideshow`;
    const opt = options({token});
    return new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
        const opts = {
          fileKey: 'image',
          fileName: image.substr(image.lastIndexOf('/') + 1),
          httpMethod: 'POST',
          mimeType: 'image/jpeg',
          headers: {Authorization: opt.headers.get('Authorization')}
        };
        const ft = new Transfer();
        // if (onProgress) ft.onprogress = onProgress;
        ft.upload(image, url, opts)
          .then(result => resolve(result))
          .catch(error => reject(error));
      });
    });
  }


  handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
