import {AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ActivatedRoute} from '@angular/router';
import {SearchResponse} from 'src/app/models/SearchResponse';
import {SearchService} from 'src/app/services/search.service';
import {ModeService} from "../../services/mode.service";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator;

  mockData: SearchResponse[] = [];

  pageSlice;

  filter = new FormGroup({
    from: new FormControl(),
    to: new FormControl(),
    author: new FormControl()
  });

  query: string;
  author: string;
  from: string;
  to: string;

  fixed: boolean;

  constructor(protected modeService: ModeService, private searchService: SearchService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.modeService.toggleMode.subscribe(
      (mode) => {
        this.setMode(mode);
      }
    );

    this.setMode(this.route.snapshot.queryParamMap.get('mode'));

    this.query = this.route.snapshot.queryParamMap.get('query');
    this.author = this.route.snapshot.queryParamMap.get('author');

    if ((this.author != null && this.author !== '') || (this.query != null && this.query !== '')) {
      this.onSubmit();
    }

    if (this.author != null || this.author !== '') {
      this.filter.patchValue({author: this.author});
    }
    this.fixed = false;
  }

  onSubmit(): void {
    // TODO: add rest call for getting data
    this.mockData = [];
    let counter = 0;
    this.searchService.searchWithFilter(this.query, this.author, this.from, this.to).subscribe(res => {
      if (res == null) {
        return;
      }
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
        } else {
          item.dcDescription = 'No description available';
        }

        if (object._embedded.indexableObject.metadata['dc.date.issued'] != null) {
          item.dcDate = object._embedded.indexableObject.metadata['dc.date.issued'][0].value;
        } else {
          item.dcDate = '9999';
        }

        this.mockData[counter] = item;
        counter++;
      });

      this.pageSlice = this.mockData.slice(0, this.paginator.pageSize);
    });

  }

  filterResults(): void {
    console.log(this.filter.controls.author.value);
    this.author = this.filter.controls.author.value;
    this.from = this.filter.controls.from.value;
    this.to = this.filter.controls.to.value;
    this.onSubmit();
  }

  OnPageChange(event: PageEvent): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > this.mockData.length) {
      endIndex = this.mockData.length;
    }

    this.pageSlice = this.mockData.slice(startIndex, endIndex);
  }

  private setMode(mode): void {

    if (mode === 'true') {
      mode = true;
    } else if (mode === 'false') {
      mode = false;
    }

    console.log('Toggle lightMode in SearchComponent: ' + mode);

    try {
      console.log('Toggled lightMode in Search: ' + mode);
      document.getElementById('color').style.backgroundColor = mode ? 'lightgrey' : 'rgb(36, 32, 32)';
      if (!mode) {
        document.getElementById('color').style.backgroundColor = 'rgb(36, 32, 32)';
      }
    } catch (e) {
      console.log('Could not set mode in SearchComponent');
    }
  }
}
