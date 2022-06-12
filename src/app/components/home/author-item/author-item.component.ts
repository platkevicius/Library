import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-author-item',
  templateUrl: './author-item.component.html',
  styleUrls: ['./author-item.component.scss']
})
export class AuthorItemComponent implements OnInit {

  @Input() name: String;
  @Input() downloads: number;
  @Input() publications: number;
  @Input() link: String;

  constructor() {
  }

  ngOnInit(): void {
  }

}
