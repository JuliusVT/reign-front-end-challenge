import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HomeModule } from '@app/pages/home/home.module';
import { ApiPrefixInterceptor } from '@app/shared/api-prefix.interceptor';
import { SharedModule } from '@app/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TimeagoModule } from 'ngx-timeago';
import { RouteReusableStrategy } from './shared/route-reusable-strategy';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    HomeModule,
    TimeagoModule.forRoot(),
    InfiniteScrollModule,
    SharedModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
