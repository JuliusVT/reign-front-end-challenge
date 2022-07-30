import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from '@app/pages/home/home-routing.module';
import { NewsComponent } from '@app/pages/home/components/news/news.component';
import { FavesComponent } from '@app/pages/home/components/faves/faves.component';
import { HomeComponent } from '@app/pages/home/home.component';
import { ReignCardComponent } from '@app/shared/components/reign-card/reign-card.component'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { SharedModule } from '@app/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HeaderComponent } from '@app/shared/components/header/header.component';


@NgModule({
  declarations: [
    HomeComponent,
    NewsComponent,
    FavesComponent,
    ReignCardComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    NgbDropdownModule,
    InfiniteScrollModule,
  ]
})
export class HomeModule { }
