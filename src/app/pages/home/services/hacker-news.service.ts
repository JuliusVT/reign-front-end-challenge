import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { HackerNews, HackerNewsQueryResult, PostQueryContext } from '../models/hacker-news.model';

const routes = {
  posts: (c: PostQueryContext) => `/v1/search_by_date?query=${c.query}&page=${c.page}&hitsPerPage=${c.hitsPerPage}`,
};

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
  private favedNews$ = new BehaviorSubject<HackerNews[]>(
    JSON.parse(localStorage.getItem('favedNews') ?? '[]') as HackerNews[]
  );

  private lastSelectedQuery$ = new BehaviorSubject<string>(localStorage.getItem('selectedQuery') ?? '');

  constructor(private httpClient: HttpClient) {}

  /**
   * Returns posts from hacker news API as observable.
   * @param context query and page params required for request call.
   */
   getPosts(context: PostQueryContext): Observable<HackerNewsQueryResult> {
    console.log(context)
    return this.httpClient.get('/api' + routes.posts(context)).pipe(
      map((body: any) => body as HackerNewsQueryResult),
      catchError(() => of({ hits: [] }) as unknown as Observable<HackerNewsQueryResult>)
    );
  }

  setFavedNews(newsSelected: HackerNews){
    if (newsSelected) {
      let favedNews = this.favedNews$.getValue();

      const alreadySavedIndex = favedNews.findIndex((news: HackerNews) => {
        return news.objectID === newsSelected.objectID;
      });

      if (alreadySavedIndex > -1) {
        favedNews = favedNews.filter((news) => news.objectID != newsSelected.objectID);
      } else {
        favedNews = [...favedNews, newsSelected];
      }

      localStorage.setItem('favedNews', JSON.stringify(favedNews));
      this.favedNews$.next(favedNews);
    }
  }

  getLastFavedNews() : Observable<HackerNews[]>{
    return this.favedNews$.asObservable()
  }

  setQuery(query?: string){
    if (query) {
      localStorage.setItem('selectedQuery', query);
      this.lastSelectedQuery$.next(query);
    }
  }

  getLastSelectedQuery(){
    return this.lastSelectedQuery$.getValue();
  }
}
