import { Component, OnInit } from '@angular/core';
import {ViewportScroller} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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


}
