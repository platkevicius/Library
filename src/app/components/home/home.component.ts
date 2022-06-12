import {Component, HostListener, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {SearchService} from 'src/app/services/search.service';
import {Authors} from '../../models/Authors';
import {Downloads} from '../../models/Downloads';
import {ModeService} from '../../services/mode.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  aData: Authors[] = [];
  dData: Downloads[] = [];

  query: string;

  mode = false;

  constructor(protected modeService: ModeService, private searchService: SearchService, private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {

    this.modeService.toggleMode.subscribe(
      (mode) => {
        this.setMode(mode);
      }
    );

    // Get data for authors

    this.searchService.loadAuthors().subscribe(data => {
      console.log(data);
      for (let i = 0; i < 20; i++) {
        this.aData[i] = {
          name: data._embedded.values[i].label, downloadCount: 0,
          publicationCount: data._embedded.values[i].count, searchLink: data._embedded.values[i]._links.search.href
        };
      }
    });

    // Get data for article names
    this.searchService.loadArticles()
      .subscribe(response => {
        response._embedded.searchResult._embedded.objects.forEach(object => {
          let nameOfArticle = '';
          let author = '';
          let publicationDate = '';

          if (object._embedded.indexableObject.name != null) {
            nameOfArticle = object._embedded.indexableObject.name;
          }

          if (object._embedded.indexableObject.metadata['dc.contributor.author'] != null) {
            author = object._embedded.indexableObject.metadata['dc.contributor.author'][0].value;
          }
          if (object._embedded.indexableObject.metadata['dc.date.issued'] != null) {
            publicationDate = object._embedded.indexableObject.metadata['dc.date.issued'][0].value;
          }


          this.dData.push({nameOfArticle: nameOfArticle, publicationDate: publicationDate, author: author});
        })
      });



  }


  onSubmit(): void {
    console.log('Query: ' + this.query);
    this.router.navigate(['/searchResult'], {queryParams: {query: this.query, mode: this.mode}});
  }


  clickScrollRight(event: any): void {
    const occuredEvent = event.target.parentElement.id;
    console.log(occuredEvent);

    if (occuredEvent === 'home-authors') {

      document.getElementById('authors').scrollBy({
        top: 0,
        left: 550,
        behavior: 'smooth'
      });
      this.checkButtonVisibility(550);

    } else if (occuredEvent === 'downloaded-items-container') {
      document.getElementById('downloads2').scrollBy({
        top: 0,
        left: 550,
        behavior: 'smooth'
      });
      this.checkButtonVisibility2(550);
    }
  }

  clickScrollLeft(event: any): void {
    const occuredEvent = event.target.parentElement.id;
    console.log(occuredEvent);

    if (occuredEvent === 'home-authors') {

      document.getElementById('authors').scrollBy({
        top: 0,
        left: -550,
        behavior: 'smooth'
      });

      this.checkButtonVisibility(-550);
    } else if (occuredEvent === 'downloaded-items-container') {
      document.getElementById('downloads2').scrollBy({
        top: 0,
        left: -550,
        behavior: 'smooth'
      });
      this.checkButtonVisibility2(-550);
    }


  }

  checkButtonVisibility(scrollingBy = 0): void {
    const scrollElem = document.getElementById('authors');
    const scrollDist = scrollElem.scrollLeft;
    if (scrollDist + scrollingBy <= 0) {
      document.getElementById('scroll-left').style.display = 'none';
    } else {
      document.getElementById('scroll-left').style.display = 'block';
    }

    if (scrollDist + scrollElem.offsetWidth + scrollingBy >= scrollElem.scrollWidth) {
      document.getElementById('scroll-right').style.display = 'none';
    } else {
      document.getElementById('scroll-right').style.display = 'block';
    }
  }

  checkButtonVisibility2(scrollingBy = 0): void {
    const scrollElem = document.getElementById('downloads2');
    const scrollDist = scrollElem.scrollLeft;
    if (scrollDist + scrollingBy <= 0) {
      document.getElementById('scroll-left-downloads').style.display = 'none';
    } else {
      document.getElementById('scroll-left-downloads').style.display = 'block';
    }

    if (scrollDist + scrollElem.offsetWidth + scrollingBy >= scrollElem.scrollWidth) {
      document.getElementById('scroll-right-downloads').style.display = 'none';
    } else {
      document.getElementById('scroll-right-downloads').style.display = 'block';
    }
  }


  clickScrollUp(): void {
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

  authorClicked(aName): void {
    this.router.navigate(['/searchResult'], {queryParams: {author: aName}});
  }

  setMode(mode: boolean): void {
    this.mode = mode;
    try {
      console.log('Toggle lightMode in HomeComponent: ' + mode);
      document.getElementById('container').style.backgroundColor = mode ? 'white' : 'rgb(73, 69, 69)';
      document.getElementById('background').style.background = mode ? 'url("../../../assets/background-search-light2.jpg") no-repeat' : 'url("../../../assets/background-serach.jpg") no-repeat';
      document.getElementById('background').style.backgroundSize = '100%';
      document.getElementById('home-authors').style.backgroundColor = mode ? 'lightgrey' : 'black';
      document.getElementById('authors').style.backgroundColor = mode ? 'lightgrey' : 'black';
      document.getElementById('authors-title').style.color = mode ? 'black' : 'white';
      document.getElementById('authors-title').style.backgroundColor = mode ? 'lightgrey' : 'black';
      document.getElementById('downloaded-items-container').style.backgroundColor = mode ? 'lightgrey' : 'black';
      document.getElementById('downloads2').style.backgroundColor = mode ? 'lightgrey' : 'black';
      document.getElementById('downloaded-items-title').style.color = mode ? 'black' : 'white';
    } catch (e) {
      console.log('Could not set mode in HomeComponent');
    }
  }

}
