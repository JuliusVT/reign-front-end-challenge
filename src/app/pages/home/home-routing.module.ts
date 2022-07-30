import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavesComponent } from '@app/pages/home/components/faves/faves.component';
import { HomeComponent } from '@app/pages/home/home.component';
import { NewsComponent } from '@app/pages/home/components/news/news.component';

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
