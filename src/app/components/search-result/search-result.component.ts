import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { SearchResponse } from 'src/app/models/SearchResponse';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, AfterViewChecked {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  mockData: SearchResponse[] = [];

  pageSlice;

  filter = new FormGroup({
    from: new FormControl(),
    to: new FormControl(),
    author: new FormControl()
  });

  query: string;
  link: string;
  author: string;

  fixed: boolean;

  constructor(private searchService: SearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.query = this.route.snapshot.queryParamMap.get('query');
      this.link = this.route.snapshot.queryParamMap.get('link');
      this.author = this.route.snapshot.queryParamMap.get('author');

      if (this.query === null && this.link !== null)  {
        console.log('Searching by link with link: ' );
        console.log(this.link);
        this.linkSearch();
      } else {
        console.log('Searching with query: ' + this.query);
        this.onSubmit();
      }

    if (this.author !== null) {
      this.filter.patchValue({author: this.author});
    }
    this.fixed = false;
    }

  ngAfterViewChecked():void {
    if (!this.fixed) {
      console.log('test');
      this.paginator.lastPage();
      this.paginator.firstPage();
    }
  }

  onSubmit(): void {
    // TODO: add rest call for getting data
    this.mockData = [];
    let counter = 0;
    this.searchService.searchByQuery(this.query).subscribe(res => {
      if (res == null) { return; }

      console.log(res._embedded.searchResult._embedded.objects);
      res._embedded.searchResult._embedded.objects.forEach(object => {
        const item = new SearchResponse();
        item.dcTitle = object._embedded.indexableObject.name;

        item.dcCreator = '';
        if (object._embedded.indexableObject.metadata['dc.contributor.author'] != null) {
          object._embedded.indexableObject.metadata['dc.contributor.author'].forEach(author => {
            item.dcCreator = item.dcCreator + ' ' + author.value + ';';
          });
        }

        if (object._embedded.indexableObject.metadata['dc.description.abstract'] != null) {
          item.dcDescription = object._embedded.indexableObject.metadata['dc.description.abstract'][0].value;
        }
        else {
          item.dcDescription = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';
        }

        this.mockData[counter] = item;
        counter++;
      });
    });

    this.pageSlice = this.mockData.slice(0, 5);
  }

  linkSearch(): void {
    this.mockData = [];
    let counter = 0;
    this.searchService.searchByLink(this.link).subscribe(res => {
      if (res == null) { return; }

      console.log(res._embedded.searchResult._embedded.objects);
      res._embedded.searchResult._embedded.objects.forEach(object => {
        const item = new SearchResponse();
        item.dcTitle = object._embedded.indexableObject.name;

        item.dcCreator = '';
        if (object._embedded.indexableObject.metadata['dc.contributor.author'] != null) {
          object._embedded.indexableObject.metadata['dc.contributor.author'].forEach(author => {
            item.dcCreator = item.dcCreator + ' ' + author.value + ';';
          });
        }

        if (object._embedded.indexableObject.metadata['dc.description.abstract'] != null) {
          item.dcDescription = object._embedded.indexableObject.metadata['dc.description.abstract'][0].value;
        }
        else {
          item.dcDescription = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';
        }

        if (object._embedded.indexableObject.metadata['dc.date.issued'] != null) {
          item.dcDate = object._embedded.indexableObject.metadata['dc.date.issued'][0].value;
        }
        else {
          item.dcDate = '9999';
        }

        this.mockData[counter] = item;
        counter++;
      });
    });

    this.pageSlice = this.mockData.slice(0, 5);
  }

  filterResults(): void {
    console.log(this.filter.value);
  }

  OnPageChange(event: PageEvent): void {
    this.fixed = true;
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > this.mockData.length) {
      endIndex = this.mockData.length;
    }

    this.pageSlice = this.mockData.slice(startIndex, endIndex);
  }

}
