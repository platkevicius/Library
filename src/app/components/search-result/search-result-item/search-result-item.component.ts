import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss']
})
export class SearchResultItemComponent implements OnInit {

  @Input() title: String;
  @Input() authors: String;
  @Input() date: String;
  @Input() description: String;

  constructor() { }

  ngOnInit(): void {
  }

}
