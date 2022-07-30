import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, defaultIfEmpty, distinctUntilChanged, shareReplay} from 'rxjs';
import { HackerNews } from '../../models/hacker-news.model';
import { HackerNewsService } from '../../services/hacker-news.service';

@Component({
  selector: 'app-faves',
  templateUrl: './faves.component.html',
  styleUrls: ['./faves.component.scss']
})
export class FavesComponent {

  page$ = this.activatedRoute.queryParamMap.pipe(
    map((paramsMap) => paramsMap.get('page')),
    defaultIfEmpty('0'),
    distinctUntilChanged(),
    shareReplay(1)
  );

  news$ = this.hackerNewsService.getLastFavedNews();

  favedNewsListIds$ = this.hackerNewsService.getLastFavedNews().pipe(map((posts) => posts.map((post) => post.objectID)));
  constructor(private hackerNewsService: HackerNewsService, private activatedRoute: ActivatedRoute, private router: Router) { }

  handlePageChange(page: number) {
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { page }, queryParamsHandling: 'merge' });
  }

  handleFavNews(news: HackerNews) {
    this.hackerNewsService.setFavedNews(news);
  }

  handleNewsDetail(news: HackerNews) {
    if (window) {
      window.location.href = news.story_url;
    }
  }
}
