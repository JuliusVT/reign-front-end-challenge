import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HackerNewsService } from '../../services/hacker-news.service';
import {
  map,
  defaultIfEmpty,
  distinctUntilChanged,
  shareReplay,
  combineLatest,
  switchMap,
  BehaviorSubject,
  tap,
} from 'rxjs';
import { HackerNews, HackerNewsQueryResult } from '../../models/hacker-news.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent {
  favedNewsListIds$ = this.hackerNewsService.getLastFavedNews().pipe(map((news) => news.map((news) => news.objectID)));

  lastSelectedQuery$ = this.hackerNewsService.getLastSelectedQuery();

  isLoading$ = new BehaviorSubject<boolean>(true);

  hitsPerPage$ = new BehaviorSubject<number>(8);

  nbPages$ = new BehaviorSubject<number>(1);

  page$ = this.activatedRoute.queryParamMap.pipe(
    map((paramsMap) => {
      return paramsMap.get('page') ?? '1';
    }),
    distinctUntilChanged(),
    shareReplay(1)
  );

  // Holds search term for query directly from URL as query param
  query$ = this.activatedRoute.queryParamMap.pipe(
    map((paramsMap) => {
      return paramsMap.get('query') ?? this.hackerNewsService.getLastSelectedQuery();
    }),
    distinctUntilChanged(),
    shareReplay(1)
  );
  
  postsInfinite$ = combineLatest([this.nbPages$, this.query$]).pipe(
    switchMap(([page, query]) => {
      const selectedPage = page.toString();
      const searchedQuery = query;
      return this.hackerNewsService.getPosts({ page: selectedPage, query: searchedQuery, hitsPerPage: 30 });
    }),
    map((results: HackerNewsQueryResult) => {
      const filteredHits = results.hits.filter((hit) => {
        if (!hit.story_title) {
          return false;
        }
        if (!hit.story_url) {
          return false;
        }
        if (!hit.created_at_i) {
          return false;
        }
        return true;
      });
      results.hits = filteredHits;
      return results;
    }),
    tap((results) => {
      this.isLoading$.next(false);
      this.allNews$.next([...this.allNews$.getValue(), ...results.hits]);
    }),
    defaultIfEmpty({ hits: [] } as unknown as HackerNewsQueryResult),
    shareReplay(1)
  );
  allNews$ = new BehaviorSubject<HackerNews[]>([]);
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private hackerNewsService: HackerNewsService) { }

  identifyNews(index: number, news: HackerNews) {
    return news.objectID;
  }

  handleSearchQuery(searchTerm: 'angular' | 'reactjs' | 'vuejs') {
    this.nbPages$.next(1);
    this.allNews$.next([]);
    this.isLoading$.next(true);
    this.hackerNewsService.setQuery(searchTerm);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { query: searchTerm, page: null },
      queryParamsHandling: 'merge',
    });
  }

  handleFavNews(news: HackerNews) {
    this.hackerNewsService.setFavedNews(news);
  }

  handleNewsDetail(news: HackerNews) {
    if (window) {
      window.location.href = news.story_url;
    }
  }

  /* infiniti scroll */
  handleScrollDown() {
    this.isLoading$.next(true);
    if (this.nbPages$.getValue() >= 124) {
      return;
    } else {
      this.nbPages$.next(this.nbPages$.getValue() + 1);
    }
  }

  scrollCheck(): boolean {
    return this.isLoading$.getValue();
  }
}
