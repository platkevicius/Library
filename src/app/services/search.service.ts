import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  searchByQuery(query: String = ''): Observable<any> {
    return this.http.get<any>('https://webtech.informatik.unibw-muenchen.de/server/api/discover/search/objects?query=' + query + '&configuration=default');
  }

  searchWithFilter(query: String, author: String, from: String, to: String): Observable<any> {
    let useQuery = query;
    if (query == null) {
      useQuery = '';
    }
    let url = 'https://webtech.informatik.unibw-muenchen.de/server/api/discover/search/objects?query=' + useQuery;
    if (author != null && author != '') {
      url += '&f.author=' + author + ',equals';
    }
    if ((from != null && from != '') && (to != null && to != '')) {
      url += '&f.dateIssued=%5B' + from + '%20TO%20' + to + '%5D,equals';
    }
    url += '&configuration=default';
    console.log('Searching using url:  ' + url);
    return this.http.get<any>(url);
  }

  loadAuthors(): Observable<any> {
    return this.http.get<any>('https://webtech.informatik.unibw-muenchen.de/server/api/discover/facets/author');
  }

  loadArticles(): Observable<any> {
    return this.http
      .get<any>('https://webtech.informatik.unibw-muenchen.de/server/api/discover/search/objects?query=&configuration=default', {});
  }
}
