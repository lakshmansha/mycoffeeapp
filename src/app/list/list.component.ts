import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Coffee } from '../logic/Coffee';

import { DataService } from '../data.service';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  List: [Coffee];

  constructor(
    private router: Router,
    private data: DataService,
    private geolocation: GeolocationService
  ) { }

  ngOnInit(): void {
    this.data.getList((list: [Coffee]) => {
      this.List = list;
    })
  }

  goDetails(coffee: Coffee) {
    this.router.navigate(['/coffee', coffee._id]);
  }

  goMap(coffee: Coffee) {
    const mapURL = this.geolocation.getMapLink(coffee.location);
    location.href = mapURL;
  }

  share(coffee: Coffee) {
    const shareText = `I had this coffee at ${coffee.place} and for me it's a ${coffee.rating} star coffee`;
    const options = this.geolocation.detectBrowser();
    if ('share' in navigator) {
      (navigator as any).share({
        title: coffee.name,
        text: shareText,
        url: window.location.href
      }).then(() => {
        console.log('Shared');
      }).catch(() => {
        console.log('error sharing');
      });
    } else {
      const shareURL = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
      location.href = shareURL;
    }
  }
}


// else if (options.isAndroid || options.isIOS) {
//   const shareURL = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
//   location.href = shareURL;
// } else if (options.isChrome || options.isFirefox || options.isIE || options.isEdge || options.isChromiumBased || options.isSafari) {
//   const shareURL = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
//   location.href = shareURL;
// }
