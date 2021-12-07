import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailMoviePage } from './detail-movie.page';

const routes: Routes = [
  {
    path: '',
    component: DetailMoviePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailMoviePageRoutingModule {}
