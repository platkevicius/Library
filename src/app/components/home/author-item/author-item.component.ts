import {Component, Input, OnInit} from '@angular/core';
import {SearchResponse} from "../../../models/SearchResponse";
import {Authors} from "../../../models/Authors";

@Component({
  selector: 'app-author-item',
  templateUrl: './author-item.component.html',
  styleUrls: ['./author-item.component.scss']
})
export class AuthorItemComponent implements OnInit {

  @Input() name: String;
  @Input() downloads: number;
  @Input() publications: number;

  constructor() { }

  ngOnInit(): void {
  }

}
