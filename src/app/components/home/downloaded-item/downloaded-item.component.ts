import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-downloaded-item',
  templateUrl: './downloaded-item.component.html',
  styleUrls: ['./downloaded-item.component.scss']
})
export class DownloadedItemComponent implements OnInit {

//@Input let's this data be updated by the parent component
  @Input() nameOfArticle: String
  @Input() numberOfDownloads: number
  @Input() releaseDate: number

  constructor() { }

  ngOnInit(): void {
  }

}
