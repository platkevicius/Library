import {Component, Directive, HostBinding, OnInit, ViewChild} from '@angular/core';
import {ModeService} from './services/mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit{

  constructor(protected modeService: ModeService) {}

  @HostBinding('class') className = '';

  ngOnInit(): void {
  }

}
