import Bluebird from 'bluebird';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { TOKEN, SERVER_URL } from './config';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginProvider {

  public token: String;
  public serverUrl: String;
  private storage: Storage;

  constructor(storage: Storage) {
    console.log('Hello LoginProvider Provider');
    this.storage = storage;
    this.token = TOKEN;
    this.serverUrl = SERVER_URL;
    // this.token = localStorage.getItem('config.token');
    // this.serverUrl = localStorage.getItem('config.serverUrl');
  }

  /**
   * load the credentials from the persistent storage into the localStorage
   */
  loadCredentials() {
    return Bluebird.all([
      this.storage.get('config.token'),
      this.storage.get('config.serverUrl')
    ]).then(([token, serverUrl]) => {
      if (!token || !serverUrl) {
          throw new Error('not ready');
      }
      localStorage.setItem('config.token', token);
      localStorage.setItem('config.serverUrl', serverUrl);
      this.token = token;
      this.serverUrl = serverUrl;
    });
  }

  setCredentials({shopUrl, token}) {
    return Bluebird.all([
      this.storage.set('config.serverUrl', shopUrl),
      this.storage.set('config.token', token)
    ]).then(() => this.loadCredentials());
  }

}
