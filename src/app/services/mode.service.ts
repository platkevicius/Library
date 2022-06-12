import {EventEmitter, Injectable, Output} from '@angular/core';
import {Event as NavigationEvent, NavigationEnd, Router} from '@angular/router';


// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class ModeService {

  lightMode = false;

  constructor(private router: Router) {
    this.router.events
      .subscribe(
        (event: NavigationEvent) => {
          if (event instanceof NavigationEnd) {
            console.log(event);
            this.setLightMode(this.lightMode);
          }
        });
  }


  @Output() toggleMode = new EventEmitter<boolean>();

  setLightMode(lightMode: boolean): void {
    this.lightMode = lightMode;
    console.log('SetLightMode in Service: ' + lightMode);
    this.toggleMode.emit(lightMode);
  }

}
