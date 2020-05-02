import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Coffee } from '../logic/Coffee';

import { GeolocationService } from '../geolocation.service';
import { TastingRating } from '../logic/TastingRating';
import { DataService } from '../data.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit {

  routingSubscription: any;

  coffee: Coffee;
  tastingEnabled: boolean;
  types = [
    'Espresso', 'Ristretto', 'Americano', 'Cappuccino', 'Frappe'
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private geolocation: GeolocationService,
    private data: DataService
  ) { }

  ngOnInit(): void {
    this.coffee = new Coffee()
    this.routingSubscription = this.route.params.subscribe(params => {
      console.log(params['id']);
      if (params['id']) {
        this.data.get(params['id'], (response: Coffee) => {
          if (response._id) {
            this.coffee = response;
            if (this.coffee.tastingRating) {
              this.tastingEnabled = true;
            }
          }
        });
      }
    });

    this.geolocation.requestLocation(location => {
      if (location) {
        this.coffee.location.latitude = location.latitude;
        this.coffee.location.longitude = location.longitude;
      }
    });
  }

  ngOnDestroy(): void {
    this.routingSubscription.unsubscribe();
  }

  tastingRatingChanged(checked: boolean) {
    if (checked) {
      this.coffee.tastingRating = new TastingRating();
    } else {
      this.coffee.tastingRating = null;
    }
  }

  Cancel() {
    this.router.navigate(['/']);
  }

  Save() {
    this.data.Save(this.coffee, result => {
      if (result) {
        this.router.navigate(['/']);
      }
    });
  }

}
