import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchResponse } from '../models/SearchResponse';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  searchByQuery(query: String): Observable<any> {
    return this.http.get<any>('https://webtech.informatik.unibw-muenchen.de/server/api/discover/search/objects?query=' + query + '&configuration=default');
  }

  searchByLink(link: string): Observable<any> {
    return this.http.get<any>(link);
  }

  searchWithFilter(query: String, author: String): Observable<any> {
    return this.http.get<any>('https://webtech.informatik.unibw-muenchen.de/server/api/discover/search/objects?query='
      + query + '&author=' + author + '&configuration=default');
  }
}
