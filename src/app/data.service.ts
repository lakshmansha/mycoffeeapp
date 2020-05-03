import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PlaceLocation } from './logic/PlaceLocation';
import { Coffee } from './logic/Coffee';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public endpoint = 'http://192.168.29.217:4202';

  constructor(private http: HttpClient) { }

  get(coffeeId: string, callback) {
    this.http.get(`${this.endpoint}/coffees/${coffeeId}`)
      .subscribe(response => {
        callback(response);
      }, error => {
        callback(new Coffee());
      });
  }

  getList(callback) {
    // const list = [
    //   new Coffee("Double Espresso", "Sunny Cafe", new PlaceLocation('123 Market St', 'San Fransciso')),
    //   new Coffee('Caramel Americano', 'StarCoffee', new PlaceLocation('Gran Via 34', 'Madrid'))
    // ];
    // callback(list);
    this.http.get(`${this.endpoint}/coffees`)
      .subscribe((response: [Coffee]) => {
        callback(response);
      }, error => {
        callback([]);
      });
  }

  Save(coffee, callback) {
    if (coffee._id) {
      // It's an update
      this.http.put(`${this.endpoint}/coffees/${coffee._id}`, coffee)
        .subscribe(response => {
          callback(true);
        }, error => {
          callback(false);
        });
    } else {
      // Its's an insert
      this.http.post(`${this.endpoint}/coffees`, coffee)
        .subscribe(response => {
          callback(true);
        }, error => {
          callback(false);
        });
    }
  }

}
