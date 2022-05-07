import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {}

  onSubmit(): void {
    this.router.navigate(['/searchResult'])
  
    //TODO: add rest call for getting data
    //this.searchService.searchByQuery('mathematics').subscribe(res => console.log(res));
  }

}
