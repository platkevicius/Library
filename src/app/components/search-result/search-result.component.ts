import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
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
export class SearchResultComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;    

  mockData: SearchResponse[] = []

  pageSlice;

  filter = new FormGroup({
    from: new FormControl(),
    to: new FormControl(),
    author: new FormControl()
  });

  query: string;

  constructor(private searchService: SearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.query = this.route.snapshot.queryParamMap.get('query');
      this.onSubmit();
    }

  onSubmit(): void {
    //TODO: add rest call for getting data
    this.mockData = []
    var counter = 0;
    this.searchService.searchByQuery(this.query).subscribe(res => {
      if (res == null) return;

      console.log(res._embedded.searchResult._embedded.objects);
      res._embedded.searchResult._embedded.objects.forEach(object => {
        var item = new SearchResponse();
        item.dcTitle = object._embedded.indexableObject.name;

        item.dcCreator = '';
        if (object._embedded.indexableObject.metadata["dc.contributor.author"] != null) {
          object._embedded.indexableObject.metadata["dc.contributor.author"].forEach(author => {
            item.dcCreator = item.dcCreator + ' ' + author.value;
          })
        }

        if (object._embedded.indexableObject.metadata["dc.description.abstract"] != null)
          item.dcDescription = object._embedded.indexableObject.metadata["dc.description.abstract"][0].value;
        else
          item.dcDescription = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';

        this.mockData[counter] = item;
        counter++;
      })
    });

    this.pageSlice = this.mockData.slice(0, 5)
  }

  filterResults(): void {
    console.log(this.filter.value);
  }

  OnPageChange(event: PageEvent): void {
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > this.mockData.length)
      endIndex = this.mockData.length;

      this.pageSlice = this.mockData.slice(startIndex, endIndex);
  }

}
