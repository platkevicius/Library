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

  searchByQuery(query: String): Observable<SearchResponse[]> {
    //return this.http.get<Array<SearchResponse>>('/server/api/discover/search/objects?author=' + query + '&configuration=default');
    return this.http.get<Array<SearchResponse>>('/server/api/discover/search/objects');
  }

}
