import {Component, HostListener, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {SearchService} from 'src/app/services/search.service';
import {Authors} from '../../models/Authors';
import {Downloads} from "../../models/Downloads";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mockData: Authors[] = [
    {name: 'Louis Niederloehner', downloadCount: 49, publicationCount: 6, searchLink: ' '},
    {name: 'Louis Niederloehner', downloadCount: 49, publicationCount: 6, searchLink: ' '},
    {name: 'Louis Niederloehner', downloadCount: 49, publicationCount: 6, searchLink: ' '},
    {name: 'Louis Niederloehner', downloadCount: 49, publicationCount: 6, searchLink: ' '},
    {name: 'Louis Niederloehner', downloadCount: 49, publicationCount: 6, searchLink: ' '},
    {name: 'Louis Niederloehner', downloadCount: 49, publicationCount: 6, searchLink: ' '},
    {name: 'Louis Niederloehner', downloadCount: 49, publicationCount: 6, searchLink: ' '},
    {name: 'Louis Niederloehner', downloadCount: 49, publicationCount: 6, searchLink: ' '},
    {name: 'Louis Niederloehner', downloadCount: 49, publicationCount: 6, searchLink: ' '},
    {name: 'Louis Niederloehner', downloadCount: 49, publicationCount: 6, searchLink: ' '},
    {name: 'Louis Niederloehner', downloadCount: 49, publicationCount: 6, searchLink: ' '},
    {name: 'Louis Niederloehner', downloadCount: 49, publicationCount: 6, searchLink: ' '},
    {name: 'Louis Niederloehner', downloadCount: 49, publicationCount: 6, searchLink: ' '},
    {name: 'Louis Niederloehner', downloadCount: 49, publicationCount: 6, searchLink: ' '},
    {name: 'Louis Niederloehner', downloadCount: 49, publicationCount: 6, searchLink: ' '},
    {name: 'Louis Niederloehner', downloadCount: 49, publicationCount: 6, searchLink: ' '},
    {name: 'Louis Niederloehner', downloadCount: 49, publicationCount: 6, searchLink: ' '},
    {name: 'Louis Niederloehner', downloadCount: 49, publicationCount: 6, searchLink: ' '},
    {name: 'Louis Niederloehner', downloadCount: 49, publicationCount: 6, searchLink: ' '},
    {name: 'Louis Niederloehner', downloadCount: 49, publicationCount: 6, searchLink: ' '}
  ];

  //Array with download objects
  downloadMockData: Downloads[] = [
    {nameOfArticle: 'How to Angular', numberOfDownloads: 81, releaseDate: 11, searchLink: ''},
    {nameOfArticle: 'How to Angular', numberOfDownloads: 81, releaseDate: 11, searchLink: ''},
    {nameOfArticle: 'How to Angular', numberOfDownloads: 81, releaseDate: 11, searchLink: ''},
    {nameOfArticle: 'How to Angular', numberOfDownloads: 81, releaseDate: 11, searchLink: ''},
    {nameOfArticle: 'How to Angular', numberOfDownloads: 81, releaseDate: 11, searchLink: ''},
    {nameOfArticle: 'How to Angular', numberOfDownloads: 81, releaseDate: 11, searchLink: ''},
    {nameOfArticle: 'How to Angular', numberOfDownloads: 81, releaseDate: 11, searchLink: ''},
    {nameOfArticle: 'How to Angular', numberOfDownloads: 81, releaseDate: 11, searchLink: ''},
    {nameOfArticle: 'How to Angular', numberOfDownloads: 81, releaseDate: 11, searchLink: ''},
    {nameOfArticle: 'How to Angular', numberOfDownloads: 81, releaseDate: 11, searchLink: ''},
    {nameOfArticle: 'How to Angular', numberOfDownloads: 81, releaseDate: 11, searchLink: ''},
    {nameOfArticle: 'How to Angular', numberOfDownloads: 81, releaseDate: 11, searchLink: ''},
    {nameOfArticle: 'How to Angular', numberOfDownloads: 81, releaseDate: 11, searchLink: ''},
    {nameOfArticle: 'How to Angular', numberOfDownloads: 81, releaseDate: 11, searchLink: ''},
    {nameOfArticle: 'How to Angular', numberOfDownloads: 81, releaseDate: 11, searchLink: ''},
    {nameOfArticle: 'How to Angular', numberOfDownloads: 81, releaseDate: 11, searchLink: ''},
    {nameOfArticle: 'How to Angular', numberOfDownloads: 81, releaseDate: 11, searchLink: ''},
    {nameOfArticle: 'How to Angular', numberOfDownloads: 81, releaseDate: 11, searchLink: ''},
    {nameOfArticle: 'How to Angular', numberOfDownloads: 81, releaseDate: 11, searchLink: ''}
  ]

  aData: Authors[] = [];

  @Input() authorLength: number = this.mockData.length;

  query: string;

  constructor(private searchService: SearchService, private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {

    this.http
      .get<any>('https://webtech.informatik.unibw-muenchen.de/server/api/discover/facets/author', {})
      .subscribe(data => {
        console.log(data);

        for (let i = 0; i < 20; i++) {
          this.aData[i] = {name: data._embedded.values[i].label, downloadCount: 0,
            publicationCount: data._embedded.values[i].count, searchLink: data._embedded.values[i]._links.search};
        }
      });
  }


  onSubmit(): void {
    console.log('Query: ' + this.query);
    this.router.navigate(['/searchResult'], {queryParams: {query: this.query}});
    // TODO: add rest call for getting data and pass the data to the serach result component
    this.searchService.searchByQuery('mathematics').subscribe(res => {
      console.log(res._embedded.searchResult._embedded);
      res._embedded.searchResult._embedded.objects.forEach(object => {
        console.log('Title: ' + object._embedded.indexableObject.name);
        console.log('Authors: ');
        object._embedded.indexableObject.metadata["dc.contributor.author"].forEach(author => {
          console.log(author.value);
        })
        console.log('Abstract: ' + object._embedded.indexableObject.metadata["dc.description.abstract"][0].value);
      })
    });
  }

  clickScrollRight(): void {
    document.getElementById('authors').scrollBy({
      top: 0,
      left: 500,
      behavior: 'smooth'
    });
    this.checkButtonVisibility(500);
  }

  clickScrollLeft(): void {
    document.getElementById('authors').scrollBy({
      top: 0,
      left: -500,
      behavior: 'smooth'
    });
    this.checkButtonVisibility(-500);
  }

  checkButtonVisibility(scrollingBy = 0): void {
    const scrollElem = document.getElementById('authors');
    const scrollDist = scrollElem.scrollLeft;
    if (scrollDist + scrollingBy <= 0) {
      document.getElementById('scroll-left').style.display = 'none';
    } else {
      document.getElementById('scroll-left').style.display = 'block';
    }

    if (scrollDist + scrollElem.offsetWidth + scrollingBy >= scrollElem.scrollWidth){
      document.getElementById('scroll-right').style.display = 'none';
    } else {
      document.getElementById('scroll-right').style.display = 'block';
    }
  }

  clickScrollUp(): void  {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  @HostListener('window:scroll', [])
  checkWindowScroll(): void {
    if (window.pageYOffset < 300) {
      document.getElementById('scroll-up').style.display = 'none';
    } else {
      document.getElementById('scroll-up').style.display = 'block';
    }
  }

  authorClicked(link, aName): void {
    console.log('searching with link: ' );
    console.log(link);
    this.router.navigate(['/searchResult'], {queryParams: {link: link, author: aName}});
  }

}
