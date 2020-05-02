import { Injectable } from '@angular/core';

import { PlaceLocation } from './logic/PlaceLocation';

declare let DocumentTouch: any;

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  requestLocation(callback) {
    // W3C Gelocation API
    navigator.geolocation.getCurrentPosition(
      position => {
        callback(position.coords);
      },
      error=> {
        callback(null)
      }
    )
  }

  getMapLink(location: PlaceLocation) {
    // Univeral Link

    let query = "";
    if(location.latitude) {
      query = location.latitude + ',' + location.longitude;
    } else {
      query = `${location.address}, ${location.city}`;
    }

    if (this.detectBrowser().isIOS) {
      return `https://maps.apple.com/?q=${query}`;
    } else {
      return `https://maps.google.com/?q=${query}`;
    }

    // <a href="https://maps.apple.com/q=Eiffel+Tower">
    // <a href="https://maps.apple.com/q=34.44,56.44">
  }

  detectBrowser() {
    const linkElement = <HTMLLinkElement>document.createElement('link');
    const templateElement = <HTMLTemplateElement>document.createElement('template');

    const value = {
      isAndroid: /Android/.test(navigator.userAgent),
      isCordova: !!window['cordova'],
      isEdge: /Edge/.test(navigator.userAgent),
      isFirefox: /Firefox/.test(navigator.userAgent),
      isChrome: /Google Inc/.test(navigator.vendor),
      isChromeIOS: /CriOS/.test(navigator.userAgent),
      isChromiumBased: !!window['chrome'] && !/Edge/.test(navigator.userAgent),
      isIE: /Trident/.test(navigator.userAgent),
      isIOS: /(iPhone|iPad|iPod)/.test(navigator.platform),
      isOpera: /OPR/.test(navigator.userAgent),
      isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
      isTouchScreen: 'ontouchstart' in window || (window['DocumentTouch'] && document instanceof DocumentTouch),
      isWebComponentsSupported: 'registerElement' in document && 'import' in linkElement && 'content' in templateElement
    };

    return value;
  }

}
