import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HackerNews } from '@app/pages/home/models/hacker-news.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-reign-card',
  templateUrl: './reign-card.component.html',
  styleUrls: ['./reign-card.component.scss']
})
export class ReignCardComponent {

  @Input() set author(author: HackerNews['author']) {
    this.author$.next(author);
  }
  author$ = new BehaviorSubject<HackerNews['author']>('');

  @Input() set createdAt(createdAt: HackerNews['created_at']) {
    this.createdAt$.next(new Date(createdAt).getTime());
  }
  createdAt$ = new BehaviorSubject<HackerNews['created_at_i']>(0);

  @Input() set title(title: HackerNews['story_title']) {
    this.title$.next(title);
  }
  title$ = new BehaviorSubject<HackerNews['story_title']>('');

  @Input() set url(url: HackerNews['story_url']) {
    this.url$.next(url);
  }
  url$ = new BehaviorSubject<HackerNews['story_url']>('');

  @Input() set isFaved(isFaved: boolean) {
    this.isFaved$.next(isFaved);
  }
  isFaved$ = new BehaviorSubject<boolean>(false);

  @Output() newsFaved = new EventEmitter<null>();

  @Output() newsUrl = new EventEmitter<null>();

  constructor() {}

  handleNavigateToAnotherPage() {
    this.newsUrl.emit();
  }

  handleFaveNewsSaved() {
    this.newsFaved.emit();
  }

}
