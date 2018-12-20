import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from  'rxjs/Observable';

import  'rxjs/add/operator/catch';

import  'rxjs/add/operator/map';

/*
  Generated class for the ApirestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApirestProvider {
  baseUrl:string = "https://ductor.com.br/pier/v2/api/cartoes/1/limites-disponibilidade";
  
  products: any;

  constructor(public httpClient: HttpClient) {
    console.log('Hello ApirestProvider Provider');
  }

  // public  getProducts(): Observable<Product[]> {

    // return  this.httpClient.get(this.baseUrl).map(products  => {
    //    return new Product(products);
    // });

  // }

}

export  class  Product {

  id: number;

  name: string;

  cost: number;

  quantity: number;

  constructor(values: Object = {}) {

  Object.assign(this, values);

  }

}
