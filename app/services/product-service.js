import {Injectable} from 'angular2/core';
import {Http, RequestOptions, Headers} from 'angular2/http';
import {SERVER_URL} from './config';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

let productURL = SERVER_URL + 'products';

let headers = new Headers({
  "Authorization": 'Bearer PUT-YOUR-TOKEN-HERE',
  "Accept": 'application/vnd.epages.v1+json' }
);

let options = new RequestOptions({ headers: headers });

@Injectable()
export class ProductService {

    static get parameters() {
        return [[Http]];
    }

    constructor (http) {
        this.http = http;
    }

    findAll() {
        return this.http.get(productURL, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    handleError(error) {
        return Observable.throw(error.json().error || 'Server error');
    }

}
