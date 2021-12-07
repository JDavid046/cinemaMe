import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListMovieStatusPage } from './list-movie-status.page';

const routes: Routes = [
  {
    path: '',
    component: ListMovieStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListMovieStatusPageRoutingModule {}
