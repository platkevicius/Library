import {EventEmitter, Injectable, Output} from '@angular/core';


// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class ModeService {

  constructor() { }

  @Output() toggleMode = new EventEmitter<boolean>();

  setLightMode(lightMode: boolean): void {
    console.log('SetDarkMode in Service');
    this.toggleMode.emit(lightMode);
  }

}
