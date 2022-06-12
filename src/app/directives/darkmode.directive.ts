import {Directive, HostBinding, OnInit} from '@angular/core';
import {ModeService} from "../services/mode.service";

@Directive({
  selector: '[appDarkmode]'
})
export class DarkmodeDirective implements OnInit{

  @HostBinding('class') className = '';

  constructor(protected modeService: ModeService) { }

  ngOnInit(): void {

    this.modeService.toggleMode.subscribe(
      (mode) => {
        this.setMode(mode);
      }
    );
  }

  private setMode(mode): void {
    this.className = mode ? '' : 'dark-theme-mode';
  }
}
