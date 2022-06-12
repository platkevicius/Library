import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ModeService} from '../../services/mode.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() mode = new EventEmitter<string>();

  lightMode = false;


  constructor(private modeService: ModeService, private router: Router) {
  }

  ngOnInit(): void {

  }

  onChangeToggle(): void {
    this.lightMode = !this.lightMode;
    this.modeService.setLightMode(this.lightMode);
    localStorage.setItem('mode', String(this.lightMode));
  }


  onClickScroll(elementId: string): void {
    if (window.location.pathname === '/') {
      document.getElementById(elementId).scrollIntoView({behavior: 'smooth', block: 'center'});
    } else {
      this.router.navigate(['/']).then(() => {
          window.scrollTo({top: document.getElementById(elementId).offsetTop, behavior: 'smooth'});
        }
      );
    }
  }

  routeToSearch(): void {
    this.router.navigate(['/searchResult'], {queryParams: {mode: this.lightMode}});
  }

}
