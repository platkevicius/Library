import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import {Authors} from "../../models/Authors";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mockData: Authors[] = [
    {name: "Louis Niederloehner", downloadCount: 49, publicationCount: 6},
    {name: "Louis Niederloehner", downloadCount: 49, publicationCount: 6},
    {name: "Louis Niederloehner", downloadCount: 49, publicationCount: 6},
    {name: "Louis Niederloehner", downloadCount: 49, publicationCount: 6},
    {name: "Louis Niederloehner", downloadCount: 49, publicationCount: 6},
    {name: "Louis Niederloehner", downloadCount: 49, publicationCount: 6},
    {name: "Louis Niederloehner", downloadCount: 49, publicationCount: 6},
    {name: "Louis Niederloehner", downloadCount: 49, publicationCount: 6},
    {name: "Louis Niederloehner", downloadCount: 49, publicationCount: 6},
    {name: "Louis Niederloehner", downloadCount: 49, publicationCount: 6}
  ];

  @Input() authorLength: number = this.mockData.length;

  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {}

  onSubmit(): void {
    this.router.navigate(['/searchResult'])

    //TODO: add rest call for getting data
    this.searchService.searchByQuery('mathematics').subscribe(res => console.log(res));
  }

  clickScrollRight(): void {
    document.getElementById('authors').scrollBy(500, 0);
  }

  clickScrollLeft(): void {
    document.getElementById('authors').scrollBy(-500, 0);
  }

}
