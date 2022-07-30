import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavesComponent } from './faves/faves.component';
import { HomeComponent } from './home.component';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  { path: '', redirectTo: '/news/all', pathMatch: 'full' },
  {
    path: 'news',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: NewsComponent },
      { path: 'faves', component: FavesComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
