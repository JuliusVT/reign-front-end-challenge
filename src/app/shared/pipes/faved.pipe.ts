import { Pipe, PipeTransform } from '@angular/core';
import { HackerNews } from '@app/pages/home/models/hacker-news.model';

@Pipe({
  name: 'faved'
})
export class FavedPipe implements PipeTransform {
  transform(value: HackerNews, favedNewsIds: string[]): boolean {
    return favedNewsIds.includes(value.objectID);
  }
}
