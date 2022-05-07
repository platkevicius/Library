import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResponse } from '../models/SearchResponse';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  searchByQuery(query: String): Observable<Array<SearchResponse>> {
    return this.http.get<Array<SearchResponse>>('https://api7.dspace.org/server/api/discover/search/objects?query=' + query + '&configuration=default');
  }

}
