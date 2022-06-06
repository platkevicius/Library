import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResponse } from '../models/SearchResponse';

// @ts-ignore
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
    let url = '';
    if (author == null || author == '') {
      url = 'https://webtech.informatik.unibw-muenchen.de/server/api/discover/search/objects?query=' + query + '&configuration=default';
    } else {
      url = 'https://webtech.informatik.unibw-muenchen.de/server/api/discover/search/objects?query='
        + query + '&f.author=' + author + ',equals&configuration=default';
    }
    console.log('Searching using url:  ' + url);
    return this.http.get<any>(url);
  }
}
